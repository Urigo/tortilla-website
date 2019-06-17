import React from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'

import { stepRoute } from '../../../../utils/routes'
import session from '../../../../utils/session'

const Steps = styled.div`
  display: block;
  flex-direction: column;
  overflow-y: overlay;
  overflow-x: hidden;
  height: 100%;
  width: 100%;
`

const StepNumber = styled.div`
  min-width: 30px;
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

  ${StepNumber} {
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
    repo: props.tutorialRepo,
    owner: props.tutorialAuthor.username,
    branch: props.tutorialBranch,
    version: props.tutorialVersion.number,
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
    this.pos = this.read()
    this.initial = isNaN(this.pos)

    // For some reason, probably because of the way Gatsby works, the view will be painted
    // only in the next event phase.
    setImmediate(() => {
      this.scrollToActive()
    })
  }

  scrollToActive() {
    if (this.initial) {
      if (this.activeRef) {
        this.activeRef.scrollIntoView(false)
      }
    }
    else if (this.containerRef) {
      this.containerRef.scrollTop = this.pos
    }
  }

  navigate(link) {
    this.save()

    navigate(link)
  }

  save() {
    session.setItem(
      'steps-menu-position',
      this.containerRef.scrollTop
    )
  }

  read() {
    const pos = session.getItem('steps-menu-position')

    session.removeItem('steps-menu-position')

    return Number(pos) || 0
  }

  render() {
    return (
      <Steps style={this.props.style} ref={this.setContainerRef}>
        {this.props.tutorialVersion.steps.map(step => {
          const active =
            this.props.activeStep && step.id === this.props.activeStep.id

          if (active) {
            return (
              <ActiveStep key={step.id} ref={this.setActiveRef}>
                <StepNumber>{step.id}</StepNumber>
                <Name>{step.name}</Name>
              </ActiveStep>
            )
          }
          return (
            <Step key={step.id} onClick={() => this.onChangeStep(step)}>
              <StepNumber>{step.id}</StepNumber>
              <Name>{step.name}</Name>
            </Step>
          )
        })}
      </Steps>
    )
  }

  onChangeStep = (step) => {
    const onChangeStep = typeof this.props.onChangeStep === 'function'
      ? this.props.onChangeStep : () => {}

    const promise = Promise.resolve(onChangeStep(step))

    promise.then(() => this.navigateToStep(step))
  }

  navigateToStep = (step) => {
    const link = propsToLink(this.props, step)

    this.navigate(link)
  }
}
