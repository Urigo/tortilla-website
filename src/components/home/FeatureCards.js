import React from 'react'
import styled from 'styled-components'
import { withPrefix } from 'gatsby-link'

import Theme from '../../themes/home'
import FeatureCard from './FeatureCards/Card'

const sampleText =
  'Donec facilisis tortor ut augue lacinia, at viverra est semper.'

const image = framework => withPrefix(`img/feature-cards/${framework}.svg`)

const CardsContainer = styled.div`
  display: block;
  width: 100%;
  padding-bottom: 30px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
`

const GlowContainer = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: 200px;
  transform: translateY(-60px);
  overflow: hidden;
`

const Glow = styled.div`
  position: absolute;
  width: calc(100% + 400px);
  height: 400px;
  right: -200px;
  top: 0;
  box-shadow:
      inset 0 0 100px #fff,      /* inner white */
      inset 20px 0 160px #f0f,   /* inner left magenta short */
      inset -20px 0 160px #0ff,  /* inner right cyan short */
      inset 20px 0 300px #f0f,  /* inner left magenta broad */
      inset -20px 0 300px #0ff, /* inner right cyan broad */
      0 0 50px #fff,            /* outer white */
      -10px 0 160px #f0f,        /* outer left magenta */
      10px 0 160px #0ff;         /* outer right cyan */
`

const GlowOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 300px;
  bottom: -50px;
  background: radial-gradient(rgba(242, 245, 247, 1), rgba(242, 245, 247, 0) 100%);
`

const SubmitButton = styled.div`
  position: absolute;
  display: block;
  right: 0;
  z-index: 1;
  margin: 10px;
  box-sizing: border-box;
  padding: 10px;
  border: none;
  color: rgba(255,255,255,1);
  text-decoration: normal;
  text-align: center;
  text-overflow: clip;
  white-space: pre;
  text-shadow: 0 0 10px rgba(255,255,255,1) , 0 0 20px rgba(255,255,255,1) , 0 0 30px rgba(255,255,255,1) , 0 0 40px #ff00de , 0 0 70px #ff00de , 0 0 80px #ff00de , 0 0 100px #ff00de ;
  transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);

  &:hover {
    text-shadow: 0 0 10px rgba(255,255,255,1) , 0 0 20px rgba(255,255,255,1) , 0 0 30px rgba(255,255,255,1) , 0 0 40px #00ffff , 0 0 70px #00ffff , 0 0 80px #00ffff , 0 0 100px #00ffff;
    cursor: pointer;
  }
`

const FeatureCards = () => (
  <div>
    <CardsContainer>
      <FeatureCard
        colors={{
          from: Theme.meteorGradientFrom,
          to: Theme.meteorGradientTo,
          link: Theme.meteorLink,
          shadow: Theme.meteorShadow,
        }}
        name="Meteor"
        image={image('meteor')}
        text={sampleText}
      />
      <FeatureCard
        colors={{
          from: Theme.angularGradientFrom,
          to: Theme.angularGradientTo,
          link: Theme.angularLink,
          shadow: Theme.angularShadow,
        }}
        name="Angular"
        image={image('angular')}
        text={sampleText}
      />
      <FeatureCard
        colors={{
          from: Theme.ionicGradientFrom,
          to: Theme.ionicGradientTo,
          link: Theme.ionicLink,
          shadow: Theme.ionicShadow,
        }}
        name="Ionic 3"
        image={image('ionic')}
        text={sampleText}
      />
    </CardsContainer>
    <GlowContainer>
      <Glow />
      <GlowOverlay />
      <SubmitButton>Submit your tutorial</SubmitButton>
    </GlowContainer>
  </div>
)

export default FeatureCards
