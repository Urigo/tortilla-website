const path = require('path')
const { kebabCase } = require('lodash')
const { stepRoute } = require('../utils/routes')

const tutorialTemplate = path.resolve('src/templates/tutorial.js')

module.exports = async ({ createPage, common, params: { step } }) => {
  const paths = [
    // With version prefix
    stepRoute({
      tutorialName: common.tutorialName,
      version: common.versionNumber,
      step: step.id,
    }),
  ]

  if (common.tutorialVersion == common.versionNumber) {
    // Without version prefix - most recent one
    paths.push(
      stepRoute({
        tutorialName: common.tutorialName,
        step: step.id,
      })
    )
  }

  return Promise.all(
    paths.map(path => {
      return createPage({
        path,
        component: tutorialTemplate,
        context: {
          ...common,
          common,
          contentType: 'steps',
          contentData: { step },
        },
      })
    })
  )
}
