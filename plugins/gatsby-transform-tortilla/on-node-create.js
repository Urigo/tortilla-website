/// @ts-check

const crypto = require('crypto')
const remark = require('remark')
const html = require('remark-html')
const highlight = require('remark-highlight.js')
const remarkGitHub = require('../remark-github');

const {
  TypeName
} = require('./config')

const processMd = (doc, options = {}) => {
  const stepDiffs = []

  return remark()
    .use(extractDiffs, stepDiffs)
    .use(highlight)
    .use(remarkGitHub, options)
    .use(html)
    .process(doc)
    .then((html) => ({ html, stepDiffs }))
}

const extractDiffs = (exports) => {
  if (exports === undefined) {
    throw TypeError('exports must be provided')
  }

  if (!(exports instanceof Array)) {
    throw TypeError('exports must be an array')
  }

  return (ast) => {
    const root = ast.children

    root.filter((node) => {
      return (
        node.type === 'heading' &&
        node.depth === 4 &&
        node.children &&
        node.children.length === 1 &&
        node.children[0].type === 'text' &&
        node.children[0].value.match(/Step \d+\.\d+\:/)
      )
    })
    .forEach((node) => {
      const i = root.indexOf(node)
      let title = node.children.map(child => child.value).join('')

      const step = {
        number: title.match(/Step (\d+\.\d+)/)[1],
        diff: '',
        title,
      }

      exports.push(step)

      while (
        (node = root[i + 1]) &&
        node.type === 'heading' &&
        node.depth === 5 &&
        node.children
      ) {
        root.splice(i + 1, 1)
        title = node.children.map(child => child.value).join('')

        let [operation, oldPath, newPath = oldPath] = title.match(
          /([^\s]+) ([^\s]+)(?: to ([^\s]+))?/
        ).slice(1)

        switch (operation) {
          case 'Added':
            oldPath = '/dev/null'
            newPath = `b/${newPath}`
            step.diff += `diff --git ${oldPath} ${newPath}`
            step.diff += 'new file mode 100644'
            step.diff += 'index 0000000...0000000'
            step.diff += `--- ${oldPath}`
            step.diff += `+++ ${newPath}`
            break;
          case 'Deleted':
            oldPath = `a/${oldPath}`
            newPath = '/dev/null'
            step.diff += `diff --git ${oldPath} ${newPath}`
            step.diff += 'deleted file mode 100644'
            step.diff += 'index 0000000...0000000'
            step.diff += `--- ${oldPath}`
            step.diff += `+++ ${newPath}`
            break;
          default:
            oldPath = `a/${oldPath}`
            newPath = `b/${newPath}`
            step.diff += `diff --git ${oldPath} ${newPath}`
            step.diff += 'index 0000000...0000000'
            step.diff += `--- ${oldPath}`
            step.diff += `+++ ${newPath}`
        }

        while (
          (node = root[i + 1]) &&
          node.type === 'code' &&
          node.lang === 'diff'
        ) {
          root.splice(i + 1, 1)

          node.value.split('\n').forEach((line, j) => {
            if (j) {
              step.diff += line.match(/^(.)┊ *\d*┊ *\d*┊(.+)/).slice(1).join('')
            } else {
              step.diff += line
            }
          })
        }
      }
    })

    throw exports
  }

  // return (ast) => {
  //   ast.children.filter((node) => {
  //     return node.type === 'code' && node.lang === 'diff'
  //   })
  //   .forEach((node) => {
  //     const index = ast.children.indexOf(node)
  //     console.log(ast.children[index - 1], ast.children[index - 2])

  //     if (node.lang !== 'diff') return

  //     node.value.split('\n').forEach((line, i) => {
  //       if (!i) {
  //         return exports.push({
  //           line,
  //           type: 'meta',
  //           payload: {},
  //         })
  //       }

  //       let type
  //       switch (line[0]) {
  //         case '-': type = 'del'; break
  //         case '+': type = 'add'; break
  //         default: type = 'non'; break
  //       }
  //       line = line.slice(1)

  //       let [allNums, delNum, addNum] = line.match(/^┊ *(\d*)┊ *(\d*)┊/)
  //       delNum = Number(delNum)
  //       addNum = Number(addNum)
  //       line = line.slice(allNums.length)

  //       exports.push({
  //         line,
  //         type,
  //         payload: { delNum, addNum },
  //       })
  //     })
  //   })
  // }
}

module.exports = async function onCreateNode({
  node,
  loadNodeContent,
  actions,
}) {
  const {
    createNode,
    createParentChildLink
  } = actions

  // accept only json files
  if (node.internal.mediaType !== 'application/json') {
    return
  }

  // load content and parse it
  const content = await loadNodeContent(node)
  const parsedContent = JSON.parse(content)
  const tutorial = parseTutorial(parsedContent, node)
  const stepScope = createStepScope(tutorial)

  // add `html` to each step
  await Promise.all(
    tutorial.versions.map(async version => {
      return Promise.all(
        version.steps.map(async step => {
          step.html = await processMd(step.content, stepScope)
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

function createStepScope(tutorial) {
  const branch = tutorial.branch
  const [org, name] = tutorial.repoUrl
    ? tutorial.repoUrl.split('/').slice(-2)
    : ['', '']

  return { branch, org, name }
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
    name: release.manuals[0].manualTitle,
    tag: release.tagName,
    revision: release.tagRevision,
    history: release.historyRevision,
    diff: release.changesDiff,
    steps: getSteps(release),
  }));
}

function getTutorialRepoUrl(doc) {
  return doc.repoUrl;
}

function getTutorialBranch(doc) {
  return doc.branchName;
}

function getTutorialTitle(doc) {
  return doc.releases[0].manuals[0].manualTitle;
}

function getCurrentVersion(doc) {
  return doc.releases[0].releaseVersion;
}

function fromDumpToTutorial(doc, node) {
  const repoUrl = getTutorialRepoUrl(doc);
  const branch = getTutorialBranch(doc);
  const versions = getVersions(doc);
  const title = getTutorialTitle(doc);
  const currentVersion = getCurrentVersion(doc);

  return {
    name: node.name,
    repoUrl,
    branch,
    title,
    currentVersion,
    versions
  };
}

function parseTutorial(doc, node) {
  // depends if was generated using the old structure or proposed one
  // TODO: we should include tortilla's version here so we can match it with dump's structure
  return doc && doc.length ? fromDumpToTutorial(doc[0], node) : doc
}