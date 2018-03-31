import React from 'react'
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
  border: solid 1px ${props => props.theme.white};
  border-radius: 50%;
  background-color: ${props => props.theme.primaryGray};

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
