import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Tab from './Tabs/Tab'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export default class Tabs extends React.Component {
  static propTypes = {
    active: PropTypes.string,
    onSelect: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      active: props.active || null,
    }
  }

  select(tab) {
    this.setState({
      active: tab,
    })

    if (this.state.active !== tab) {
      if (this.props.onSelect) {
        this.props.onSelect(tab)
      }
    }
  }

  isActive(tab, index) {
    if (this.state.active === tab || (!this.state.active && index === 0)) {
      return true
    }

    return false
  }

  render() {
    const children = this.props.children

    const wrappedChildren = React.Children.map(children, (tab, i) =>
      React.cloneElement(tab, {
        onClick: () => {
          this.select(tab.props.name)
        },
        active: this.isActive(tab.props.name, i),
      })
    )

    return <Container>{wrappedChildren}</Container>
  }
}
