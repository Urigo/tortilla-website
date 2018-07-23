import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const getSize = ({ size }) => typeof size === 'string' ? size : size + 'px'

export default styled(FontAwesomeIcon) `
  font-size: ${getSize};
  line-height: ${getSize};
  height: ${getSize};
`
