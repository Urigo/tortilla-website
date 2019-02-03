import React from 'react'
import styled from 'styled-components'
import FaIcon from './FaIcon'

const Icon = styled(FaIcon).attrs({
  size: 17,
})`
  color: ${({ theme }) => theme.primaryGray};
`

const SIZE = 40

const Button = styled.button`
  outline: none;
  margin: 0;
  padding: 0;
  width: ${SIZE}px;
  height: ${SIZE}px;
  border-radius: 3px;
  border: solid 1px ${({ theme }) => theme.primaryGray};
  background: transparent;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.darkGray};

    & ${Icon} {
      color: ${({ theme }) => theme.darkGray};
    }
  }
`

export default props => (
  <Button {...props}>
    <Icon icon={props.icon} />
  </Button>
)
