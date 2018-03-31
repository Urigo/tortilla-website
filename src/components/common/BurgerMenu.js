import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/fontawesome-free-solid'

import Theme from '../../themes/home'

export default class BurgerMenu extends React.Component {
  render() {
    return (
      <FontAwesomeIcon icon={faBars} style={{ color: Theme.primaryGray }} />
    )
  }
}
