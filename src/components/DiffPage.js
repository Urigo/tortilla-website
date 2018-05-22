import React from 'react'
import PropTypes from 'prop-types'

export default class DiffPage extends React.Component {
  static propTypes = {
    tutorial: PropTypes.any.isRequired,
    srcVersionNumber: PropTypes.any.isRequired,
    destVersionNumber: PropTypes.any.isRequired,
    versionsDiff: PropTypes.any.isRequired,
  }

  render() {
    const { tutorial, srcVersionNumber, destVersionNumber, versionsDiff } = this.props

    return (
      <div>
        <div>{tutorial.name}</div>
        <div>{srcVersionNumber}</div>
        <div>{destVersionNumber}</div>
        <div>{versionsDiff}</div>
      </div>
    )
  }
}
