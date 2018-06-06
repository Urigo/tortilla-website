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

  const pagePath = stepRoute({
    tutorialName: common.tutorialName,
    step,
  })

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
}
