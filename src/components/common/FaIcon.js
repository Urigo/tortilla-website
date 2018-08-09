import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const FaIcon = ({ className, size, icon, style }) => {
  size = typeof size === 'string' ? size : `${size}px`
  style = style || {}

  return (
    <FontAwesomeIcon
      className={className}
      icon={icon}
      style={{
        fontSize: size,
        lineHeight: size,
        height: size,
        ...style
      }}
    />
  )
}

export default FaIcon
