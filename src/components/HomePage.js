import React from 'react'
import PropTypes from 'prop-types'
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

class HomePage extends React.Component {
  static propTypes = {
    tutorials: PropTypes.arrayOf(PropTypes.any),
  }

  frameworks = [
    {
      name: 'Angular',
      author: 'Google',
      image: 'angular',
    },
    {
      name: 'Meteor',
      author: 'Meteor Dev Group',
      image: 'meteor',
    },
    {
      name: 'Ionic',
      author: 'Drifty',
      image: 'ionic',
    },
  ]

  authors = [
    {
      name: 'Gregory Greene',
    },
    {
      name: 'John Robinson',
    },
  ]

  selectTab(tab) {}

  render() {
    return (
      <Container>
        <SideMenu>
          <Frameworks frameworks={this.frameworks} />
          <AuthorOfWeek authors={this.authors} />
        </SideMenu>
        <Content>
          <Header>
            <Tabs active="popular" onSelect={tab => this.selectTab(tab)}>
              <Tab name="all">All</Tab>
              <Tab name="popular">Popular</Tab>
              <Tab name="newest">Newest</Tab>
            </Tabs>
            <Button>Submit your tutorial</Button>
          </Header>
          <Grid>
            {this.props.tutorials.map(({ node }, i) => {
              return node.versions.map((version, j) => (
                <Tutorial
                  link={stepRoute({
                    tutorialName: node.title,
                    versionName: version.name,
                    step: version.steps[0],
                  })}
                  steps={version.steps}
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

export default HomePage
