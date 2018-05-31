import React from 'react'

import TutorialPage from '../components/TutorialPage'

export default props => (
  <TutorialPage
    pathData={props.pathContext}
    tutorialData={props.data.tortillaTutorial}
  />
)

export const stepPageQuery = graphql`
  query stepPage(
    $tutorialName: String!
    $versionNumber: String!
  ) {
    tortillaTutorial(name: { eq: $tutorialName }) {
      name
      currentVersion
      github {
        link
      }
      version(number: $versionNumber) {
        name
        steps {
          id
          name
        }
      }
    }
  }
`
