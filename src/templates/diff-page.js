import React from 'react'

import DiffPage from '../components/DiffPage'

export default props => (
  <DiffPage
    srcVersionNumber={props.pathContext.srcVersionNumber}
    destVersionNumber={props.pathContext.destVersionNumber}
    versionsDiff={props.pathContext.versionsDiff}
    tutorial={props.data.tortillaTutorial}
  />
)

export const diffPageQuery = graphql`
  query diffPage(
    $tutorialName: String!
  ) {
    tortillaTutorial(name: { eq: $tutorialName }) {
      name
      currentVersion
      github {
        link
      }
      prevVersions: versions {
        number
      }
    }
  }
`
