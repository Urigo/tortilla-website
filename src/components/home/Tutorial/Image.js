import React from 'react'
import styled from 'styled-components'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faVideo } from '@fortawesome/fontawesome-free-solid'

const ContainsVideo = styled(FontAwesomeIcon).attrs({
  icon: faVideo,
})`
  position: absolute;
  top: 5px;
  right: 5px;
  color: ${props => props.theme.white};
`

const ImagePlaceholder = styled.div`
  position: relative;
  width: 140px;
  height: 120px;
  background-color: ${props => props.theme.primaryGray};
  box-shadow: ${props => props.theme.boxShadow};
`

export default props => (
  <ImagePlaceholder>
    <ContainsVideo />
  </ImagePlaceholder>
)
