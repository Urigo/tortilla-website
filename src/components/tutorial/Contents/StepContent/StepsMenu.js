import React from 'react'
import styled from 'styled-components'
import { push } from 'gatsby'
import { faList, faTimes, faAngleDown } from '@fortawesome/fontawesome-free-solid'

import { stepRoute, isVersionSpecific } from '../../../../utils/routes'
import storage from '../../../../utils/storage'
import FaIcon from '../../../common/FaIcon'

const HeaderHeight = 63
const UnderlineHeight = 4

const Steps = styled.div`
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  height: ${HeaderHeight}px;
  border-bottom: solid 1px ${({ theme }) => theme.separator};
  padding-top: 10px;

  > ._title {
    > ._text {
      margin: 10px;
      float: left;
      font-family: Montserrat;
      font-size: 17px;
      font-weight: 800;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      letter-spacing: normal;
      color: ${({theme}) => theme.primaryBlue};
    }
  }
`

const Underline = styled.span`
  width: 165px;
  border-radius: 6px;
  margin-top: ${-UnderlineHeight / 2}px;
  height: ${UnderlineHeight}px;
  background-color: ${({theme}) => theme.primaryBlue};
`

const ListIcon = styled(FaIcon).attrs({
  icon: faList,
  size: 20,
})`
  float: left;
  margin: 10px;
  color: ${({theme}) => theme.primaryBlue};
`

const CloseBtn = styled(FaIcon).attrs({
  icon: faTimes,
  size: 20,
})`
  cursor: pointer;
  float: right;
  margin: 10px;
  color: ${({theme}) => theme.primaryBlue};
`

const OpenBtn = styled(FaIcon).attrs({
  icon: faAngleDown,
  size: 20,
})`
  cursor: pointer;
  float: right;
  margin: 10px;
  color: ${({theme}) => theme.primaryBlue};
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

const ActiveStep = Step.extend`
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
    super();

    this.activeRef = null;
    this.setActiveRef = el => this.activeRef = el;

    this.containerRef = null;
    this.setContainerRef = el => this.containerRef = el;

    this.state = {
      opened: true || storage.getItem('steps-menu-opened')
    }
  }

  componentDidMount() {
    this.scrollToActive();
  }

  scrollToActive() {
    if (!this.state.opened) return

    // XXX: We can change this behaviour later
    const pos = this.read();

    if (this.activeRef) {
      this.activeRef.scrollIntoView(false);
    } else {
      this.containerRef.parentElement.scrollTop = pos;
    }
  }

  push(link) {
    this.save();
    push(link);
  }

  save() {
    storage.setItem('steps-menu-position', this.containerRef.parentElement.scrollTop)
  }

  read() {
    const pos = storage.getItem('steps-menu-position');

    storage.removeItem('steps-menu-position');

    return pos || 0;
  }

  render() {
    return (
      <Steps innerRef={this.setContainerRef}>
        <Header>
          <div className="_title">
            <ListIcon />
            <div className="_text">STEPS</div>
          </div>
          {this.state.opened ? (
            <CloseBtn onClick={this.close} />
          ) : (
            <OpenBtn onClick={this.open} />
          )}
        </Header>
        <Underline />
        {this.state.opened && this.props.tutorialVersion.steps.map(step => {
          const active = this.props.activeStep &&
            step.id === this.props.activeStep.id
          const link = propsToLink(this.props, step)

          if (active) {
            return (
              <ActiveStep key={step.id} innerRef={this.setActiveRef}>
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

  open = () => {
    this.setState({
      opened: true
    }, () => {
      storage.setItem('steps-menu-opened', true)
    })
  }

  close = () => {
    this.setState({
      opened: false
    }, () => {
      storage.setItem('steps-menu-opened', false)
    })
  }
}
