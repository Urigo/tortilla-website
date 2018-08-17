import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Style = styled.div`
  color: #9da5ab;
  background-color: #22262b;
`

class FilesNavigator extends React.Component {
  static propTypes = {
    rootChildren: PropTypes.arrayOf(PropTypes.object).isRequired,
    onNodeToggle: PropTypes.func,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const state = {}

    if (
      nextProps.hasOwnProperty('rootChildren') &&
      prevState.root.children !== nextProps.rootChildren
    ) {
      state.root = {
        path: prevState.root.path,
        children: nextProps.rootChildren,
      }
      state.prevNodes = []
      state.activeNode = prevState.root
    }

    return state
  }

  state = {}

  constructor(props) {
    super(props)

    this.state.root = {
      path: '',
      children: props.rootChildren,
    }
    this.state.prevNodes = []
    this.state.activeNode = this.state.root
  }

  goDown(node) {
    this.setState({
      prevNodes: this.state.prevNodes.concat(this.state.activeNode),
      activeNode: node,
    })
  }

  goUp() {
    this.setState({
      activeNode: this.state.prevNodes.pop()
    })
  }

  render() {
    return (
      <Style>
        <div className="_location-bar">{`/${this.state.activeNode.path}`}</div>
        <ul className="_child-nodes-list">
          {this.state.prevNodes.length !== 0 && (
            <li className="_child-node-item" key=".." onClick={() => this.goUp()}>..</li>
          )}
          {this.state.activeNode.children.map((childNode) => (
            <li className="_child-node-item" key={`${childNode.path}_${childNode.active}`} onClick={() => this.onNodeClick(childNode)}>{childNode.name}</li>
          ))}
        </ul>
      </Style>
    )
  }

  onNodeClick(node) {
    if (node.children) {
      this.goDown(node)
    }
    else {
      node.active = !node.active

      if (typeof this.props.onNodeToggle === 'function') {
        this.props.onNodeToggle(node)
      }
    }
  }
}

export default FilesNavigator
