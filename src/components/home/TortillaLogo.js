import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: block;
  width: 100%;
  background: linear-gradient(to right, #0e324c, #2a5f85, #1d4866);
  position: relative;
`

const InnerGlowContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%
  contain: strict;
`

const InnerGlow = styled.div`
  position: absolute;
  width: calc(40vh + 40vw);
  height: calc(40vh + 40vw);
  border-radius: 50%;
  left: calc(50% - calc(20vh + 20vw));
  top: calc(50% - calc(20vh + 20vw));
  box-shadow:
      inset 0 0 50px #fff,      /* inner white */
      inset 20px 0 80px #f0f,   /* inner left magenta short */
      inset -20px 0 80px #0ff,  /* inner right cyan short */
      inset 20px 0 300px #f0f,  /* inner left magenta broad */
      inset -20px 0 300px #0ff, /* inner right cyan broad */
      0 0 50px #fff,            /* outer white */
      -10px 0 80px #f0f,        /* outer left magenta */
      10px 0 80px #0ff;         /* outer right cyan */
`

const OuterGlowContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const OuterGlow = styled.div`
  position: absolute;
  width: calc(100% + 200px);
  height: calc(100% + 100px);
  right: -100px;
  bottom: 0;
  box-shadow:
      inset 0 0 50px #fff,      /* inner white */
      inset 20px 0 80px #f0f,   /* inner left magenta short */
      inset -20px 0 80px #0ff,  /* inner right cyan short */
      inset 20px 0 300px #f0f,  /* inner left magenta broad */
      inset -20px 0 300px #0ff, /* inner right cyan broad */
      0 0 50px #fff,            /* outer white */
      -10px 0 80px #f0f,        /* outer left magenta */
      10px 0 80px #0ff;         /* outer right cyan */
`

const Spaceholder = styled.div`
  display: block;
  width: 100%;
  height: calc(100vh - 100px);
  padding-top: calc(50vh - 150px);
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
      <InnerGlowContainer>
        <InnerGlow />
      </InnerGlowContainer>
      <OuterGlowContainer>
        <OuterGlow />
      </OuterGlowContainer>
      <PreTitle>THE INCREDIBLE</PreTitle>
      <br />
      <Title>TORTILLA</Title>
      <br />
      <SubTitle>The ultimate tutorials-base for JS devs</SubTitle>
    </Spaceholder>
  </Container>
)
