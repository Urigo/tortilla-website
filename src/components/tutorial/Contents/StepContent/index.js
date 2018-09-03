import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { push } from 'gatsby'

import storage from '../../../../utils/storage'
import { parseDiff } from '../../../../libs/react-diff-view'
import Stepper from '../../../common/Stepper'
import ImproveButton from '../../ImproveButton'
import { stepRoute, isVersionSpecific } from '../../../../utils/routes'
import SimpleDiffView from './SimpleDiffView'
import StepsHeader from './StepsHeader'
import StepsMenu from './StepsMenu'

const occupied = Symbol('occupied')
const MenuWidth = 300

const Content = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.white};

  > br {
    clear: both;
    float: left;
    display: block;
    position: relative;
  }
`

const MenuContainer = styled.div`
  float: left;
  width: ${MenuWidth}px;
`

const ContentContainer = styled.div`
  float: left;
  width: calc(100% - ${MenuWidth}px);
  border-left: solid 1px ${({ theme }) => theme.separator};
`

const Header = styled.div`
  padding: 10.5px 25px;
  border-bottom: 1px solid ${({ theme }) => theme.separator};
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  float: left;
  width: calc(100% - ${MenuWidth}px);
  border-left: solid 1px ${({ theme }) => theme.separator};
`

const Footer = Header.extend`
  border-top: 1px solid ${({ theme }) => theme.separator};
  margin-left: ${MenuWidth}px;
`

const Left = styled.div`
  display: flex;
  flex-direction: row;

  & > * {
    margin-right: 10px;
  }
`

const Info = styled.div`
  display: flex;
  margin-left: 10px;
  flex-direction: column;
  justify-content: space-between;
`

const Title = styled.div`
  font-size: 18px;
  font-weight: 800;
`

const Right = styled.div`
  display: flex;
  flex-direction: row;
`

const Html = styled.div`
  padding: 25px;
  color: ${({theme}) => theme.lightBlack};
  font-weight: normal;
  font-size: 14px;
  flex: 0 1 auto;
  overflow-y: auto;

  a {
    font-style: italic;
    text-decoration: none;
    color: #e3465a;
  }

  a:hover {
    text-decoration: underline;
  }

  pre {
    background-color: #f8f8f8;
    color: black;

    code {
      font-size: 12px;
    }
  }

  h1 {
    font-size: 34px;
    font-weight: 800;
    color: ${({theme}) => theme.blueGray};
  }

  h4 {
    font-size: 24px;
    font-weight: 800;
    color: ${({theme}) => theme.blueGray};
  }

  img {
    display: block;
    margin: 25px auto !important;
  }
