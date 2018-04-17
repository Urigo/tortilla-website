import React from 'react'
import styled from 'styled-components'
import Link, { navigateTo } from 'gatsby-link'

import { stepRoute } from '../../utils/routes'

export const Steps = styled.div`
  display: flex;
  flex-direction: column;

  & > *:first-child {
    border-top: 0 none;
  }
`

const Number = styled.div`
  width: 30px;
  font-size: 17px;
  font-weight: 800;
  line-height: 30px;
  text-align: center;
  border-radius: 3px;
  color: #0e324c;
  background-color: #1d4866;
  border: solid 1px #0e324c;
`

const Name = styled.div`
  margin-left: 15px;
  font-size: 12px;
  font-weight: normal;
  color: #0e324c;
`

const Step = styled.a`
  display: block;
  padding: 15px 0 15px 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #2a5f85;
  border-top: solid 1px #0e324c;
  text-decoration: none;
  cursor: pointer;
`

const ActiveStep = Step.extend`
  ${Number} {
    color: ${({ theme }) => theme.primaryBlue};
    background-color: ${({ theme }) => '#0e324c'};
    border-color: ${({ theme }) => theme.white};
  }

  ${Name} {
    color: ${({ theme }) => theme.white};
  }
`

const propsToLink = (props, step) =>
  stepRoute({
    tutorialName: props.tutorial.name,
    versionName: props.tutorial.version.name,
    step,
  })

export default class extends React.Component {
  constructor(props) {
    super();

    this.activeRef = null;
    this.setActiveRef = el => this.activeRef = el;

    this.containerRef = null;
    this.setContainerRef = el => this.containerRef = el;
  }

  componentDidMount() {
    this.scrollToActive();
  }

  scrollToActive() {
    // XXX: We can change this behaviour later
    const pos = this.read();

    if (pos) {
      this.containerRef.parentElement.scrollTop = pos;
    } else {
      this.activeRef.scrollIntoView(false);
    }
  }

  navigateTo(link) {
    this.save();
    navigateTo(link);
  }

  save() {
    localStorage.setItem('steps-menu-position', this.containerRef.parentElement.scrollTop)
  }

  read() {
    const pos = localStorage.getItem('steps-menu-position');
    
    localStorage.removeItem('steps-menu-position');
    
    return pos;
  }

  render() {
    return <Steps innerRef={this.setContainerRef}>
      {this.props.tutorial.version.steps.map(step => {
        const active = step.id === this.props.step.id
        const link = propsToLink(this.props, step)

        if (active) {
          return (
            <ActiveStep key={step.id} onClick={() => this.navigateTo(link)} innerRef={this.setActiveRef}>
              <Number>{step.id}</Number>
              <Name>{step.name}</Name>
            </ActiveStep>
          )
        }
        return (
          <Step key={step.id} onClick={() => this.navigateTo(link)}>
            <Number>{step.id}</Number>
            <Name>{step.name}</Name>
          </Step>
        )
      })}
    </Steps>;
  }
}
