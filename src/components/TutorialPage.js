import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import {
  faCompass,
  faCube,
  faListUl,
} from '@fortawesome/fontawesome-free-solid'

import {
  SubMenu,
  SubMenuHeader,
  SubMenuHeaderTitle,
  SubMenuHeaderSubtitle,
} from './tutorial/SubMenu'
import Menu from './tutorial/Menu'
import StepsMenu from './tutorial/StepsMenu'
import Content from './tutorial/Content'

const Container = styled.div`
  height: inherit;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`

const Aside = styled.aside`
  flex: 0 0 auto;
  background: #0e324c;
  align-self: stretch;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
`

const TortillaLink = styled(Link)`
  padding: 0;
  margin: 30px 15px;
  text-align: center;
`

const TortillaLogo = styled.div`
  margin: 0;
  padding: 0;
  width: 42px;
  height: 47px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.primaryGray};
`

export default class TutorialPage extends React.Component {
  menu = [
    { name: 'timeline', icon: faCompass },
    { name: 'sections', icon: faListUl },
    { name: 'todo', icon: faCube },
  ]

  constructor(props) {
    super(props)

    this.state = {
      active: 'sections',
    }
  }

  select(itemName) {
    this.setState({
      active: itemName,
    })
  }

  renderSubMenu() {
    switch (this.state.active) {
      case 'sections':
        return (
          <SubMenu>
            <SubMenuHeader>
              <SubMenuHeaderTitle>Sections</SubMenuHeaderTitle>
              <SubMenuHeaderSubtitle>
                {this.props.tutorial.name}
              </SubMenuHeaderSubtitle>
            </SubMenuHeader>
            <StepsMenu tutorial={this.props.tutorial} step={this.props.step} />
          </SubMenu>
        )
    }
  }

  render() {
    return (
      <Container>
        <Aside>
          <Menu
            menu={this.menu}
            active={this.state.active}
            onSelect={itemName => this.select(itemName)}
          >
            <TortillaLink to="/">
              <TortillaLogo />
            </TortillaLink>
          </Menu>
          {this.renderSubMenu()}
        </Aside>
        <Content {...this.props} />
      </Container>
    )
  }
}
