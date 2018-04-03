import React from 'react'

import HomePage from '../components/HomePage'

export const query = graphql`
  query AllTortillaTutorial {
    allTortillaTutorial {
      edges {
        node {
          title: name
          versions {
            name
            stepsCount
            steps(first: 1) {
              id
              name
            }
          }
        }
      }
    }
  }
`

export default props => (
  <HomePage tutorials={props.data.allTortillaTutorial.edges} />
)
