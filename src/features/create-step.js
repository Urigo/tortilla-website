const path = require('path')
const { kebabCase } = require('lodash')

const { stepRoute } = require('../utils/routes')

const tutorialTemplate = path.resolve('src/templates/tutorial-page.js')

// tutorial/foo/1.0/bar/1.0/1-baz
const generatePath = ({
  tutorialName,
  tutorialVersion,
  versionName,
  versionNumber,
  step,
}) => {
  return [
    // prefix
    'tutorial',
    // tutorial
    kebabCase(tutorialName),
    tutorialVersion,
    // version
    kebabCase(versionName),
    versionNumber,
    // step
    step.id + '-' + kebabCase(step.name),
  ].join('/')
}

module.exports = ({
  tutorialName,
  tutorialVersion,
  versionName,
  versionNumber,
  otherVersionsNumbers,
  step,
  createPage,
}) => {
  const paths = [
    generatePath({
      tutorialName,
      tutorialVersion,
      versionName,
      versionNumber,
      step,
    }),
  ]

  if (tutorialVersion === versionNumber) {
    paths.push(
      stepRoute({
        tutorialName,
        step,
      })
    )
  }

  paths.forEach(pagePath => {
    createPage({
      path: pagePath,
      component: tutorialTemplate,
      layout: 'tutorial',
      context: {
        activeContent: 'steps',
        tutorialName,
        tutorialVersion,
        versionName,
        versionNumber,
        otherVersionsNumbers,
        step,
      },
    })
  })
}
