const api = require('./src/api')

const resolveTutorials = {
  resolve: 'gatsby-source-filesystem',
  options: {
    path: `${__dirname}/src/tutorials/`,
    name: 'tutorial',
  },
}

module.exports = {
  developMiddleware: (app) => {
    app.use('/api', api)
  },
  siteMetadata: {
    title: 'Tortilla',
  },
  plugins: [
    resolveTutorials,
    'gatsby-transform-tortilla',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-postcss'
  ],
}
