/// @ts-check

const crypto = require('crypto')
const remark = require('remark')
const html = require('remark-html')
const highlight = require('remark-highlight.js')
const remarkGitHub = require('../remark-github');

const {
  TypeName
} = require('./config')

const processMd = (doc, options = {}) =>
  remark()
  .use(highlight)
  .use(remarkGitHub, options)
  .use(html)
  .process(doc)

module.exports = async function onCreateNode({
  node,
  loadNodeContent,
  boundActionCreators,
}) {
  const {
    createNode,
    createParentChildLink
  } = boundActionCreators

  // accept only json files
  if (node.internal.mediaType !== 'application/json') {
    return
  }

  // load content and parse it
  const content = await loadNodeContent(node)
  const parsedContent = JSON.parse(content)
  const tutorial = parseTutorial(parsedContent);
  // TODO: get it from `tutorial`
  const githubOrg = 'Urigo'
  const githubName = 'whatsapp-textrepo-angularcli-express'
  const branch = 'master';

  // TODO: Not GitHub specific???
  tutorial.github = {
    org: githubOrg,
    name: githubName,
    branch,
  }

  // add `html` to each step
  await Promise.all(
    tutorial.versions.map(async version => {
      return Promise.all(
        version.steps.map(async step => {
          step.html = await processMd(step.content, {
            org: githubOrg,
            name: githubName,
            branch,
          })
        })
      )
    })
  )

  // create a tutorial node
  const tutorialNode = {
    id: `${node.id} >>> ${TypeName}`,
    children: [],
    parent: node.id,
    internal: {
      content,
      type: TypeName,
    },
    ...tutorial,
  }

  tutorialNode.internal.contentDigest = crypto
    .createHash(`md5`)
    .update(JSON.stringify(tutorialNode))
    .digest(`hex`)

  createNode(tutorialNode)
  createParentChildLink({
    parent: node,
    child: tutorialNode
  })
}


function getSteps(release) {
  return release.manuals
    .filter((m, i) => i > 0)
    .map((manual, i) => ({
      id: i + 1,
      name: manual.manualTitle.replace(/step [0-9]+\:[\ ]*/i, ''),
      content: manual.manualView,
      revision: manual.stepRevision,
    }));
}

function getVersions(doc) {
  return doc.releases.map(release => ({
    number: release.releaseVersion,
    name: release.manuals[0].manualTitle.substr(0, 45),
    revision: release.tagRevision,
    diff: release.changesDiff,
    steps: getSteps(release),
  }));
}

function getTutorialName(doc) {
  return doc.releases[0].manuals[0].manualTitle.substr(0, 45);
}

function getCurrentVersion(doc) {
  return doc.releases[0].releaseVersion;
}

function fromDumpToTutorial(doc) {
  const versions = getVersions(doc);
  const name = getTutorialName(doc);
  const currentVersion = getCurrentVersion(doc);

  return {
    name,
    currentVersion,
    versions
  };
}

function parseTutorial(doc) {
  // depends if was generated using the old structure or proposed one
  // TODO: we should include tortilla's version here so we can match it with dump's structure
  return doc && doc.length ? fromDumpToTutorial(doc[0]) : doc
}