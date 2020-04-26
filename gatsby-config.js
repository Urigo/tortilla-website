const { createProxyMiddleware } = require('http-proxy-middleware')

const resolveTutorials = {
  resolve: 'gatsby-source-filesystem',
  options: {
    path: `${__dirname}/src/tutorials/`,
    name: 'tutorial',
  },
}

module.exports = {
  developMiddleware: (app) => {
    app.use(
      '/.netlify/functions/',
      createProxyMiddleware({
        target: 'http://localhost:9000',
        pathRewrite: {
          '/.netlify/functions/': '',
        },
      })
    )
  },
  siteMetadata: {
    title: 'Tortilla',
  },
  plugins: [
    resolveTutorials,
    'gatsby-plugin-netlify',
    'gatsby-transform-tortilla',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-postcss',
  ],
}
