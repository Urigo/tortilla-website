import React from 'react'
import styled from 'styled-components'
import { push } from 'gatsby'

import Stepper from '../../common/Stepper'
import ImproveButton from '../ImproveButton'
import { stepRoute, isVersionSpecific } from '../../../utils/routes'

const Content = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.white};
  display: flex;
  flex-direction: column;
  align-self: stretch;
`

const Header = styled.div`
  padding: 10px 25px;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: left;
`

const Footer = Header.extend`
  border-top: 1px solid #e8e8e8;
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
  font-size: 24px;
  font-weight: 800;
  color: #0e324c;
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
        {this.renderBar(Header)}
        <Html dangerouslySetInnerHTML={{ __html: this.props.step.html }} />
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
}
