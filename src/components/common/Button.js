import styled from 'styled-components'

const Button = styled.button`
  padding: 5px 15px;
  border: solid 1px ${props => props.theme.primaryGray};
  border-radius: 3px;
  background: transparent;
  font-size: 14px;
  text-align: center;
  color: ${props => props.theme.primaryBlue};

  &:hover {
    cursor: pointer;
  }
`

export default Button
