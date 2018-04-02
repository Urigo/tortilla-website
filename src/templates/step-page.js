import React from 'react'

import TutorialPage from '../components/TutorialPage'

export default props => (
  <TutorialPage
    step={props.pathContext.step}
    tutorial={props.data.tortillaTutorial}
  />
)

export const tutorialPageQuery = graphql`
  query tutorialPage(
    $tutorialName: String!
    $versionName: String!
    $versionNumber: String!
  ) {
    tortillaTutorial(name: { eq: $tutorialName }) {
      name
      currentVersion
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
