const path = require('path')
const { kebabCase } = require('lodash')
const { stepRoute } = require('../utils/routes')

const tutorialTemplate = path.resolve('src/pages/tutorial.js')

module.exports = ({
  createPage,
  common,
  params: { step },
}) => {
  const paths = [
    // With version prefix
    stepRoute({
      tutorialName: common.tutorialName,
      version: common.versionNumber,
      step: step.id,
    })
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

  paths.forEach((path) => {
    createPage({
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
}
