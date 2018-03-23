import * as React from 'react'

import TechCard from './TechCard'

const sampleText =
  'Donec facilisis tortor ut augue lacinia, at viverra est semper.'

const TechCards = () => (
  <div
    style={{
      paddingBottom: '30px',
      marginBottom: '30px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
    }}
  >
    <TechCard
      colors={{
        from: '#a6f0e3',
        to: '#28d5b6',
        link: '#28d5b6',
        shadow: '#1e927d',
      }}
      name="Meteor"
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
      text={sampleText}
    />
  </div>
)

export default TechCards