`

export default class extends React.Component {
  get contentContainerStyle() {
    return this.state.stepsMenuOpen ? {} : {
      width: '100%'
    }
  }

  get footerStyle() {
    return this.state.stepsMenuOpen ? {} : {
      width: '100%',
      marginLeft: 0,
    }
  }

  htmlRef = React.createRef()

  state = {
    stepsMenuOpen: storage.getItem('steps-menu-position') || true
  }

  componentDidMount() {
    window.addEventListener('scroll', this.resetStepsMenuDimensions, true)

    this.resetStepsMenuDimensions()
    this.appendDiffs()
    this.fixImages()
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.resetStepsMenuDimensions, true)
  }

  componentDidUpdate(props) {
    if (props.step.id !== this.props.step.id) {
      this.appendDiffs()
      this.fixImages()
    }
  }

  changeStep(id) {
    const route = stepRoute({
      tutorialName: this.props.tutorialName,
      version: (
        isVersionSpecific(this.props.pathname) &&
        this.props.tutorialVersion.number
      ),
      step: id,
    });

    push(route);
  }

  render() {
    return (
      <Content ref={ref => this.container = ReactDOM.findDOMNode(ref)}>
        <StepsHeader
          ref={ref => this.stepsHeader = ReactDOM.findDOMNode(ref)}
          opened={this.state.stepsMenuOpen}
          style={{ width: `${MenuWidth}px`, float: 'left' }}
          close={this.closeStepsMenu}
          open={this.openStepsMenu}
        />
        {this.renderBar(Header)}
        <br />
        {this.state.stepsMenuOpen && (
          <MenuContainer ref={ref => this.stepsMenu = ReactDOM.findDOMNode(ref)}>
            <StepsMenu
              tutorialName={this.props.tutorialName}
              tutorialVersion={this.props.tutorialVersion}
              activeStep={this.props.step}
              pathname={this.props.pathname}
              resetScroller={this.props.resetScroller}
            />
          </MenuContainer>
        )}
        <ContentContainer style={this.contentContainerStyle}>
          <Html
            ref={ref => this.htmlEl = ReactDOM.findDOMNode(ref)}
            dangerouslySetInnerHTML={{ __html: this.props.step.html }}
          />
        </ContentContainer>
        {this.renderBar(Footer, {
          style: this.footerStyle
        })}
      </Content>
    );
  }

  renderBar(BarType, props = {}) {
    const step = this.props.step
    const stepsNum = this.props.tutorialVersion.steps.length

    return (
      <BarType {...props}>
        <Left>
          <Title>{step.name}</Title>
        </Left>
        <Right>
          {/* // In case git URL is not defined in package.json */}
          {this.props.tutorialRepo && (
            <ImproveButton
              step={step.id}
              url={this.props.tutorialRepo}
              branch={this.props.tutorialBranch}
            />
          )}
          <Info>
            <Stepper
              limit={stepsNum}
              current={step.id - 1}
              onChange={i => this.changeStep(i + 1)} />
          </Info>
        </Right>
      </BarType>
    )
  }

  // TODO: Apply during build
  appendDiffs = async (diff, anchor, file) => {
    if (!diff) {
      return Promise.all(this.props.step.diffs.map((diff) => {
        return this.appendDiffs(diff)
      }))
    }

    if (!anchor) {
      const title = `Step ${diff.index}`

      anchor = Array.from(this.htmlEl.childNodes).find((node) => {
        return (
          node.tagName === 'H4' &&
          node.innerText.match(title) &&
          !node[occupied]
        )
      })

      anchor[occupied] = true

      // We'll make it the user's responsibility
      const files = parseDiff(diff.value, {
        showLong: true
      })

      // First we need to collect the anchors before making modification, otherwise the
      // DOM tree would change and nextSibling would result in different elements
      const anchors = files.map(() => {
        return anchor = anchor.nextElementSibling
      })

      return Promise.all(files.map((file) => {
        return this.appendDiffs(diff, anchors.shift(), file)
      }))
    }

    const container = document.createElement('span')

    this.htmlEl.insertBefore(container, anchor.nextSibling)

    return new Promise((resolve) => {
      ReactDOM.render(
        <SimpleDiffView hunks={file.hunks} key={`${file.oldPath}_${file.newPath}`} />
      , container, resolve)
    })
  }

  // TODO: Apply during build
  fixImages = () => {
    this.htmlEl.querySelectorAll('img').forEach((el) => {
      if (el.src) {
        el.src = el.src.replace(/(.+?github\.com\/[^/]+\/[^/]+\/)blob/, '$1raw')
      }
    })
  }

  openStepsMenu = () => {
    this.setState({
      stepsMenuOpen: true
    }, () => {
      window.addEventListener('scroll', this.resetStepsMenuDimensions, true)
      storage.setItem('steps-menu-opened', true)
      this.resetStepsMenuDimensions()
    })
  }

  closeStepsMenu = () => {
    this.setState({
      stepsMenuOpen: false
    }, () => {
      window.removeEventListener('scroll', this.resetStepsMenuDimensions, true)
      storage.setItem('steps-menu-opened', false)
      this.resetStepsMenuDimensions()
    })
  }

  resetStepsMenuDimensions = (e) => {
    if (!this.state.stepsMenuOpen) {
      if (this.stepsHeader) {
        this.stepsHeader.style.transform = ''
      }

      if (this.stepsMenu) {
        this.stepsMenu.style.transform = ''
      }

      return
    }

    if (!this.container) return

    const { top } = this.container.getBoundingClientRect()
    const offset = Math.min(top, 0)

    if (this.stepsHeader) {
      this.stepsHeader.style.transform = `translateY(${-offset}px)`
    }

    if (this.stepsMenu) {
      this.stepsMenu.style.transform = `translateY(${-offset}px)`
    }
  }
}
