import styled from 'styled-components'

export default styled.input.attrs({
  type: 'text',
})`
  margin-left: 25px;
  padding: 5px 10px;
  font-size: 14px;
  font-weight: 300;
  font-style: italic;
  border-radius: 3px;
  border: solid 1px ${props => props.theme.primaryGray};
  color: ${props => props.theme.primaryGray};
`