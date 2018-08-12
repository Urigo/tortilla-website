import React from 'react'
import styled from 'styled-components'
import device from '../../utils/device'

const FeatureCard = styled.div`
  width: 260px;
  height: 280px;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 11px 11px 22px 0 rgba(218, 218, 218, 0.41);
  margin: 20px;

  ${device.mobile`
    width: calc(50% - 10px);
    margin: 5px;
  `}

  img {
    width: 120px;
    margin: 0;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
    display: block;

    ${device.mobile`
      width: 100px;
    `}
  }

  ._title {
    font-family: Montserrat;
    font-size: 16px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #4c84ff;
  }

  ._separator {
    width: 26px;
    height: 0.1px;
    border: solid 1.5px #4c84ff;
    margin: 10px;
    margin-left: auto;
    margin-right: auto;
  }

  ._subtitle {
    font-family: Montserrat;
    font-size: 14px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #162c5e;
  }
`

export default ({
  imgSrc,
  title,
  subtitle,
}) => (
  <FeatureCard>
    <img src={imgSrc} alt={title} />
    <div className="_title">{title}</div>
    <div className="_separator" />
    <div className="_subtitle">{subtitle}</div>
  </FeatureCard>
)
