import React from 'react'
import styled from 'styled-components'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import Theme from '../../themes/home'

import OutlineButton from './OutlineButton'

const Icon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.primaryGray};
`

const SIZE = 26

const Button = styled.button`
  outline: none;
  margin: 0;
  padding: 0;
  width: ${SIZE}px;
  height: ${SIZE}px;
  line-height: ${SIZE}px;
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
    <Icon icon={props.icon} size={16} />
  </Button>
)
