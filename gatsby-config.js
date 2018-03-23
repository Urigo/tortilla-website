const resolveTutorials = {
  resolve: 'gatsby-source-filesystem',
  options: {
    path: `${__dirname}/src/tutorials/`,
    name: 'tutorial',
  },
}

module.exports = {
  siteMetadata: {
    title: 'Tortilla',
  },
  plugins: [
    resolveTutorials,
    'gatsby-transform-tortilla',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-typescript',
  ],
}
