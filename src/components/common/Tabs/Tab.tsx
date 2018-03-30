import * as React from 'react'
import styled from 'styled-components'

const Tab = styled.div`
  padding: 15px 10px;
  font-size: 14px;
  text-align: center;
  color: #7f859b;
  border-bottom: 3px solid transparent;
`

const ActiveTab = Tab.extend`
  border-color: #4c84ff;
  color: #182e3f;
`

export default props => {
  if (props.active) {
    return <ActiveTab>{props.children}</ActiveTab>
  }

  return <Tab>{props.children}</Tab>
}
