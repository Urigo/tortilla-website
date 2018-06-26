import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  display: block;
  margin-top: 200px;
`

const StayTuned = styled.span`
  color: ${props => props.theme.tortillaBlue};
  font-size: 100px;
  font-weight: 800;
  font-style: italic;
  text-transform: uppercase;
  text-decoration: none;
`

class HomePage extends React.Component {
  static propTypes = {
    tutorials: PropTypes.arrayOf(PropTypes.any),
  }

  render() {
    const { pathname } = this.props.location

    return (
      <Container>
        <StayTuned>Tortilla</StayTuned>
      </Container>
    )
  }
}

export default HomePage
