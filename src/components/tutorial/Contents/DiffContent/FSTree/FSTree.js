import React from 'react'
import styled from 'styled-components'
import { exports } from './module'

const Style = styled.div`
  > ._nodes-list {
    margin: 0;
    padding: 0;
    margin-top: 15px;
    list-style-type: none;
  }

  > ._nodes-list-item {
    margin-top: 8px 0;
  }
`

class FSTree extends React.Component {
  static getDerivedStateFromProps(props) {
    const state = {}

    if (props.hasOwnProperty('tree')) {
      state.tree = props.tree
    }

    return state
  }

  constructor(props) {
    super(props)

    this.depth = Number(props.depth) || 0

    this.state = {
      tree: props.tree,
    }

    this._nodes = []
  }

  getSnapshotBeforeUpdate() {
    this._nodes = []

    return null
  }

  getNodes() {
    return this._nodes.filter(Boolean).map(({ target }) => target)
  }

  render() {
    const tree = this.state.tree

    return (
      <Style>
        <ul className="_nodes-list">
          {tree.map((node) => (
            <li key={node.name} className="_nodes-list-item">
              <exports.FSNode
                ref={(ref) => this._nodes.push(ref)}
                node={node}
                depth={this.depth + 1}
                onSelect={this.onSelect}
                onDeselect={this.onDeselect}
                onCollapse={this.onCollapse}
                onExpand={this.onExpand}
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

  onDeselect = (node, component) => {
    if (typeof this.props.onDeselect === 'function') {
      this.props.onDeselect(node, component)
    }
  }

  onSelect = (node, component) => {
    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(node, component)
    }
  }

  onCollapse = (node, component) => {
    if (typeof this.props.onCollapse === 'function') {
      this.props.onCollapse(node, component)
    }
  }

  onExpand = (node, component) => {
    if (typeof this.props.onExpand === 'function') {
      this.props.onExpand(node, component)
    }
  }
}

exports.FSTree = FSTree
