import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'gatsby-link'
import {
  faCompass,
  faCube,
  faHistory,
  faListUl,
} from '@fortawesome/fontawesome-free-solid'

import storage from '../utils/storage';
import {
  Menu,
  StepsMenu,
  DiffsMenu,
  SubMenu,
  SubMenuHeader,
  SubMenuHeaderTitle,
  SubMenuHeaderSubtitle,
  SubMenuHeaderGithub,
  SubMenuHeaderClose,
} from './tutorial/Menus'
import { DiffContent, StepContent } from './tutorial/Contents'
import Timeline from './tutorial/Timeline'
import ImproveButton from './tutorial/ImproveButton'

const Container = styled.div`
  height: inherit;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`

const Aside = styled.aside`
  flex: 0 0 auto;
  background: #0e324c;
  align-self: stretch;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
`

const TortillaLink = styled(Link) `
  padding: 0;
  margin: 30px 15px;
  text-align: center;
`

const TortillaLogo = styled.div`
  margin: 0;
  padding: 0;
  width: 42px;
  height: 47px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.primaryGray};
`

const SubMenuContent = styled.div`
  flex: 1 1 auto;
  overflow-x: auto;
`

const ImproveTutorial = styled.div`
  padding: 25px;
  background-color: #1d4866;
  box-shadow: inset 0 1px 0 0 #0e324c;
`

export default class TutorialPage extends React.Component {
  static propTypes = {
    pathData: PropTypes.object.isRequired,
    tutorialData: PropTypes.object.isRequired,
  }

  menu = [
    { name: 'timeline', icon: faCompass },
    { name: 'steps', icon: faListUl },
    { name: 'diffs', icon: faHistory },
    { name: 'todo', icon: faCube },
  ]

  events = [
    {
      id: 1,
      date: 'November 27, 2017',
      name: 'Angular 4.4.3 + Meteor 1.6',
      author: {
        name: 'Nathan Fisher',
      },
      versions: [],
    },
    {
      id: 2,
      date: 'November 27, 2017',
      name: 'Ionic 3',
      author: {
        name: 'Terry Andrews',
      },
      versions: [],
    },
    {
      id: 3,
      date: 'November 27, 2017',
      name: 'Socially Merge Version',
      author: {
        name: 'Judith Lawrence',
      },
      versions: [],
    },
  ]

  constructor(props) {
    super(props)

    // TODO: if use was in `steps`, clicked on a step
    // and has been redirected to that step
    // it should set `steps` as `state.activeTab`, it also applies to others

    this.state = {
      activeTab: props.pathData.activeContent,
      isSubMenuOpen: JSON.parse(storage.getItem('tortilla:tutorial:menu') || true),
    }
  }

  select(itemName) {
    this.setState({
      activeTab: itemName,
    })

    this.open();
  }

  close() {
    this.setState({
      isSubMenuOpen: false,
    });

    storage.setItem('tortilla:tutorial:menu', JSON.stringify(false))
  }

  open() {
    storage.setItem('tortilla:tutorial:menu', JSON.stringify(true))

    this.setState({
      isSubMenuOpen: true
    })
  }

  renderSubMenuContent() {
    switch (this.state.activeTab) {
      case 'diffs':
        return (
          <DiffsMenu
            tutorialName={this.props.tutorialData.name}
            srcVersion={this.props.tutorialData.currentVersion}
            destVersions={this.props.pathData.otherVersionsNumbers}
            activeVersion={this.props.pathData.destVersionNumber}
          />
        )
      case 'steps':
        return (
          <StepsMenu
            tutorialName={this.props.tutorialData.name}
            tutorialVersion={this.props.tutorialData.version}
            activeStep={this.props.pathData.step}
          />
        )
      case 'timeline':
        return (
          <Timeline
            events={this.events}
            active={1}
            onSelect={event => console.log('event selected', event)}
          />
        )
    }
  }

  renderContent() {
    switch (this.props.pathData.activeContent) {
      case 'diffs':
        return (
          <DiffContent
            tutorialName={this.props.tutorialData.name}
            srcVersion={this.props.pathData.versionNumber}
            destVersion={this.props.pathData.destVersionNumber}
            diff={this.props.pathData.versionsDiff}
          />
        )
      case 'steps':
        return (
          <StepContent
            step={this.props.pathData.step}
            tutorialName={this.props.tutorialData.name}
            tutorialVersion={this.props.tutorialData.version}
          />
        )
    }
  }

  render() {
    return (
      <Container>
        <Aside>
          <Menu
            menu={this.menu}
            active={this.state.activeTab}
            onSelect={itemName => this.select(itemName)}
          >
            <TortillaLink to="/">
              <TortillaLogo />
            </TortillaLink>
          </Menu>`
          {this.state.isSubMenuOpen ? <SubMenu>
            <SubMenuHeader>
              <SubMenuHeaderTitle>Sections</SubMenuHeaderTitle>
              <SubMenuHeaderSubtitle>
                {this.props.tutorialData.name}
              </SubMenuHeaderSubtitle>
              <SubMenuHeaderGithub link={this.props.tutorialData.github.link}/>
              <SubMenuHeaderClose onClick={() => this.close()} />
            </SubMenuHeader>
            <SubMenuContent>{this.renderSubMenuContent()}</SubMenuContent>
            <ImproveTutorial>
              <ImproveButton />
            </ImproveTutorial>
          </SubMenu> : null}
        </Aside>
        {this.renderContent()}
      </Container>
    )
  }
}
