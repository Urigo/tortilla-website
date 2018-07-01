import './FSTree';

import React from 'react';
import styled from 'styled-components';
import scope from './scope';

let Container;
{
  const height = '26px';
  const highlightColor = 'rgb(50, 120, 220)';

  Container = styled.div`
    width: 100%;
    height: ${height};
    display: inline-block;

    ._wrap {
      height: 100%;
      line-height: ${height};

      &._selected {
        color: white;
        background-color: ${highlightColor};
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
      width: 10px;
      height: 100%;
      cursor: pointer;

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
      width: 30px;
      height: 100%;
      user-select: none;
      font-weight: bold;
    }

    ._text {
      display: inline-block;
      height: 100%;
      user-select: none;
    }
  `;
}

scope.FSNode = class FSNode extends React.Component {
  constructor(props) {
    super(props);

    this.depth = Number(props.depth) || 0;

    this.state = {
      node: props.node,
      collapsed: true,
      selected: false,
    };
  }

  render() {
    const node = this.state.node;
    const collapsed = this.state.collapsed;

    return (
      <Container>
        <div className={`_wrap ${this.getWrapClass()}`} style={this.getWrapStyle()}>
          <div className="_node" style={this.getNodeStyle()}>
            {node.children && (
              <div
                className={this.getArrowClass()}
                onClick={this.toggleCollapse}
              >
                ▾
              </div>
            )}
            <div className="_descriptor" onClick={this.select.bind(this)}>
              <div className="_icon">{this.getIcon()}</div>
              <div className="_text">{node.title}</div>
            </div>
            {node.children && !collapsed && (
              <scope.FSTree
                className="_children"
                ref={ref => this.children = ref}
                onSelect={this.onChildrenSelect}
                tree={node.children}
                depth={this.depth}
              />
            )}
          </div>
        </div>
      </Container>
    );
  }

  select() {
    if (this.state.selected) return;

    this.setState({
      selected: true
    }, () => {
      if (this.children) {
        this.children.deselect();
      }

      if (typeof this.props.onSelect == 'function') {
        this.props.onSelect(this.state.node, this);
      }
    });
  }

  deselect() {
    if (!this.state.selected) {
      // Try to deselect child nodes just in case
      if (this.children) {
        this.children.deselect();
      }

      return;
    }

    this.setState({
      selected: false
    }, () => {
      if (typeof this.props.onDeselect == 'function') {
        this.props.onDeselect(this.state.node, this);
      }
    });
  }

  getSelectionPath() {
    if (this.state.selected) {
      return this.state.node.title;
    }

    if (this.children) {
      const childSelectionPath = this.children.getSelectionPath();

      if (childSelectionPath) {
        return this.state.node.title + '/' + childSelectionPath;
      }
    }
  }

  toggleSelection() {
    return this.state.selected ? this.deselect() : this.select();
  }

  getWrapClass() {
    return this.state.selected ? '_selected' : '_deselected';
  }

  getDepthSize(depth = this.depth) {
    let padding = 4 * depth;

    if (!this.state.node.children) {
      padding += 26;
    }

    return padding + 'px';
  }

  getWrapStyle() {
    const translateX = this.getDepthSize(this.depth - 1);

    return {
      transform: `translateX(-${translateX})`,
      width: `calc(100% + ${translateX})`,
    };
  }

  getNodeStyle() {
    return {
      paddingLeft: this.getDepthSize(this.depth),
      zIndex: this.depth,
    };
  }

  getArrowClass() {
    const collapsed = this.state.collapsed ? '_collapsed' : '';

    return `_arrow ${collapsed}`;
  }

  getIcon() {
    if (!this.state.node.children) return '🗎';
    if (!this.state.collapsed) return '🗁';

    return '🗀';
  }

  collapse() {
    if (this.state.collapsed) return;

    this.setState({
      collapsed: true
    }, () => {
      if (typeof this.props.onCollapse == 'function') {
        this.props.onCollapse(this.state.node, this);
      }
    });
  }

  expand() {
    if (!this.state.collapsed) return;

    this.setState({
      collapsed: false
    }, () => {
      if (typeof this.props.onExpand == 'function') {
        this.props.onExpand(this.state.node, this);
      }
    });
  }

  toggleCollapse = (e) => {
    return this.state.collapsed ? this.expand() : this.collapse();
  }

  onChildrenSelect = (node, component) => {
    if (typeof this.props.onSelect == 'function') {
      this.props.onSelect(node, component);
    }
  }
}

export default scope.FSNode;
