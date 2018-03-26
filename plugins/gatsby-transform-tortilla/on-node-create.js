const crypto = require(`crypto`)
const showdown = require('showdown')
const converter = new showdown.Converter()

const { TypeName } = require('./config')

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
  parsedContent.versions.forEach(version => {
    version.steps.forEach(step => {
      // TODO: use `markdown-diff` package
      step.html = converter.makeHtml(step.content)
    })
  })

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
