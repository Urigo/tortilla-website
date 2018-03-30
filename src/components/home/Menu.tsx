import * as React from 'react'
import * as PropTypes from 'prop-types'
import styled from 'styled-components'

const MenuContent = styled.div`
  border-top: 1px solid #d2d5de;
  padding-top: 15px;
  margin-top: 15px;
`

const MenuTitle = styled.div`
  font-size: 16px;
  color: #7f859b;
  font-weight: 600;
`

const MenuContainer = styled.div`
  margin-bottom: 45px;
  padding-top: 15px;
`

export default class Menu extends React.Component<{
  children: PropTypes.func
  title: PropTypes.string
  data: PropTypes.any
}> {
  render() {
    return (
      <MenuContainer>
        <MenuTitle>{this.props.title}</MenuTitle>
        <MenuContent>{this.props.children}</MenuContent>
      </MenuContainer>
    )
  }
}
