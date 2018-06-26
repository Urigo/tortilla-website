import React from 'react'
import styled from 'styled-components'
import { withPrefix } from 'gatsby-link'

const Container = styled.div`
  display: block;
  align-items: center;
  color: ${props => props.theme.tortillaBlue};
  font-size: 18px;
  line-height: 18px;
  font-weight: 800;
  font-style: italic;
  text-transform: lowercase;
  text-decoration: none;
  width: 100%;
  text-align: center;
  line-height: 50%;
  background: linear-gradient(to right, #0e324c, #2a5f85, #1d4866);
`

const TortillaImg = styled.img`
  margin: 0;
  height: 40px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  min-width: 250px;
  width: 40%;
  height: auto;
`

export default () => (
  <Container>
    <TortillaImg src={withPrefix('img/logo.png')} alt="Tortilla Logo" />
  </Container>
)
