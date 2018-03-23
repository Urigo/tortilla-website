const { GraphQLObjectType, GraphQLList, GraphQLString } = require('graphql')

const { TypeName } = require('./config')

const StepTypeName = TypeName + 'Step'
const VersionTypeName = TypeName + 'Version'

module.exports = (
  { type, store, pathPrefix, getNode, cache, reporter },
  pluginOptions
) => {
  if (type.name !== TypeName) {
    return {}
  }

  const stepType = new GraphQLObjectType({
    name: StepTypeName,
    fields: {
      id: {
        type: GraphQLString,
      },
      name: {
        type: GraphQLString,
      },
      content: {
        type: GraphQLString,
      },
      html: {
        type: GraphQLString,
      },
      revision: {
        type: GraphQLString,
      },
    },
  })

  const versionType = new GraphQLObjectType({
    name: VersionTypeName,
    fields: {
      number: {
        type: GraphQLString,
      },
      name: {
        type: GraphQLString,
      },
      revision: {
        type: GraphQLString,
      },
      steps: {
        type: new GraphQLList(stepType),
      },
    },
  })

  return Promise.resolve({
    name: {
      type: GraphQLString,
    },
    currentVersion: {
      type: GraphQLString,
    },
    versions: {
      type: new GraphQLList(versionType),
    },
  })
}
