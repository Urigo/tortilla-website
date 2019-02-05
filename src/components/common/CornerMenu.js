import styled from 'styled-components'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

export default styled(FontAwesomeIcon).attrs({
  icon: faEllipsisV,
})`
  position: absolute;
  right: 0;
  top: 0;
  display: none;
  visibility: hidden;
  font-size: 14px;
  color: ${props => props.theme.primaryGray};
`
