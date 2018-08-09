import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const FaIcon = (props) => {
  props = { ...props }
  let { size, style } = props
  size = typeof size === 'string' ? size : `${size}px`
  style = style || {}
  delete props.size
  delete props.style

  return (
    <FontAwesomeIcon {...props} style={{
        fontSize: size,
        lineHeight: size,
        height: size,
        ...style
      }}
    />
  )
}

export default FaIcon
