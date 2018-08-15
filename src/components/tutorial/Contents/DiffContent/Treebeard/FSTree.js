import * as _ from 'lodash'
import React from 'react'
import styled from 'styled-components'

const margin = '8px'

const Style = styled.div`
  > ._nodes-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  > ._nodes-list-item {
    margin-top: ${margin};
    margin-bottom: ${margin};
  }
`

class FsTree extends React.Component {
  constructor(props) {
    super(props)

    this.depth = Number(props.depth) || 0

    this.state = {
      tree: props.tree
    }

    this._nodes = []
  }

  componentWillUpdate() {
    this._nodes = []
  }

  componentWillReceiveProps(props) {
    const state = {}

    if (props.hasOwnProperty('tree')) {
      state.tree = props.tree
    }

    if (_.size(state)) {
      this.setState(state)
    }
  }

  getNodes() {
    return this._nodes
      .filter(Boolean)
      .map(({ target }) => target)
  }

  render() {
    const tree = this.state.tree

    return (
      <Style>
        <ul className="_nodes-list">
          {tree.map((node, index) => (
            <li key={index} className="_nodes-list-item">
              <FSNode ref={ref => this._nodes.push(ref)}
                      node={node}
                      depth={this.depth + 1}
              />
            </li>
          ))}
        </ul>
      </Style>
    )
  }

  deselect() {
    this.getNodes().forEach((node) => {
      node.deselect()
    })
  }

  getSelectionPath() {
    const nodes = this.getNodes()

    for (let node of nodes) {
      const childSelectionPath = node.getSelectionPath()

      if (childSelectionPath) {
        return childSelectionPath
      }
    }
  }
}

export default FsTree
