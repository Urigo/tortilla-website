import React from 'react'
import styled from 'styled-components'
import { withPrefix } from 'gatsby-link'

import Theme from '../../themes/home'
import TechCard from './TechCards/Card'

const sampleText =
  'Donec facilisis tortor ut augue lacinia, at viverra est semper.'

const image = framework => withPrefix(`img/tech-cards/${framework}.svg`)

const Container = styled.div`
  padding-bottom: 30px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
`

const TechCards = () => (
  <Container>
    <TechCard
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
    <TechCard
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
    <TechCard
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
  </Container>
)

export default TechCards
