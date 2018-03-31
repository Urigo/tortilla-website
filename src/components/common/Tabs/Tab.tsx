import * as React from 'react'
import styled from 'styled-components'

const Tab = styled.div`
  padding: 15px 10px;
  font-size: 14px;
  text-align: center;
  color: ${props => props.theme.darkGray};
  border-bottom: 3px solid transparent;
`

const ActiveTab = Tab.extend`
  border-color: ${props => props.theme.primaryBlue};
  color: ${props => props.theme.grayBlue};
`

export default props => {
  if (props.active) {
    return <ActiveTab>{props.children}</ActiveTab>
  }

  return <Tab>{props.children}</Tab>
}
