const path = require('path')

const createTutorial = require('./create-tutorial')

module.exports = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allTortillaTutorial(limit: 1000) {
        edges {
          node {
            name
            title
            repoUrl
            branch
            currentVersion
            author {
              username
              avatar
            }
            versions {
              name
              history
              number
              revision
              diff
              releaseDate
              isRecentMajor
              steps {
                id
                name
                content
                html
                revision
                diffs {
                  index
                  value
                }
              }
            }
          }
        }
      }
    }
  `)

  return Promise.all(
    result.data.allTortillaTutorial.edges.map(edge => {
      const tutorial = edge.node

      return createTutorial({
        tutorial,
        createPage,
      })
    })
  )
}
