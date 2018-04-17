import React from 'react'
import styled from 'styled-components'

const Steps = styled.div `
  flex: 1 1 100%;
  height: 100%;
  border-radius: 3px;
  border: solid 1px ${({ theme }) => theme.lightGray};
`

const Step = styled.div `
  padding: 5px 15px;
  font-size: 12px;
  font-weight: normal;
  color: ${({ theme }) => theme.darkGray};
  border-bottom: solid 1px ${({ theme }) => theme.lightGray};

  &:last-child {
    border-bottom: none;
  }

  & > div {
    display: inline-block;
    padding-right: 15px;
    font-size: 17px;
    font-weight: 800;
  }
`

export default props => ( <
  Steps > {
    props.steps.map((name, i) => ( <
      Step >
      <
      div > {
        i + 1
      }. < /div> {name} <
      /Step>
    ))
  } <
  /Steps>
)