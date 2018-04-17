import React from 'react'

import HomePage from '../components/HomePage'

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

export default props => ( <
  HomePage tutorials = {
    props.data.allTortillaTutorial.edges
  }
  />
)