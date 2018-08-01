import React from 'react'
import styled from 'styled-components'

const FeatureCardsSection = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;

  > ._title {
    font-family: Montserrat;
    font-size: 34px;
    font-weight: 800;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #142345;
  }

  > ._subtitle {
    max-width: 935px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    height: 80px;
    font-family: Montserrat;
    font-size: 16px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #5b6f9d;
  }

  > ._feature-cards {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export default ({
  title,
  subtitle,
  children,
  style,
}) => (
  <FeatureCardsSection style={style}>
    <div className="_title">{title}</div>
    <div className="_subtitle">{subtitle}</div>
    <div className="_feature-cards">{children}</div>
  </FeatureCardsSection>
)
