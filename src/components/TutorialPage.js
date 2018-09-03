import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { push } from 'gatsby'
import { faHistory } from '@fortawesome/fontawesome-free-solid'
import FaIcon from './common/FaIcon'
import { stepRoute, diffRoute } from '../utils/routes'
import MainNavBar from './tutorial/MainNavBar'
import VersionsBar from './tutorial/VersionsBar'
import { DiffContent, StepContent } from './tutorial/Contents'
import Layout from './layout'
import { GithubAuthor } from './tutorial/GithubAuthor'

const topBarHeight = '215px';
const contentHeight = '100%';

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`

const Display = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
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
  white-space: nowrap;
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
            resetScroller={this.resetScroller}
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
            resetScroller={this.resetScroller}
          />
        )
      default: return null
    }
  }

  render() {
    return (
      <Layout>
        <Container>
          <Display>
            <MainContentContainer ref={ref => this.container = ReactDOM.findDOMNode(ref)}>
              <MainNavBar backHandler={this.navHome} />
              <TopBar>
                <GithubAuthor link={this.props.tutorial.repoUrl} />
                <TopBarTitle>{this.props.tutorial.title}</TopBarTitle>
                <TopBarSeparator>__</TopBarSeparator>
                <TopBarSubTitle>
                  <FaIcon icon={faHistory} size={20} />
                  &nbsp;VERSIONS
                </TopBarSubTitle>
                <VersionsBar
                  allVersions={this.props.common.allVersions}
                  activeVersion={this.props.common.versionNumber}
                  activateStep={this.activateStep}
                  activateDiff={this.activateDiff}
                  contentType={this.props.contentType}
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

  activateStep = (version) => {
    const link = stepRoute({
      tutorialName: this.props.common.tutorialName,
      version: version.number,
      step: 1,
    })

    push(link)
  }

  activateDiff = (srcVersion, destVersion) => {
    const link = diffRoute({
      tutorialName: this.props.common.tutorialName,
      srcVersion: srcVersion.number,
      destVersion: destVersion.number,
    })

    push(link)
  }

  navHome = () => {
    push('/')
  }

  resetScroller = () => {
    if (this.container) {
      this.container.scrollTop = 0
    }
  }
}
