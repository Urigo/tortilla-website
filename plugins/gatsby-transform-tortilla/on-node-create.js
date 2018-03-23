const crypto = require(`crypto`)

const { TypeName } = require('./config')

module.exports = async function onCreateNode({
  node,
  loadNodeContent,
  boundActionCreators,
}) {
  const { createNode, createParentChildLink } = boundActionCreators

  if (node.internal.mediaType !== 'application/json') {
    return
  }

  const content = await loadNodeContent(node)
  const parsedContent = JSON.parse(content)

  const tutorialNode = {
    id: `${node.id} >>>${TypeName}`,
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
