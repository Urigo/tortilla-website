const createStep = require('./create-step')

module.exports = ({ tutorial, createPage }) => {
  tutorial.versions.forEach(version => {
    const tutorialName = tutorial.name
    const tutorialVersion = tutorial.currentVersion
    const versionName = version.name
    const versionNumber = version.number

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
