import styled from 'styled-components'

export default styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  & > * {
    margin: ${props => props.margin || '25px 25px 0 0'};
  }
`
