import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;

  & > * {
    padding: 10px 0;
  }
`

export default class List extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    renderItem: PropTypes.func,
  }

  render() {
    return (
      <Container>
        {this.props.data.map((item, i, all) =>
          this.props.renderItem(item, i, all)
        )}
      </Container>
    )
  }
}
