import React from 'react'
import PropTypes from 'prop-types'
import Header from './home/Header'

class HomePage extends React.Component {
  static propTypes = {
    tutorials: PropTypes.arrayOf(PropTypes.any),
  }

  render() {
    return (
      <span>
        <Header />
      </span>
    )
  }
}

export default HomePage
