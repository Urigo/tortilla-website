import * as React from 'react'

import Toolbar from './Toolbar'
import BurgerMenu from './BurgerMenu'
import TortillaLogo from './TortillaLogo'
import Bookmaks from './Bookmarks'
import Notifications from './Notifications'
import ToolbarSeparator from './Toolbar/Separator'
import Avatar from './Avatar'
import Search from './Search'

export default class Header extends React.Component {
  renderLeft() {
    return [
      <BurgerMenu />,
      <TortillaLogo to="/" />,
      <Search placeholder="Search..." />,
    ]
  }

  renderRight() {
    return [<Bookmaks />, <Notifications />, <ToolbarSeparator />, <Avatar />]
  }

  render() {
    return <Toolbar left={this.renderLeft()} right={this.renderRight()} />
  }
}
