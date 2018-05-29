import React from 'react'

import StepPage from '../components/StepPage'

export default props => (
  <StepPage
    step={props.pathContext.step}
    otherVersions={props.pathContext.otherVersionsNumbers}
    tutorial={props.data.tortillaTutorial}
  />
)

export const stepPageQuery = graphql`
  query stepPage(
    $tutorialName: String!
    $versionName: String!
    $versionNumber: String!
  ) {
    tortillaTutorial(name: { eq: $tutorialName }) {
      name
      currentVersion
      github {
        link
      }
      version(name: $versionName, number: $versionNumber) {
        name
        steps {
          id
          name
        }
      }
    }
  }
`
