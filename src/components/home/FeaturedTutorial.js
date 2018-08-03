import React from 'react'
import styled from 'styled-components'

const FeaturedTutorial = styled.div`
  width: ${({ size }) => size}px;
  padding-top: 30px;
  height: 193px;
  margin: 10px;

  > ._box {
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    padding-top: 20px;
    padding-bottom: 10px;
    border-radius: 29px;
    cursor: pointer;

    > img {
      width: ${({ imgSize }) => imgSize}px;
      height: ${({ imgSize }) => imgSize}px;
      display: block;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 15px;
    }

    > ._title {
      width: 100%;
      padding-left: 5px;
      padding-right: 5px;
      font-family: Montserrat;
      font-size: 16px;
      font-weight: 800;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: center;
      color: #ffffff;
    }
  }

  > ._description {
    margin-top: 20px;
    font-family: Montserrat;
    font-size: 13px;
    font-weight: 300;
    font-style: italic;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: -0.2px;
    text-align: center;
    color: #5b6f9d;
  }
`

export default ({
  imgSrc,
  title,
  description,
  style,
}) => (
  <FeaturedTutorial size={164} imgSize={80}>
    <div className="_box" style={style}>
      <img src={imgSrc} alt={title} />
      <div className="_title">{title}</div>
    </div>

    <div className="_description">{description}</div>
  </FeaturedTutorial>
)
