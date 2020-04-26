import React from 'react'
import { graphql } from 'gatsby'

import TutorialPage from '../components/TutorialPage'

export default (props) => (
  <TutorialPage
    location={props.location}
    common={props.pageContext.common}
    contentType={props.pageContext.contentType}
    params={props.pageContext.contentData}
    tutorial={props.data.tortillaTutorial}
  />
)

export const tutorialPageQuery = graphql`
  query($tutorialName: String!, $versionNumber: String!) {
    tortillaTutorial(name: { eq: $tutorialName }) {
      name
      title
      currentVersion
      repo
      repoUrl
      branch
      author {
        username
        avatar
      }
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
