import * as React from 'react'
import styled from 'styled-components'
import * as FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faVideo } from '@fortawesome/fontawesome-free-solid'

const ContainsVideo = styled(FontAwesomeIcon).attrs({
  icon: faVideo,
})`
  position: absolute;
  top: 5px;
  right: 5px;
  color: #fff;
`

const ImagePlaceholder = styled.div`
  position: relative;
  width: 140px;
  height: 120px;
  background-color: #d2d5de;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
`

export default props => (
  <ImagePlaceholder>
    <ContainsVideo />
  </ImagePlaceholder>
)
