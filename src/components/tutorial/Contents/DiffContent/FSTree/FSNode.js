import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import {
  faFile,
  faFolder,
  faFolderOpen,
  faCaretDown,
  faCaretRight,
} from '@fortawesome/free-solid-svg-icons'

import FaIcon from './../../../../common/FaIcon'
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
      transform: translateY(-2px);
    }

    ._descriptor {
      cursor: pointer;
      display: inline-block;
      white-space: nowrap;
    }

    ._icon {
      display: inline-block;
      text-align: center;
      line-height: ${height};
      width: 30px;
      height: 100%;
      user-select: none;
      font-weight: bold;

      ._caret {
        margin-right: 5px;
        margin-left: -5px;
      }

      ._mode {
        display: inline-block;
        width: 18px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        font-weight: 800;
        margin-left: -15px;
        margin-right: 5px;
        border: 1px solid ${({ theme }) => theme.blueGray};
        border-radius: 3px;
        background-color: white;
        color: ${({ theme }) => theme.blueGray};

        &._added {
          color: #356611;
        }

        &._deleted {
          color: #951b1b;
        }
      }
    }

    ._text {
      font-weight: bold;
      display: inline-block;
      line-height: ${height};
      height: 100%;
      user-select: none;
      text-overflow: ellipsis;
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
      node: props.node,
    }
  }

  render() {
    const { node } = this.state

    return (
      <Style>
        <div className={this.getWrapClass()} style={this.getWrapStyle()}>
          <div className="_node" style={this.getNodeStyle()}>
            <div className="_descriptor">
              <div className="_icon" onClick={this.toggleCollapse}>
                {this.getIcon()}
              </div>
              <div className="_text" onClick={this.toggleSelection}>
                {node.name}
              </div>
            </div>
            {node.children && !node.collapsed && (
              <exports.FSTree
                className="_fstree"
                ref={(ref) => (this.children = ref)}
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
    if (this.state.node.selected) return Promise.resolve()

    try {
      ReactDOM.findDOMNode(this)
    } catch (e) {
      // If not mounted, still perform operation on node
      const node = this.state.node
      node.selected = true

      return Promise.resolve()
    }

    return new Promise((resolve) => {
      this.setState(
        {
          node: Object.assign(this.state.node, {
            selected: true,
          }),
        },
        () => {
          if (typeof this.props.onSelect === 'function') {
            this.props.onSelect(this.state.node, this)
          }

          resolve()
        }
      )
    })
  }

  deselect() {
    if (!this.state.node.selected) return Promise.resolve()

    try {
      ReactDOM.findDOMNode(this)
    } catch (e) {
      // If not mounted, still perform operation on node
      const node = this.state.node
      node.selected = false

      return Promise.resolve()
    }

    return new Promise((resolve) => {
      this.setState(
        {
          node: Object.assign(this.state.node, {
            selected: false,
          }),
        },
        () => {
          if (typeof this.props.onDeselect === 'function') {
            this.props.onDeselect(this.state.node, this)
          }

          resolve()
        }
      )
    })
  }

  getSelectionPath() {
    if (this.state.node.selected) {
      return this.state.node.name
    }

    if (this.children) {
      const childSelectionPath = this.children.getSelectionPath()

      if (childSelectionPath) {
        return this.state.node.name + '/' + childSelectionPath
      }
    }
  }

  toggleSelection = () => {
    return this.state.node.selected ? this.deselect() : this.select()
  }

  getWrapClass() {
    const selected = this.state.node.selected ? '_selected' : '_deselected'

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
    const { node } = this.state

    if (!node.children) {
      switch (node.mode) {
        case 'added':
          return (
            <span onClick={this.toggleSelection}>
              <span className="_mode _added">A</span>
              <FaIcon size={15} icon={faFile} />
            </span>
          )
        case 'deleted':
          return (
            <span onClick={this.toggleSelection}>
              <span className="_mode _deleted">D</span>
              <FaIcon size={15} icon={faFile} />
            </span>
          )
        case 'modified':
          return (
            <span onClick={this.toggleSelection}>
              <span className="_mode _modified">M</span>
              <FaIcon size={15} icon={faFile} />
            </span>
          )
        default:
          return <FaIcon icon={faFile} />
      }
    }

    return node.collapsed ? (
      <span>
        <FaIcon className="_caret" size={15} icon={faCaretRight} />
        <FaIcon size={15} icon={faFolder} />
      </span>
    ) : (
      <span>
        <FaIcon className="_caret" size={15} icon={faCaretDown} />
        <FaIcon size={15} icon={faFolderOpen} />
      </span>
    )
  }

  collapse() {
    if (this.state.node.collapsed) return

    this.setState(
      {
        node: Object.assign(this.state.node, {
          collapsed: true,
        }),
      },
      () => {
        if (typeof this.props.onCollapse === 'function') {
          this.props.onCollapse(this.state.node, this)
        }
      }
    )
  }

  expand() {
    if (!this.state.node.collapsed) return

    this.setState(
      {
        node: Object.assign(this.state.node, {
          collapsed: false,
        }),
      },
      () => {
        if (typeof this.props.onExpand === 'function') {
          this.props.onExpand(this.state.node, this)
        }
      }
    )
  }

  toggleCollapse = () => {
    if (!this.state.node.children) return

    return this.state.node.collapsed ? this.expand() : this.collapse()
  }

  onSelect = (node, component) => {
    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(node, component)
    }
  }

  onDeselect = (node, component) => {
    if (typeof this.props.onDeselect === 'function') {
      this.props.onDeselect(node, component)
    }
  }
}

exports.FSNode = FSNode
