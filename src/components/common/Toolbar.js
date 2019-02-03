import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme.white};
  padding: 15px 25px;
  box-shadow: 0 2px 4px 0 rgba(87, 71, 81, 0.2);
`

const Left = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Right = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`

const Item = styled.div``

export default class Toolbar extends React.Component {
  static propTypes = {
    left: PropTypes.any, // arrayOf(PropTypes.element),
    right: PropTypes.any,
  }
  render() {
    return (
      <Container>
        <Left>
          {this.props.left.map((elem, i) => (
            <Item key={i}>{elem}</Item>
          ))}
        </Left>
        <Right>
          {this.props.right.map((elem, i) => (
            <Item key={i}>{elem}</Item>
          ))}
        </Right>
      </Container>
    )
  }
}
