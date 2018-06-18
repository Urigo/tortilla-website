import React from 'react'

import TutorialPage from '../components/TutorialPage'

export default props => (
  <TutorialPage
    location={props.location}
    common={props.pathContext.common}
    contentType={props.pathContext.contentType}
    params={props.pathContext.contentData}
    tutorial={props.data.tortillaTutorial}
  />
)

export const tutorialPageQuery = graphql`
  query tutorialPage(
    $tutorialName: String!
    $versionNumber: String!
  ) {
    tortillaTutorial(name: { eq: $tutorialName }) {
      name
      currentVersion
      repoUrl
      branch
      version(number: $versionNumber) {
        name
        number
        steps {
          id
          name
        }
      }
    }
  }
`
