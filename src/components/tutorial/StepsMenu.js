import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'

import { stepRoute } from '../../utils/routes'

export const Steps = styled.div`
  display: flex;
  flex-direction: column;
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

const Step = styled(Link)`
  padding: 15px 0 15px 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #2a5f85;
  border: solid 1px #0e324c;
  text-decoration: none;
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

export default props => (
  <Steps>
    {props.tutorial.version.steps.map(step => {
      const active = step.id === props.step.id
      const link = propsToLink(props, step)

      if (active) {
        return (
          <ActiveStep key={step.id} to={link}>
            <Number>{step.id}</Number>
            <Name>{step.name}</Name>
          </ActiveStep>
        )
      }
      return (
        <Step key={step.id} to={link}>
          <Number>{step.id}</Number>
          <Name>{step.name}</Name>
        </Step>
      )
    })}
  </Steps>
)
