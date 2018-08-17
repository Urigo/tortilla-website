import React from 'react'

class FsNode extends React.Component {
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
          <div style={this.getNodeStyle()}>
            {node.children && (
              <div
                className={this.getArrowClass()}
                onClick={this.toggleCollapse.bind(this)}
              />
            )}
            <div onClick={this.select.bind(this)}>
              <div>{this.getIcon()}</div>
              <div>{node.title}</div>
            </div>
            {node.children && !collapsed && (
              <FSTree
                ref={ref => this.children = ref}
                tree={node.children}
                depth={this.depth}
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
      if (typeof this.props.onSelect == 'function') {
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
      if (typeof this.props.onDeselect == 'function') {
        this.props.onDeselect(this.state.node, this)
      }
    })
  }

  getSelectionPath() {
    if (this.state.selected) {
      return this.state.node.title
    }

    if (this.children) {
      const childSelectionPath = this.children.getSelectionPath()

      if (childSelectionPath) {
        return this.state.node.title + '/' + childSelectionPath
      }
    }
  }

  toggleSelection() {
    return this.state.selected ? this.deselect() : this.select()
  }

  getWrapClass() {
    return this.state.selected ? 'selected' : 'deselected'
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
    const collapsed = this.state.collapsed ? 'collapsed' : ''

    return `arrow ${collapsed}`
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
      if (typeof this.props.onCollapse == 'function') {
        this.props.onCollapse(this.state.node, this)
      }
    })
  }

  expand() {
    if (!this.state.collapsed) return

    this.setState({
      collapsed: false
    }, () => {
      if (typeof this.props.onExpand == 'function') {
        this.props.onExpand(this.state.node, this)
      }
    })
  }

  toggleCollapse(e) {
    return this.state.collapsed ? this.expand() : this.collapse()
  }
}

export default FsNode
