import * as React from 'react'
import styled from 'styled-components'

const HeadsContainer = styled.div`
  padding-left: 7px;
  display: flex;
  flex-direction: row-reverse;
`
const Head = styled.div`
  display: inline-block;
  margin-left: -7px;
  width: 22px;
  height: 22px;
  border: solid 1px #ffffff;
  border-radius: 50%;
  background-color: #d2d5de;

  &:hover {
    z-index: 1;
  }
`

export default props => (
  <HeadsContainer>
    <Head />
    <Head />
    <Head />
  </HeadsContainer>
)
