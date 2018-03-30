import * as React from 'react'
import * as PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'gatsby-link'

import { stepRoute } from '../utils/routes'
import List from '../components/common/List'
import ListItem from '../components/common/List/Item'
import Tutorial from '../components/home/Tutorial'
import Tabs from '../components/common/Tabs'
import Tab from '../components/common/Tabs/Tab'
import Button from '../components/common/Button'
import Grid from '../components/common/Grid'
import Frameworks from '../components/home/Frameworks'
import AuthorOfWeek from '../components/home/AuthorOfWeek'

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
`

const SideMenu = styled.div`
  flex: 0 0 20%;
  padding: 0 30px;
`

const Content = styled.div`
  flex: 1;
  padding: 0 30px;
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d2d5de;
`

class IndexPage extends React.Component {
  frameworks: { name: string; author: string }[] = [
    {
      name: 'Angular',
      author: 'Google',
    },
    {
      name: 'Meteor',
      author: 'Meteor Dev Group',
    },
    {
      name: 'Ionic',
      author: 'Drifty',
    },
  ]

  authors: { name: string }[] = [
    {
      name: 'Gregory Greene',
    },
    {
      name: 'John Robinson',
    },
  ]

  render() {
    return (
      <Container>
        <SideMenu>
          <Frameworks frameworks={this.frameworks} />
          <AuthorOfWeek authors={this.authors} />
        </SideMenu>
        <Content>
          <Header>
            <Tabs>
              <Tab>All</Tab>
              <Tab active={true}>Popular</Tab>
              <Tab>Newest</Tab>
            </Tabs>
            <Button>Submit your tutorial</Button>
          </Header>
          <Grid>
            {this.props.data.allTortillaTutorial.edges.map(({ node }, i) => {
              return node.versions.map((version, j) => (
                <Tutorial
                  link={stepRoute({
                    tutorialName: node.title,
                    versionName: version.name,
                    step: version.steps[0],
                  })}
                  key={`${i}-${j}`}
                  title={`${node.title}: ${version.name}`}
                  chaptersCount={version.stepsCount}
                />
              ))
            })}
          </Grid>
        </Content>
      </Container>
    )
  }
}

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

export default IndexPage
