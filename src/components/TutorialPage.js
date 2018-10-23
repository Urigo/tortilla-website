import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { push } from 'gatsby'
import { faHistory } from '@fortawesome/fontawesome-free-solid'
import featuredTutorials from '../featured-tutorials.json'
import device from '../utils/device'
import { stepRoute, diffRoute } from '../utils/routes'
import FaIcon from './common/FaIcon'
import Layout from './layout'
import { DiffContent, StepContent } from './tutorial/Contents'
import { GithubAuthor } from './tutorial/GithubAuthor'
import MainNavBar from './tutorial/MainNavBar'
import VersionsBar from './tutorial/VersionsBar'

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

@device.only('desktop')
class TutorialPage extends React.Component {
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
            tutorial={this.props.tutorial}
            location={this.props.location}
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
            location={this.props.location}
            tutorial={this.props.tutorial}
            resetScroller={this.resetScroller}
          />
        )
      default: return null
    }
  }

  render() {
    const featuredTutorial = featuredTutorials[this.props.tutorial.name]

    return (
      <Layout>
        <Container>
          <Display>
            <MainContentContainer ref={ref => this.container = ReactDOM.findDOMNode(ref)}>
              <MainNavBar backHandler={this.navHome} />
              <TopBar>
                {featuredTutorial && (
                  <TutorialImage src={featuredTutorial.image} style={{
                    backgroundColor: `rgb(${featuredTutorial.background})`,
                    boxShadow: `10px 10px 20px 0 rgba(${featuredTutorial.background},.2)`,
                  }} />
                )}
                <div style={{
                  display: 'inline-block',
                  width: `calc(100% - ${featuredTutorial ? 130 : 0}px)`,
                }}>
                  <GithubAuthor link={this.props.tutorial.repoUrl} author={this.props.tutorial.author} />
                  <TopBarTitle>{featuredTutorial ? featuredTutorial.title : this.props.tutorial.title}</TopBarTitle>
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

export default TutorialPage
