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
  createPage,
  common,
  params: { step },
}) => {
  const paths = [
    generatePath({
      tutorialName: common.tutorialName,
      tutorialVersion: common.tutorialVersion,
      versionName: common.versionName,
      versionNumber: common.versionNumber,
      step,
    }),
  ]

  if (common.tutorialVersion == common.versionNumber) {
    paths.push(
      stepRoute({
        tutorialName: common.tutorialName,
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
        ...common,
        common,
        contentType: 'steps',
        contentData: { step },
      },
    })
  })
}
