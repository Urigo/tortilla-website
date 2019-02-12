const { map } = require('lodash')
const path = require('path')

require('../featured-tutorials/node-mixin')
const featuredTutorials = require('../featured-tutorials')
const createDiff = require('./create-diff')
const createStep = require('./create-step')

const staticDirPath = path.resolve(process.cwd(), 'static')

module.exports = async ({ tutorial, createPage }) => {
  // Will be used later on to compose diff between versions.
  // Note that the transformation is done because we need to match the data in to
  // Tortilla's schema
  const tutorialChunk = {
    releases: tutorial.versions.map(({ diff, number }) => ({
      releaseVersion: number,
      changesDiff: diff,
    })),
  }

  // We don't wanna spam the versions nav bar :-)
  const recentMajorVersions = tutorial.versions.filter(
    ({ isRecentMajor }) => isRecentMajor
  )

  return Promise.all(
    recentMajorVersions.map(async (version, index) => {
      if (version.mostRecent) return

      // Load image data URLs.
      // Note that load() will not be invoked twice for 'default' because of the way it's
      // implemented
      await Promise.all([
        (
          featuredTutorials[tutorial.name] &&
          featuredTutorials[tutorial.name].load(staticDirPath)
        ),
        featuredTutorials.default.load(staticDirPath),
      ])

      // Featured tutorials are used as projection - we present existing tutorials the
      // way we want
      const featuredTutorial = Object.assign(
        {},
        featuredTutorials.default,
        tutorial,
        featuredTutorials[tutorial.name]
      )

      const tutorialName = tutorial.name
      const tutorialTitle = featuredTutorial.title || tutorial.name
      const tutorialDescription = featuredTutorial.description
      const tutorialVersion = tutorial.currentVersion
      const tutorialImage = featuredTutorial.imageUrl
      const versionName = version.name
      const versionNumber = version.number
      const versionHistory = version.history
      const allVersions = recentMajorVersions.map(
        ({ number, releaseDate }) => ({
          number,
          releaseDate,
        })
      )

      const common = {
        tutorialName,
        tutorialTitle,
        tutorialVersion,
        tutorialImage,
        versionNumber,
        versionName,
        allVersions,
      }

      const creatingPages = []

      // If iterated version is not the most recent.
      if (index) {
        const srcVersion = tutorial.versions[index - 1]
        const srcVersionNumber = srcVersion.number
        const srcVersionHistory = srcVersion.history

        // Will create diff page bi-directionally
        creatingPages.push(
          createDiff({
            createPage,
            common,
            params: {
              destVersionNumber: versionNumber,
              destVersionHistory: versionHistory,
              srcVersionNumber,
              srcVersionHistory,
              tutorialChunk,
            },
          })
        )
      }

      // Create step page for each step
      creatingPages.push(
        ...version.steps.map(step => {
          createStep({
            createPage,
            common,
            params: { step },
          })
        })
      )

      return Promise.all(creatingPages)
    })
  )
}
