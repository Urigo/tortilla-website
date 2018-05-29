const createDiff = require('./create-diff')
const createStep = require('./create-step')
const { map } = require('lodash');

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
    const tutorialVersion = tutorial.currentVersion
    const versionName = version.name
    const versionNumber = version.number

    // Will be used to generate diff links in the client
    const otherVersionsNumbers = tutorial.versions
      .map(otherVersion => otherVersion.number)
      .filter(otherVersionNumber => otherVersionNumber !== versionNumber)

    // TODO: Create and cache on request
    // Create diff page with every possible versions combination
    tutorial.versions.forEach((destVersion, destIndex) => {
      const destVersionNumber = destVersion.number

      if (destVersionNumber == versionNumber) return
      if (destIndex == index) return

      createDiff({
        srcVersionNumber: versionNumber,
        destVersionNumber,
        tutorialChunk,
        tutorialName,
        createPage,
      })
    })

    // Create step page for each step
    version.steps.forEach(step => {
      createStep({
        tutorialName,
        tutorialVersion,
        versionName,
        versionNumber,
        otherVersionsNumbers,
        step,
        createPage,
      })
    })
  })
}
