/// @ts-check

const crypto = require('crypto')
const remark = require('remark')
const html = require('remark-html')
const highlight = require('remark-highlight.js')

const { TypeName } = require('./config')

const processMd = doc =>
  remark()
    .use(highlight)
    .use(html)
    .process(doc)

module.exports = async function onCreateNode({
  node,
  loadNodeContent,
  boundActionCreators,
}) {
  const { createNode, createParentChildLink } = boundActionCreators

  // accept only json files
  if (node.internal.mediaType !== 'application/json') {
    return
  }

  // load content and parse it
  const content = await loadNodeContent(node)
  const parsedContent = JSON.parse(content)

  // add `html` to each step
  await Promise.all(
    parsedContent.versions.map(async version => {
      return Promise.all(
        version.steps.map(async step => {
          step.html = await processMd(step.content)
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
    ...parsedContent,
  }

  tutorialNode.internal.contentDigest = crypto
    .createHash(`md5`)
    .update(JSON.stringify(tutorialNode))
    .digest(`hex`)

  createNode(tutorialNode)
  createParentChildLink({ parent: node, child: tutorialNode })
}
