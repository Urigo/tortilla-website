const { resolve } = require('path')
const { kebabCase } = require('lodash')
const { stepRoute } = require('../utils/routes')

const tutorialTemplate = resolve('src/templates/tutorial.js')

const aliasMap = {}

module.exports = async ({ createRedirect, createPage, common, params: { step } }) => {
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

  if (common.tutorialVersion == common.versionNumber && !step.id) {
    const branchedAlias = stepRoute({
      repo: common.tutorialRepo,
      owner: common.tutorialAuthor.username,
      branch: common.tutorialBranch
    })

    paths.push(branchedAlias)

    const branchlessAlias = stepRoute({
      repo: common.tutorialRepo,
      owner: common.tutorialAuthor.username
    })

    // Will only work in production
    // /Urigo/WhatsApp -> /Urigo/WhatsApp/master
    if (!aliasMap[branchlessAlias]) {
      createRedirect({
        fromPath: branchlessAlias,
        toPath: branchedAlias,
        isPermanent: true
      })
    }
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
