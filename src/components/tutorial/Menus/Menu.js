import React from 'react'
import styled from 'styled-components'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: strech;
`

const Separator = styled.div`
  margin: 0 auto 15px auto;
  width: 70%;
  height: 1px;
  background-color: rgba(113, 134, 150, 0.37);
`

const ItemIcon = styled(FontAwesomeIcon) `
  font-size: 24px;
`

const ItemUnicode = styled.div`
  font-weight: bolder;
  font-size: 30px;
  color: #718696;
`

const Item = styled.div`
  margin: 15px 0;
  padding: 5px 0;
  display: block;
  position: relative;
  text-align: center;
  cursor: pointer;

  ${ItemIcon}, ${ItemUnicode} {
    color: ${props => (props.active ? props.theme.white : props.theme.blueGray)};
  }

  &:hover ${ItemIcon}, &:hover ${ItemUnicode} {
    color: ${({ theme }) => theme.white};
  }
`

export const ItemBorder = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 6px;
  border-radius: 0 6px 6px 0;
  background-color: ${({ theme }) => theme.primaryBlue};
`

export default class Menu extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      active: props.active || null,
    }
  }

  componentWillReceiveProps(props) {
    const state = {}

    if (props.active !== this.props.active) {
      state.active = props.active
    }

    if (Object.keys(state).length) {
      this.setState(state)
    }
  }

  select(item, i) {
    this.setState({
      active: item.name,
    })

    if (this.props.onSelect) {
      this.props.onSelect(item.name)
    }
  }

  isActive(item) {
    return this.state.active === item.name
  }

  renderItem(item, i) {
    return (
      <Item
        key={i}
        active={this.isActive(item)}
        onClick={() => this.select(item, i)}
      >
        {this.isActive(item, i) ? <ItemBorder /> : null}
        {typeof item.icon == 'string' ?
          <ItemUnicode>{item.icon}</ItemUnicode> :
          <ItemIcon icon={item.icon} />}
      </Item>
    )
  }

  render() {
    return (
      <Container>
        {this.props.children}
        <Separator />
        {this.props.menu.map((item, i) => this.renderItem(item, i))}
      </Container>
    )
  }
}
