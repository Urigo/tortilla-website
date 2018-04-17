import styled from 'styled-components'

export default styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${props => props.theme.grayBlue};
  max-height: 52px;
  overflow: hidden;
  word-break: break-word;

  &:hover {
    color: ${props => props.theme.primaryBlue};
    cursor: pointer;
  }
`
