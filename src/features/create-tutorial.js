const createDiff = require('./create-diff')
const createStep = require('./create-step')
const { map } = require('lodash');

module.exports = ({ tutorial, createPage }) => {
  const allVersionsDiffs = map(tutorial.versions, 'diff')

  tutorial.versions.forEach((version, index) => {
    const tutorialName = tutorial.name
    const tutorialVersion = tutorial.currentVersion
    const versionName = version.name
    const versionNumber = version.number

    // TODO: Create and cache on request
    // Create diff page with every possible versions combination
    tutorial.versions.forEach((destVersion, destIndex) => {
      const destVersionNumber = destVersion.number

      if (destVersionNumber == versionNumber) return
      if (destIndex == index) return

      createDiff({
        srcVersionNumber: versionNumber,
        destVersionNumber,
        allVersionsDiffs,
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
        step,
        createPage,
      })
    })
  })
}
