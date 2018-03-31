import styled from 'styled-components'

// styled(Link)`
// display: block;
// text-decoration: none;
export default styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${props => props.theme.grayBlue};

  &:hover {
    color: ${props => props.theme.primaryBlue};
    cursor: pointer;
  }
`
