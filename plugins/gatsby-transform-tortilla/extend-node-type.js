const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require('gatsby/graphql')

const { TypeName } = require('./config')

const StepTypeName = TypeName + 'Step'
const DiffTypeName = TypeName + 'Diff'
const VersionTypeName = TypeName + 'Version'
const AuthorTypeName = TypeName + 'Author'

module.exports = (
  { type, store, pathPrefix, getNode, cache, reporter },
  pluginOptions
) => {
  if (type.name !== TypeName) {
    return {}
  }

  const diffType = new GraphQLObjectType({
    name: DiffTypeName,
    fields: {
      index: {
        type: GraphQLString
      },
      value: {
        type: GraphQLString
      },
    }
  })

  const stepType = new GraphQLObjectType({
    name: StepTypeName,
    fields: {
      id: {
        type: GraphQLInt,
        resolve: step => parseInt(step.id),
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
      diffs: {
        type: new GraphQLList(diffType),
      },
    },
  })

  const authorType = new GraphQLObjectType({
    name: AuthorTypeName,
    fields: {
      username: {
        type: GraphQLString,
      },
      avatar: {
        type: GraphQLString,
      },
    }
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
      history: {
        type: GraphQLString,
      },
      revision: {
        type: GraphQLString,
      },
      diff: {
        type: GraphQLString
      },
      releaseDate: {
        type: GraphQLString
      },
      steps: {
        type: new GraphQLList(stepType),
        args: {
          first: { type: GraphQLInt },
        },
        resolve: (version, { first }) => {
          if (first) {
            return [...version.steps].splice(0, first)
          }

          return version.steps
        },
      },
      stepsCount: {
        type: GraphQLInt,
        resolve: version => version.steps.length || 0,
      },
    },
  })

  return Promise.resolve({
    name: {
      type: GraphQLString,
    },
    title: {
      type: GraphQLString,
    },
    repoUrl: {
      type: GraphQLString,
    },
    branch: {
      type: GraphQLString,
    },
    currentVersion: {
      type: GraphQLString,
    },
    latestVersion: {
      type: versionType,
      resolve: tutorial => tutorial.versions[tutorial.versions.length - 1],
    },
    author: {
      type: authorType,
    },
    versions: {
      type: new GraphQLList(versionType),
      args: {
        last: { type: GraphQLInt },
      },
      resolve: (tutorial, { last }) => {
        if (last) {
          return [...tutorial.versions].splice(tutorial.versions.length - last)
        }

        return tutorial.versions
      },
    },
    version: {
      type: versionType,
      args: {
        number: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (tutorial, { name, number }) => {
        return tutorial.versions.find(
          version => version.number === number
        )
      },
    },
    versionsCount: {
      type: GraphQLInt,
      resolve: tutorial => tutorial.versions.length || 0,
    },
  })
}
