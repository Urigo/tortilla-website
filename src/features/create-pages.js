const path = require('path')

const createTutorial = require('./create-tutorial')

module.exports = async ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  const result = await graphql(`
    {
      allTortillaTutorial(limit: 1000) {
        edges {
          node {
            name
            currentVersion
            versions {
              name
              history
              number
              revision
              diff
              steps {
                id
                name
                content
                html
                revision
              }
            }
          }
        }
      }
    }
  `)

  result.data.allTortillaTutorial.edges.forEach(edge => {
    const tutorial = edge.node

    createTutorial({
      tutorial,
      createPage,
    })
  })
}
