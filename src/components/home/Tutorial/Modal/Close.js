import React from 'react'
import styled from 'styled-components'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/fontawesome-free-solid'

const Icon = styled(FontAwesomeIcon).attrs({
  icon: faTimes,
})`
  color: ${props => props.theme.primaryGray};
`

const Button = styled.button`
  background: transparent;
  outline: none;
  border: none;
  cursor: pointer;
`

export default props => (
  <Button onClick={() => props.onClick()}>
    <Icon />
  </Button>
)
