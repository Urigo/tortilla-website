import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

const FontIcon = styled(FontAwesomeIcon)`
    color: ${(props) => props.theme.primaryGray}
    margin-Right: 20px
`

export default FontIcon
