import React from 'react'
import styled from 'styled-components'
import FaIcon from '@fortawesome/react-fontawesome'

const getSize = ({ size }) => typeof size === 'string' ? size : size + 'px'

export default styled(FaIcon) `
  font-size: ${getSize};
  line-height: ${getSize};
  height: ${getSize};
`
