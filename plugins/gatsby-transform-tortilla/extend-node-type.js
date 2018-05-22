const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql')
const gitIo = require('gitio');

const { TypeName } = require('./config')

const StepTypeName = TypeName + 'Step'
const VersionTypeName = TypeName + 'Version'
const GithubTypeName = TypeName + 'Github'

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
      diff: {
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

  const githubToLink = github => github.org && github.name ? `https://github.com/${github.org}/${github.name}` : null

  const githubType = new GraphQLObjectType({
    name: GithubTypeName,
    fields: {
      org: {
        type: GraphQLString,
      },
      name: {
        type: GraphQLString,
      },
      link: {
        type: GraphQLString,
        resolve: githubToLink,
      },
      // use caching
      shortLink: {
        type: GraphQLString,
        resolve: github => gitIo(githubToLink(github)),
      }
    },
  })

  return Promise.resolve({
    name: {
      type: GraphQLString,
    },
    github: {
      type: githubType,
    },
    currentVersion: {
      type: GraphQLString,
    },
    latestVersion: {
      type: versionType,
      resolve: tutorial => tutorial.versions[tutorial.versions.length - 1],
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
        name: { type: new GraphQLNonNull(GraphQLString) },
        number: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (tutorial, { name, number }) => {
        return tutorial.versions.find(
          version => version.name === name && version.number === number
        )
      },
    },
    versionsCount: {
      type: GraphQLInt,
      resolve: tutorial => tutorial.versions.length || 0,
    },
  })
}
