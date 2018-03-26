import * as React from 'react'
import * as PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'gatsby-link'

import { stepRoute } from '../utils/routes'

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

const MenuContent = styled.div`
  border-top: 1px solid #d2d5de;
  padding-top: 15px;
  margin-top: 15px;
`

const MenuTitle = styled.div`
  font-size: 16px;
  color: #7f859b;
  font-weight: 600;
`

const MenuContainer = styled.div`
  margin-bottom: 45px;
`

class Menu extends React.Component<{
  children: PropTypes.func
  title: PropTypes.string
  data: PropTypes.any
}> {
  render() {
    return (
      <MenuContainer>
        <MenuTitle>{this.props.title}</MenuTitle>
        <MenuContent>{this.props.children}</MenuContent>
      </MenuContainer>
    )
  }
}

const TutorialContainer = styled.div`
  border-radius: 3px;
  background-color: #ffffff;
  box-shadow: 0 1px 2px 0 #dadada;
`

const Tutorial = props => {
  return (
    <TutorialContainer>
      <Link to={props.link}>{props.title}</Link>
      <div>{props.chaptersCount} Chapters</div>
    </TutorialContainer>
  )
}

class IndexPage extends React.Component {
  render() {
    return (
      <Container>
        <SideMenu>
          <Menu title="Language development">
            <div>TBA</div>
          </Menu>
          <Menu title="Author of week">
            <div>TBA</div>
          </Menu>
        </SideMenu>
        <Content>
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
