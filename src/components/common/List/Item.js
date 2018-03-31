import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const Left = styled.div`
  flex: 0 0 35px;
  text-align: center;
`

const Middle = styled.div`
  flex: 1 1 auto;
  padding: 0 15px;
`

const Right = Left

export default class Item extends React.Component {
  static propTypes = {
    left: PropTypes.func,
    middle: PropTypes.func,
    right: PropTypes.func,
  }
  render() {
    return (
      <Container>
        <Left>{this.props.left && this.props.left()}</Left>
        <Middle>{this.props.middle && this.props.middle()}</Middle>
        <Right>{this.props.right && this.props.right()}</Right>
      </Container>
    )
  }
}
