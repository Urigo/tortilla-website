import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { navigate } from 'gatsby'
import { faHistory } from '@fortawesome/free-solid-svg-icons'
import featuredTutorials from '../featured-tutorials'
import { stepRoute, diffRoute } from '../utils/routes'
import FaIcon from './common/FaIcon'
import SeoHelmet from './common/SeoHelmet'
import Layout from './layout'
import { DiffContent, StepContent } from './tutorial/Contents'
import { GithubAuthor } from './tutorial/GithubAuthor'
import MainNavBar from './tutorial/MainNavBar'
import VersionsBar from './tutorial/VersionsBar'

const topBarHeight = '215px'
const contentHeight = '100%'

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

const TutorialImage = styled.img`
  width: 110px;
  height: 165px;
  display: 'inline-block';
  border-radius: 5px;
  padding: 0 10px;
  margin-right: 20px;
  transform: translateY(3px);
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
  overflow: hidden;
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
  color: ${({ theme }) => theme.blueGray};
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

class TutorialPage extends React.Component {
  static propTypes = {
    common: PropTypes.object.isRequired,
    contentType: PropTypes.string.isRequired,
    params: PropTypes.object.isRequired,
    tutorial: PropTypes.object.isRequired,
  }

  componentDidUpdate() {
    if (this.pendingScrollerReset) {
      this.container.scrollTop = 0
      delete this.pendingScrollerReset
    }
  }

  render() {
    const tutorialKey = `${this.props.tutorial.author.username}/${this.props.tutorial.repo}/${this.props.tutorial.branch}`
    const featuredTutorial = featuredTutorials[tutorialKey]

    return (
      <Layout>
        <SeoHelmet
          title={
            featuredTutorial
              ? featuredTutorial.title
              : this.props.tutorial.title
          }
        />
        <Container>
          <Display>
            <MainContentContainer
              ref={(ref) => (this.container = ReactDOM.findDOMNode(ref))}
            >
              <MainNavBar backHandler={this.navHome} />
              <TopBar>
                {featuredTutorial && (
                  <TutorialImage
                    src={featuredTutorial.imageSrc}
                    style={{
                      backgroundColor: `rgb(${featuredTutorial.backgroundColor})`,
                      boxShadow: `10px 10px 20px 0 rgba(${featuredTutorial.backgroundColor},.2)`,
                    }}
                  />
                )}
                <div
                  style={{
                    display: 'inline-block',
                    width: `calc(100% - ${featuredTutorial ? 130 : 0}px)`,
                  }}
                >
                  <GithubAuthor
                    link={this.props.tutorial.repoUrl}
                    author={this.props.tutorial.author}
                  />
                  <TopBarTitle>
                    {featuredTutorial
                      ? featuredTutorial.title
                      : this.props.tutorial.title}
                  </TopBarTitle>
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
                </div>
              </TopBar>
              <MainContent>{this.renderContent()}</MainContent>
            </MainContentContainer>
          </Display>
        </Container>
      </Layout>
    )
  }

  renderContent() {
    switch (this.props.contentType) {
      case 'diffs':
        return (
          <DiffContent
            tutorial={this.props.tutorial}
            location={this.props.location}
            tutorialImage={this.props.common.tutorialImage}
            tutorialTitle={this.props.common.tutorialTitle}
            srcVersion={this.props.params.srcVersionNumber}
            srcHistory={this.props.params.srcVersionHistory}
            destVersion={this.props.params.destVersionNumber}
            destHistory={this.props.params.destVersionHistory}
            scrollerHeight={contentHeight}
            diff={this.props.params.versionsDiff}
            resetScroller={this.resetScroller}
          />
        )
      case 'steps':
        return (
          <StepContent
            step={this.props.params.step}
            location={this.props.location}
            tutorial={this.props.tutorial}
            tutorialImage={this.props.common.tutorialImage}
            tutorialTitle={this.props.common.tutorialTitle}
            resetScroller={this.resetScroller}
          />
        )
      default:
        return null
    }
  }

  activateStep = (version) => {
    const link = stepRoute({
      repo: this.props.common.tutorialRepo,
      owner: this.props.common.tutorialAuthor.username,
      branch: this.props.common.tutorialBranch,
      version: version.number,
      step: 0,
    })

    navigate(link)
  }

  activateDiff = (srcVersion, destVersion) => {
    const link = diffRoute({
      owner: this.props.common.tutorialAuthor.username,
      branch: this.props.common.tutorialBranch,
      repo: this.props.common.tutorialRepo,
      srcVersion: srcVersion.number,
      destVersion: destVersion.number,
    })

    navigate(link)
  }

  navHome = () => {
    navigate('/')
  }

  resetScroller = () => {
    // Will be invoked in componentDidUpdate()
    this.pendingScrollerReset = true
  }
}

export default TutorialPage
