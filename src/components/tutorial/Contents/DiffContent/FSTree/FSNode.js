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
        background-color: rgb(50, 120, 220);
      }

      &._deselected {
        color: black;
        background-color: white;
      }
    }

    ._node {
      user-select: none;
      cursor: default;
    }

    ._arrow {
      display: inline-block;
      text-align: center;
      line-height: ${height};
      width: 10px;
      height: 100%;
      cursor: pointer;
      transform: translateX(-3px);

      &._collapsed {
        transform: rotate(-90deg);
      }
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

    this.state = {
      node: { ...props.node },
      collapsed: true,
      selected: false,
    }
  }

  render() {
    const node = this.state.node
    const collapsed = this.state.collapsed

    return (
      <Style>
        <div className={this.getWrapClass()} style={this.getWrapStyle()}>
          <div className="_node" style={this.getNodeStyle()}>
            {node.children && (
              <div
                className={this.getArrowClass()}
                onClick={this.onClick}
              >
                ▼
              </div>
            )}
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
    if (!this.state.selected) {
      // Try to deselect child nodes just in case
      if (this.children) {
        this.children.deselect()
      }

      return
    }

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

  getArrowClass() {
    const collapsed = this.state.collapsed ? '_collapsed' : ''

    return `_arrow ${collapsed}`
  }

  getIcon() {
    if (!this.state.node.children) return '🗎'
    if (!this.state.collapsed) return '🗁'

    return '🗀'
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
}

exports.FSNode = FSNode
