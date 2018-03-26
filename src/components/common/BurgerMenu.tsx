import * as React from 'react'
import * as FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/fontawesome-free-solid'

export default class BurgerMenu extends React.Component {
  render() {
    return <FontAwesomeIcon icon={faBars} style={{ color: '#d2d5de' }} />
  }
}
