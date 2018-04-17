import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  border-radius: 3px;
  border: solid 1px ${({ theme }) => theme.primaryGray};
  display: flex;
  flex-direction: column;
  text-align: center;
`

const Current = styled.div`
  padding: 3px 15px;
  font-size: 24px;
  font-weight: 800;
  color: ${({ theme }) => theme.blueGray};
`

const Count = styled.div`
  padding: 0 5px;
  font-size: 14px;
  font-weight: normal;
  color: ${({ theme }) => theme.primaryGray};
`

export default props => (
  <Container>
    <Current>{props.current}</Current>
    <Count>
      {props.current} / {props.count}
    </Count>
  </Container>
)
