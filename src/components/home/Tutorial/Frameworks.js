import React from 'react'
import styled from 'styled-components'
import { withPrefix } from 'gatsby-link'

const Image = styled.img`
  margin: 0;
  padding: 0;
  width: 22px;
  height: 22px;
  border-radius: 50%;
`

const Container = styled.div`
  display: flex;
  flex-direction: row;

  & > * {
    margin-right: 10px;
  }
`
export default props => (
  <Container>
    <Image src={withPrefix(`img/logos/meteor.svg`)} />
    <Image src={withPrefix(`img/logos/angular.svg`)} />
    <Image src={withPrefix(`img/logos/ionic.svg`)} />
  </Container>
)
