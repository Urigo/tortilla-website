const path = require('path')
const slash = require('slash')

module.exports = async function createPages({ graphql, boundActionCreators }) {
  const { createPage } = boundActionCreators

  // get tutorials and their steps
  const tutorialList = await graphql(
    `
      {
        allTortillaTutorials(limit: 1000) {
          edges {
            node {
              
            }
          }
        }
      }
    `
  )

  // create a page per tutorial
  // include there all steps or create additional pages for each step

  // we won't do this now

  // create an example page
  const sampleTemplate = path.resolve(__dirname, 'templates/sample-page.js')

  createPage({
    path: '/sample',
    component: slash(sampleTemplate),
    context: {
      title: 'TORTILLA!!1',
    },
  })
}
