import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link, { withPrefix } from 'gatsby-link'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {
  faHistory,
  faListUl,
} from '@fortawesome/fontawesome-free-solid'

import storage from '../utils/storage';
import {
  Menu,
  StepsMenu,
  DiffsMenu,
  VersionsMenu,
  SubMenu,
  SubMenuHeader,
  SubMenuHeaderTitle,
  SubMenuHeaderSubtitle,
  SubMenuHeaderGithub,
  SubMenuHeaderClose,
} from './tutorial/Menus'
import { DiffContent, StepContent } from './tutorial/Contents'

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`

const Aside = styled.aside`
  flex: 0 0 auto;
  display: flex;
  background: #0e324c;
  align-self: stretch;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
`

const Display = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
`

const TortillaLink = styled(Link) `
  padding: 0;
  margin: 30px 15px;
  text-align: center;
`

const TortillaLogo = styled.img`
  margin: 0;
  padding: 0;
  width: 42px;
  height: 47px;
`

const SubMenuContent = styled.div`
  flex: 1 1 auto;
  overflow-x: auto;
`

const TopBar = styled.div`
  border-bottom: 1px solid #e8e8e8;
  padding: 20px 20px 0 20px;
  margin: 0;
`

const TopBarTitle = styled.h1`
  margin: 0;
  margin-bottom: 10px;
`

const TopBarSubTitle = styled.h3`
  margin: 0;
  color: gray;
  margin-bottom: 10px;
  display: inline-block;
`

const MainContentContainer = styled.div`
  display: block;
  overflow: auto;
`

const MainContent = styled.div`
  clear: both;
`

export default class TutorialPage extends React.Component {
  static propTypes = {
    common: PropTypes.object.isRequired,
    contentType: PropTypes.string.isRequired,
    params: PropTypes.object.isRequired,
    tutorial: PropTypes.object.isRequired,
  }

  menu = [
    { name: 'versions', icon: faHistory },
    { name: 'steps', icon: '👣' },
    { name: 'diffs', icon: faListUl },
  ]

  constructor(props) {
    super(props)

    // TODO: if use was in `steps`, clicked on a step
    // and has been redirected to that step
    // it should set `steps` as `state.activeTab`, it also applies to others

    this.state = {
      activeTab: storage.getItem('tortilla:tutorial:menu') && props.contentType,
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
      activeTab: null,
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
        const destVersions = this.props.common.allVersionsNumbers.filter(version =>
          version != this.props.common.versionNumber
        )

        return (
          <DiffsMenu
            pathname={this.props.location.pathname}
            tutorialName={this.props.tutorial.name}
            srcVersion={this.props.common.versionNumber}
            destVersions={destVersions}
            activeVersion={this.props.params.destVersionNumber}
          />
        )
      case 'steps':
        return (
          <StepsMenu
            pathname={this.props.location.pathname}
            tutorialName={this.props.tutorial.name}
            tutorialVersion={this.props.tutorial.version}
            activeStep={this.props.params.step}
          />
        )
      case 'versions':
        return (
          <VersionsMenu
            tutorialName={this.props.tutorial.name}
            activeVersion={this.props.common.versionNumber}
            allVersions={this.props.common.allVersionsNumbers}
            latestVersion={this.props.common.tutorialVersion}
          />
        )
    }
  }

  renderContent() {
    switch (this.props.contentType) {
      case 'diffs':
        return (
          <DiffContent
            tutorialName={this.props.tutorial.name}
            tutorialRepo={this.props.tutorial.repoUrl}
            srcVersion={this.props.params.srcVersionNumber}
            srcHistory={this.props.params.srcVersionHistory}
            destVersion={this.props.params.destVersionNumber}
            destHistory={this.props.params.destVersionHistory}
            diff={this.props.params.versionsDiff}
          />
        )
      case 'steps':
        return (
          <StepContent
            step={this.props.params.step}
            pathname={this.props.location.pathname}
            tutorialName={this.props.tutorial.name}
            tutorialRepo={this.props.tutorial.repoUrl}
            tutorialBranch={this.props.tutorial.branch}
            tutorialVersion={this.props.tutorial.version}
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
              <TortillaLogo src={withPrefix('img/logo.png')} alt="Tortilla Logo" />
            </TortillaLink>
          </Menu>
          {this.state.isSubMenuOpen ? <SubMenu>
            <SubMenuHeader>
              <SubMenuHeaderClose onClick={() => this.close()} />
              <SubMenuHeaderTitle>
                {this.state.activeTab}
              </SubMenuHeaderTitle>
            </SubMenuHeader>
            <SubMenuContent>{this.renderSubMenuContent()}</SubMenuContent>
          </SubMenu> : null}
        </Aside>
        <Display>
          <MainContentContainer>
            <TopBar>
              <TopBarTitle>{this.props.tutorial.title}</TopBarTitle>
              <TopBarSubTitle>Version {this.props.common.versionNumber}</TopBarSubTitle>
              <SubMenuHeaderGithub link={this.props.tutorial.repoUrl}/>
            </TopBar>
            <MainContent>
              {this.renderContent()}
            </MainContent>
          </MainContentContainer>
        </Display>
      </Container>
    )
  }
}
