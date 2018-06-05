const path = require('path')
const { kebabCase } = require('lodash')
const { Dump } = require('tortilla/dist/dump')
const { Git } = require('tortilla/dist/git')
const tutorialTemplate = path.resolve('src/templates/tutorial-page.js')
const { diffRoute } = require('../utils/routes')

module.exports = ({
  createPage,
  common,
  params: {
    srcVersionNumber,
    destVersionNumber,
    tutorialChunk,
  },
}) => {
  const diffPath = diffRoute({
    tutorialName: common.tutorialName,
    srcVersion: srcVersionNumber,
    destVersion: destVersionNumber,
  })

  let versionsDiff
  let useremail;
  let username;

  try {
    try {
      username = Git(['config', '--global', 'user.name'])
    } catch (e) {
      username = null
      Git(['config', '--global', 'user.name', 'tortilla_build_process'])
    }

    try {
      useremail = Git(['config', '--global', 'user.email'])
    } catch (e) {
      useremail = null
      Git(['config', '--global', 'user.email', 'tortilla_build_process@tortilla.com'])
    }

    versionsDiff = Dump.diffReleases(
      tutorialChunk,
      srcVersionNumber,
      destVersionNumber,
    )
  }
  finally {
    if (username) {
      Git(['config', '--global', 'user.name', username])
    } else if (username === null) {
      Git(['config', '--global', '--unset', 'user.name'])
    }

    if (useremail) {
      Git(['config', '--global', 'user.email', useremail])
    } else if (useremail === null) {
      Git(['config', '--global', '--unset', 'user.email'])
    }
  }

  createPage({
    path: diffPath,
    component: tutorialTemplate,
    layout: 'tutorial',
    context: {
      ...common,
      common,
      contentType: 'diffs',
      contentData: {
        srcVersionNumber,
        destVersionNumber,
        versionsDiff,
      },
    }
  })
}
