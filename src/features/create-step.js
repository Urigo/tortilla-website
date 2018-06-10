const path = require('path')
const { kebabCase } = require('lodash')
const { stepRoute } = require('../utils/routes')

const tutorialTemplate = path.resolve('src/templates/tutorial-page.js')

module.exports = ({
  createPage,
  common,
  params: { step },
}) => {
  if (common.tutorialVersion != common.versionNumber) return

  const paths = [
    // With version prefix
    stepRoute({
      tutorialName: common.tutorialName,
      version: common.versionNumber,
      step: step.id,
    }),
    // Without version prefix
    stepRoute({
      tutorialName: common.tutorialName,
      step: step.id,
    }),
  ]

  paths.forEach((path) => {
    createPage({
      path,
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
