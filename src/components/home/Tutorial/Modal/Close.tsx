import * as React from 'react'
import styled from 'styled-components'
import * as FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/fontawesome-free-solid'

const Icon = styled(FontAwesomeIcon).attrs({
  icon: faTimes,
})`
  color: #c5c7d0;
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
