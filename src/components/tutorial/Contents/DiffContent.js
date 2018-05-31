import React from 'react'

export default class extends React.Component {
  render() {
    return (
      <div>
        {this.props.tutorialName}
        {this.props.srcVersion}
        {this.props.destVersion}
        {this.props.versionsDiff}
      </div>
    )
  }
}
