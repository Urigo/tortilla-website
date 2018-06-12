import React from 'react'

import HomePage from '../components/HomePage'

export default props => (
  <HomePage
    tutorials={props.data.allTortillaTutorial.edges}
    location={props.location}
  />
)

export const query = graphql `
  query AllTortillaTutorial {
    allTortillaTutorial {
      edges {
        node {
          title: name
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
