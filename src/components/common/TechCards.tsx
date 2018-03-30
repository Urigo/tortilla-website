import * as React from 'react'
import styled from 'styled-components'
import { withPrefix } from 'gatsby-link'

import TechCard from './TechCards/Card'

const sampleText =
  'Donec facilisis tortor ut augue lacinia, at viverra est semper.'

const image = (framework: string) =>
  withPrefix(`img/tech-cards/${framework}.svg`)

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
        from: '#a6f0e3',
        to: '#28d5b6',
        link: '#28d5b6',
        shadow: '#1e927d',
      }}
      name="Meteor"
      image={image('meteor')}
      text={sampleText}
    />
    <TechCard
      colors={{
        from: '#f798a4',
        to: '#f76c7d',
        link: '#f76c7d',
        shadow: '#b34957',
      }}
      name="Angular"
      image={image('angular')}
      text={sampleText}
    />
    <TechCard
      colors={{
        from: '#84b5ef',
        to: '#4a90e2',
        link: '#4a90e2',
        shadow: '#4171aa',
      }}
      name="Ionic 3"
      image={image('ionic')}
      text={sampleText}
    />
  </Container>
)

export default TechCards
