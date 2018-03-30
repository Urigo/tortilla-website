import styled from 'styled-components'
import * as FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/fontawesome-free-solid'

export default styled(FontAwesomeIcon).attrs({
  icon: faEllipsisV,
})`
  position: absolute;
  right: 0;
  top: 0;
  display: none;
  visibility: hidden;
  font-size: 14px;
  color: #c5c7d0;
`
