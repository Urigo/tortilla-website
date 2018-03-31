import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const MenuContent = styled.div`
  border-top: 1px solid ${props => props.theme.primaryGray};
  padding-top: 15px;
  margin-top: 15px;
`

const MenuTitle = styled.div`
  font-size: 16px;
  color: ${props => props.theme.darkGray};
  font-weight: 600;
`

const MenuContainer = styled.div`
  margin-bottom: 45px;
  padding-top: 15px;
`

export default class Menu extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    data: PropTypes.any,
  }
  render() {
    return (
      <MenuContainer>
        <MenuTitle>{this.props.title}</MenuTitle>
        <MenuContent>{this.props.children}</MenuContent>
      </MenuContainer>
    )
  }
}
