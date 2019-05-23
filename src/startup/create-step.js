const path = require('path')
const { kebabCase } = require('lodash')
const { stepRoute } = require('../utils/routes')

const tutorialTemplate = path.resolve('src/templates/tutorial.js')

module.exports = async ({ createPage, createRedirect, common, params: { step } }) => {
  const paths = []

  paths.push(
    stepRoute({
      repo: common.tutorialRepo,
      owner: common.tutorialAuthor.username,
      branch: common.tutorialBranch,
      version: common.versionNumber,
      step: step.id,
    })
  )

  if (common.tutorialVersion == common.versionNumber) {
    paths.push(
      stepRoute({
        repo: common.tutorialRepo,
        owner: common.tutorialAuthor.username,
        branch: common.tutorialBranch,
        version: 'latest',
        step: step.id,
      })
    )
  }

  return Promise.all(paths.map(path =>
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
  ))
}
