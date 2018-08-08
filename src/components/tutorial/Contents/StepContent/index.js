import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { push } from 'gatsby'

import SimpleDiffView from './SimpleDiffView'
import { parseDiff } from '../../../../libs/react-diff-view'
import Stepper from '../../../common/Stepper'
import ImproveButton from '../../ImproveButton'
import { stepRoute, isVersionSpecific } from '../../../../utils/routes'
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
    background-color: #f2f4f6;
    color: #c5c7d0;

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
`

export default class extends React.Component {
  htmlRef = React.createRef()

  componentDidMount() {
    this.appendDiffs()
  }

  componentDidUpdate(props) {
    if (props.step.id !== this.props.step.id) {
      this.appendDiffs()
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
      <Content>
        <StepsHeader style={{ width: `${MenuWidth}px`, float: 'left' }} />
        {this.renderBar(Header)}
        <br />
        <MenuContainer>
          <StepsMenu
            tutorialName={this.props.tutorialName}
            tutorialVersion={this.props.tutorialVersion}
            activeStep={this.props.step}
            pathname={this.props.pathname}
          />
        </MenuContainer>
        <ContentContainer>
          <Html
            ref={ref => this.htmlEl = ReactDOM.findDOMNode(ref)}
            dangerouslySetInnerHTML={{ __html: this.props.step.html }}
          />
        </ContentContainer>
        {this.renderBar(Footer)}
      </Content>
    );
  }

  renderBar(BarType) {
    const step = this.props.step
    const stepsNum = this.props.tutorialVersion.steps.length

    return (
      <BarType>
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

      const files = parseDiff(diff.value)

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
}
