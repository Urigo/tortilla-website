/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const transformTortilla = require('./plugins/gatsby-transform-tortilla/gatsby-node')

module.exports = transformTortilla
