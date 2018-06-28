import React from 'react'

import HomePage from '../components/HomePage'

export default props => {
  const tutorials = props.data.allTortillaTutorial.edges.map(({ node }) => node)

  return (
    <HomePage
      tutorials={tutorials}
      location={props.location}
    />
  )
}

export const query = graphql `
  query AllTortillaTutorial {
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
