import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Header from './home/Header'
import Layout from './layout'

const Container = styled.div`
  background: linear-gradient(to right, #121212, #131313, #121212);
`

const Footer = styled.div`
  color: white;
`

class HomePage extends React.Component {
  static propTypes = {
    tutorials: PropTypes.arrayOf(PropTypes.any),
  }

  render() {
    return (
      <Layout>
        <Container>
          <Header tutorials={this.props.tutorials} />
          <Footer>© 2018 Uri Goldstein</Footer>
        </Container>
      </Layout>
    )
  }
}

export default HomePage
