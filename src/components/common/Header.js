import React from 'react'
import styled from 'styled-components'
import TortillaLogo from './TortillaLogo'

const FeatureBar = styled.div `
  background: #34363F;
  border-top: 1px solid #3F414B;
  border-bottom: 10px solid #30323a;
  color: white;
  line-height: 48px;
  display: block;
  width: 100%;
  height: 48px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.15);
  text-align: center;
`

export default class Header extends React.Component {
  render() {
    return (
      <span>
        <TortillaLogo />
        <FeatureBar>FEATURED</FeatureBar>
      </span>
    )
  }
}
