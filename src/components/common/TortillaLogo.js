import React from 'react'
import styled from 'styled-components'
import { withPrefix } from 'gatsby-link'

const Container = styled.div`
  display: block;
  width: 100%;
  background: linear-gradient(to right, #0e324c, #2a5f85, #1d4866);
`

const Spaceholder = styled.div`
  display: block;
  width: 100%;
  height: calc(100vh - 100px);
  padding-top: calc(35vh - 50px);
  text-align: center;
  margin: 0;
`

const PreTitle = styled.div`
  color: ${({ theme }) => theme.white};
  font-size: calc(1.5vw + 3vh);
  text-transform: uppercase;
  margin-bottom: calc(2vw + 2.5vh);
`

const Title = styled.div`
  color: ${({ theme }) => theme.white};
  text-align: center;
  font-weight: 800;
  font-size: calc(5vw + 5vh);
  text-transform: uppercase;
  margin-bottom: calc(2vw + 2.5vh);
`

const SubTitle = styled.div`
  color: ${({ theme }) => theme.white};
  text-align: center;
  font-size: calc(1vw + 2vh);
`

export default () => (
  <Container>
    <Spaceholder>
      <PreTitle>THE INCREDIBLE</PreTitle>
      <br />
      <Title>TORTILLA</Title>
      <br />
      <SubTitle>The ultimate tutorials-base for JS devs</SubTitle>
    </Spaceholder>
  </Container>
)
