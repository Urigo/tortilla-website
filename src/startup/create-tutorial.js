const createDiff = require('./create-diff')
const createStep = require('./create-step')
const { map } = require('lodash')

module.exports = ({ tutorial, createPage }) => {
  // Will be used later on to compose diff between versions.
  // Note that the transformation is done because we need to match the data in to
  // Tortilla's schema
  const tutorialChunk = {
    releases: tutorial.versions.map(({ diff, number }) => ({
      releaseVersion: number,
      changesDiff: diff,
    }))
  }

  tutorial.versions.forEach((version, index) => {
    const tutorialName = tutorial.name
    const tutorialTitle = tutorial.title
    const tutorialVersion = tutorial.currentVersion
    const versionName = version.name
    const versionNumber = version.number
    const versionHistory = version.history
    const allVersions = tutorial.versions.map(({ number, releaseDate }) => ({
      number,
      releaseDate,
    }))

    const common = {
      tutorialName,
      tutorialTitle,
      tutorialVersion,
      versionNumber,
      versionName,
      allVersions,
    }

    // If iterated version is not the most recent.
    if (index) {
      const srcVersion = tutorial.versions[index - 1]
      const srcVersionNumber = srcVersion.number
      const srcVersionHistory = srcVersion.history

      // Will create diff page bi-directionally
      createDiff({
        createPage,
        common,
        params: {
          destVersionNumber: versionNumber,
          destVersionHistory: versionHistory,
          srcVersionNumber,
          srcVersionHistory,
          tutorialChunk,
        }
      })
    }

    // Create step page for each step
    version.steps.forEach(step => {
      createStep({
        createPage,
        common,
        params: { step }
      })
    })
  })
}
