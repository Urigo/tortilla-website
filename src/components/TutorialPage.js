import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link, push, withPrefix } from 'gatsby'
import {
  faHistory,
  faListUl,
  faShoePrints,
} from '@fortawesome/fontawesome-free-solid'

import FaIcon from './common/FaIcon'
import storage from '../utils/storage';
import { stepRoute } from '../utils/routes'
import {
  Menu,
  StepsMenu,
  DiffsMenu,
  SubMenu,
  SubMenuHeader,
  SubMenuHeaderTitle,
  SubMenuHeaderGithub,
  SubMenuHeaderClose,
} from './tutorial/Menus'
import VersionsBar from './tutorial/VersionsBar'
import { DiffContent, StepContent } from './tutorial/Contents'
import Layout from './layout'

const topBarHeight = '215px';
const contentHeight = '100%';

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`

const Aside = styled.aside`
  flex: 0 0 auto;
  display: flex;
  align-self: stretch;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
`

const Display = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
`

const TortillaLink = styled(Link) `
  padding: 0;
  margin: 27.5px 15px;
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
  height: ${topBarHeight};
  margin: 0;
`

const TopBarTitle = styled.h1`
  margin: 0;
  margin-bottom: 10px;
  text-overflow: ellipsis;
  font-size: 34px;
`

const TopBarSeparator = styled.div`
  margin: 0;
  margin-top: -20px;
  margin-bottom: 15px;
  text-overflow: ellipsis;
  font-size: 34px;
  font-weight: 800;
`

const TopBarSubTitle = styled.h3`
  margin: 0;
  color: gray;
  margin-bottom: 20px;
  display: inline-block;
  font-size: 17px;
  color: ${({ theme }) => theme.blueGray}
`

const MainContentContainer = styled.div`
  height: ${contentHeight};
  display: block;
  overflow: auto;
  background-color: ${({ theme }) => theme.white};
`

const MainContent = styled.div`
  position: relative;
  display: block;
  clear: both;
  min-height: calc(100% - ${topBarHeight});
`

export default class TutorialPage extends React.Component {
  static propTypes = {
    common: PropTypes.object.isRequired,
    contentType: PropTypes.string.isRequired,
    params: PropTypes.object.isRequired,
    tutorial: PropTypes.object.isRequired,
  }

  get allVersionsNumbers() {
    return this.props.common.allVersions.map(version => version.number)
  }

  menu = [
    { name: 'steps', icon: faShoePrints },
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
        const srcVersions = this.allVersionsNumbers.filter(version =>
          version !== this.props.common.versionNumber
        )

        return (
          <DiffsMenu
            pathname={this.props.location.pathname}
            tutorialName={this.props.tutorial.name}
            destVersion={this.props.common.versionNumber}
            srcVersions={srcVersions}
            activeVersion={this.props.params.srcVersionNumber}
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
      default: return null
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
            scrollerStyle={this.contentStyle}
            scrollerHeight={contentHeight}
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
      default: return null
    }
  }

  render() {
    return (
      <Layout>
        <Container>
          <Aside>
            <Menu
              menu={this.menu}
              active={this.state.activeTab}
              onSelect={itemName => this.select(itemName)}
            >
              <TortillaLink to="/">
                <TortillaLogo src={withPrefix('Logo/logo-tortilla.svg')} alt="Tortilla Logo" />
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
            <MainContentContainer ref={this.defineContentStyle}>
              <TopBar>
                <SubMenuHeaderGithub link={this.props.tutorial.repoUrl} />
                <TopBarTitle>{this.props.tutorial.title}</TopBarTitle>
                <TopBarSeparator>__</TopBarSeparator>
                <TopBarSubTitle>
                  <FaIcon icon={faHistory} size={20} />
                  &nbsp;VERSIONS
                </TopBarSubTitle>
                <VersionsBar
                  allVersions={this.props.common.allVersions}
                  activeVersion={this.props.common.versionNumber}
                  activateVersion={this.activateVersion}
                />
              </TopBar>
              <MainContent>
                {this.renderContent()}
              </MainContent>
            </MainContentContainer>
          </Display>
        </Container>
      </Layout>
    )
  }

  // Will get and store the native .style object of content element
  defineContentStyle = (ref) => {
    if (ref) {
      const contentEl = ReactDOM.findDOMNode(ref)

      this.contentStyle = contentEl.style
      this.originalContentStyle = { ...this.contentStyle }

      this.forceUpdate()
    } else {
      delete this.contentStyle
      delete this.originalContentStyle
    }
  }

  activateVersion = (targetVersion) => {
    const link = stepRoute({
      tutorialName: this.props.common.tutorialName,
      version: targetVersion,
      step: 1,
    })

    push(link)
  }
}
