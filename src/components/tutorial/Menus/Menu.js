import React from 'react'
import styled from 'styled-components'
import FaIcon from '../../common/FaIcon'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: strech;
  border-right: 1px solid;
  border-color: ${({ theme }) => theme.separator};
`

const Separator = styled.div`
  margin: 0 auto 15px auto;
  width: 70%;
  height: 1px;
  background-color: ${({ theme }) => theme.separator};
`

const ItemIcon = styled(FaIcon).attrs({
  size: 24
})``

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
    color: ${props => (props.active ? props.theme.primaryBlue : props.theme.blueGray)};
  }

  &:hover ${ItemIcon}, &:hover ${ItemUnicode} {
    color: ${({ theme }) => theme.primaryBlue};
  }
`

export const ItemBorder = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 4px;
  background-color: ${({ theme }) => theme.primaryBlue};
`

export default class Menu extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (props.active !== state._active) {
      return {
        _active: state.active,
        active: props.active,
      }
    }
    return null
  }

  constructor(props) {
    super(props)

    this.state = {
      active: props.active || null,
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
        {typeof item.icon === 'string' ?
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
