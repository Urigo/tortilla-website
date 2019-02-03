import React from 'react'
import { graphql } from 'gatsby'

import HomePage from '../components/HomePage'

export default props => {
  const tutorials = props.data.allTortillaTutorial.edges.map(({ node }) => node)

  return <HomePage tutorials={tutorials} location={props.location} />
}

export const query = graphql`
  {
    allTortillaTutorial {
      edges {
        node {
          name
          title
          versions {
            name
            stepsCount
            steps {
              id
              name
            }
          }
        }
      }
    }
  }
`
