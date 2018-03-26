import * as React from 'react'
import * as PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
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

export interface Props {
  left: PropTypes.any // arrayOf(PropTypes.element),
  right: PropTypes.any
}

export default class Toolbar extends React.Component<Props> {
  render() {
    return (
      <Container>
        <Left>{this.props.left}</Left>
        <Right>{this.props.right}</Right>
      </Container>
    )
  }
}
