import React from 'react'
import styled from 'styled-components'
import { exports } from './module'

const Style = (() => {
  const height = '20px'

  return styled.div`
    width: 100%;
    height: ${height};
    display: inline-block;

    ._wrap {
      height: 100%;

      &._selected {
        color: white;
        background-color: ${({ theme }) => theme.primaryBlue};
      }

      &._deselected {
        color: ${({ theme }) => theme.blueGray};
        background-color: white;
      }
    }

    ._node {
      user-select: none;
      cursor: default;
    }

    ._descriptor {
      cursor: pointer;
      display: inline-block;
    }

    ._icon {
      display: inline-block;
      text-align: center;
      line-height: ${height};
      width: 30px;
      height: 100%;
      user-select: none;
      font-weight: bold;
    }

    ._text {
      font-weight: bold;
      display: inline-block;
      line-height: ${height};
      height: 100%;
      user-select: none;
    }
  `
})()

class FSNode extends React.Component {
  get children() {
    return this._children && this._children.target
  }

  set children(children) {
    this._children = children
  }

  constructor(props) {
    super(props)

    this.depth = Number(props.depth) || 0

    const node = props.node

    this.state = {
      node,
      collapsed: typeof node.collapsed === 'boolean' ? node.collapsed : true,
      selected: typeof node.selected === 'boolean' ? node.selected : false,
    }
  }

  componentDidUpdate() {
    this.props.node.collapsed = this.state.collapsed
    this.props.node.selected = this.state.selected
  }

  render() {
    const node = this.state.node
    const collapsed = this.state.collapsed

    return (
      <Style>
        <div className={this.getWrapClass()} style={this.getWrapStyle()}>
          <div className="_node" style={this.getNodeStyle()}>
            <div className="_descriptor" onClick={this.onClick}>
              <div className="_icon">{this.getIcon()}</div>
              <div className="_text">{node.name}</div>
            </div>
            {node.children && !collapsed && (
              <exports.FSTree
                className="_fstree"
                ref={ref => this.children = ref}
                tree={node.children}
                depth={this.depth}
                onSelect={this.onSelect}
                onDeselect={this.onDeselect}
              />
            )}
          </div>
        </div>
      </Style>
    )
  }

  select() {
    if (this.state.selected) return

    this.setState({
      selected: true
    }, () => {
      if (typeof this.props.onSelect === 'function') {
        this.props.onSelect(this.state.node, this)
      }
    })
  }

  deselect() {
    if (!this.state.selected) return

    this.setState({
      selected: false
    }, () => {
      if (typeof this.props.onDeselect === 'function') {
        this.props.onDeselect(this.state.node, this)
      }
    })
  }

  getSelectionPath() {
    if (this.state.selected) {
      return this.state.node.name
    }

    if (this.children) {
      const childSelectionPath = this.children.getSelectionPath()

      if (childSelectionPath) {
        return this.state.node.name + '/' + childSelectionPath
      }
    }
  }

  toggleSelection() {
    return this.state.selected ? this.deselect() : this.select()
  }

  getWrapClass() {
    const selected = this.state.selected ? '_selected' : '_deselected'

    return `_wrap ${selected}`
  }

  getDepthSize(depth = this.depth) {
    let padding = 16 * depth

    if (!this.state.node.children) {
      padding += 14
    }

    return padding + 'px'
  }

  getWrapStyle() {
    const translateX = this.getDepthSize(this.depth - 1)

    return {
      transform: `translateX(-${translateX})`,
      width: `calc(100% + ${translateX})`,
    }
  }

  getNodeStyle() {
    return {
      paddingLeft: this.getDepthSize(this.depth),
      zIndex: this.depth,
    }
  }

  getIcon() {
    const { node, collapsed } = this.state

    if (!node.children) {
      switch (node.mode) {
        case 'added': return '+ 🗎'
        case 'deleted': return '- 🗎'
        case 'modified': return '± 🗎'
        default: return '🗎'
      }
    }

    return collapsed ? '\u00A0\u00A0🗀' : '\u00A0\u00A0🗁'
  }

  collapse() {
    if (this.state.collapsed) return

    this.setState({
      collapsed: true
    }, () => {
      if (typeof this.props.onCollapse === 'function') {
        this.props.onCollapse(this.state.node, this)
      }
    })
  }

  expand() {
    if (!this.state.collapsed) return

    this.setState({
      collapsed: false
    }, () => {
      if (typeof this.props.onExpand === 'function') {
        this.props.onExpand(this.state.node, this)
      }
    })
  }

  toggleCollapse() {
    return this.state.collapsed ? this.expand() : this.collapse()
  }

  onClick = () => {
    if (this.state.node.children) {
      this.toggleCollapse()
    }
    else {
      this.toggleSelection()
    }
  }

  onSelect = (node, component) => {
    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(node, component);
    }
  }

  onDeselect = (node, component) => {
    if (typeof this.props.onDeselect === 'function') {
      this.props.onDeselect(node, component);
    }
  }
}

exports.FSNode = FSNode
