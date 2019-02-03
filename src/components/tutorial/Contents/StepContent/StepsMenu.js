import React from 'react'
import styled from 'styled-components'
import { push } from 'gatsby'

import { stepRoute, isVersionSpecific } from '../../../../utils/routes'
import storage from '../../../../utils/storage'

const Steps = styled.div`
  display: block;
  flex-direction: column;
  overflow-y: overlay;
  overflow-x: hidden;
  height: 100%;
  width: 100%;
`

const Number = styled.div`
  width: 30px;
  font-size: 17px;
  font-weight: 800;
  line-height: 30px;
  text-align: center;
  border-radius: 3px;
  color: ${({ theme }) => theme.blueGray};
  background-color: white;
  border: solid 1px ${({ theme }) => theme.blueGray};
`

const Name = styled.div`
  margin-left: 15px;
  font-size: 12px;
  font-weight: normal;
  color: ${({ theme }) => theme.blueGray};
  font-weight: 600;
`

const Step = styled.a`
  display: block;
  padding: 15px 0 15px 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
  border-bottom: solid 1px ${({ theme }) => theme.separator};
  color: ${({ theme }) => theme.blueGray};
  text-decoration: none;
  cursor: pointer;
`

const ActiveStep = styled(Step) `
  outline: 2px solid;
  outline-color: ${({ theme }) => theme.primaryBlue};
  outline-offset: -2px;

  &:hover {
    outline: 2px solid;
    outline-color: ${({ theme }) => theme.primaryBlue};
    outline-offset: -2px;
  }

  ${Number} {
    color: ${({ theme }) => theme.primaryBlue};
    background-color: white;
    border-color: ${({ theme }) => theme.primaryBlue};
    border-width: 2px;
    height: 32px;
    line-height: 28px;
  }

  ${Name} {
    color: ${({ theme }) => theme.primaryBlue};
  }
`

const propsToLink = (props, step) =>
  stepRoute({
    tutorialName: props.tutorialName,
    version: isVersionSpecific(props.pathname) && props.tutorialVersion.number,
    step: step.id,
  })

export default class extends React.Component {
  constructor(props) {
    super()

    this.activeRef = null
    this.setActiveRef = el => (this.activeRef = el)

    this.containerRef = null
    this.setContainerRef = el => (this.containerRef = el)
  }

  componentDidMount() {
    this.scrollToActive()
  }

  scrollToActive() {
    // XXX: We can change this behavior later
    const pos = this.read()

    if (this.activeRef) {
      this.activeRef.scrollIntoView(false)
    } else {
      this.containerRef.parentElement.scrollTop = pos
    }
  }

  push(link) {
    this.save()
    push(link)

    // Will scroll the content back to the top
    if (typeof this.props.resetScroller === 'function') {
      this.props.resetScroller()
    }
  }

  save() {
    storage.setItem(
      'steps-menu-position',
      this.containerRef.parentElement.scrollTop
    )
  }

  read() {
    const pos = storage.getItem('steps-menu-position')

    storage.removeItem('steps-menu-position')

    return pos || 0
  }

  render() {
    return (
      <Steps style={this.props.style} ref={this.setContainerRef}>
        {this.props.tutorialVersion.steps.map(step => {
          const active =
            this.props.activeStep && step.id === this.props.activeStep.id
          const link = propsToLink(this.props, step)

          if (active) {
            return (
              <ActiveStep key={step.id} ref={this.setActiveRef}>
                <Number>{step.id}</Number>
                <Name>{step.name}</Name>
              </ActiveStep>
            )
          }
          return (
            <Step key={step.id} onClick={() => this.push(link)}>
              <Number>{step.id}</Number>
              <Name>{step.name}</Name>
            </Step>
          )
        })}
      </Steps>
    )
  }
}
