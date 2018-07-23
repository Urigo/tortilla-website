import React from 'react'
import styled from 'styled-components'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

const Button = styled.button`
  outline: none;
  margin: 0;
  padding: 0;
  font-size: 16px;
  border-radius: 3px;
  border: solid 1px ${({ theme }) => theme.primaryGray};
  color: ${({ theme }) => theme.primaryGray};
  background: transparent;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.primaryBlue};
    color: ${({ theme }) => theme.primaryBlue};

    & > * {
      color: ${({ theme }) => theme.primaryBlue};
    }
  }
`

export default props => {
  if (props.icon) {
    return (
      <Button {...props}>
        <FontAwesomeIcon icon={props.icon} />
      </Button>
    )
  }

  return <Button {...props}>{props.children}</Button>
}
