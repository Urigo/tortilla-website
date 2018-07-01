import './FSNode';

import React from 'react';
import styled from 'styled-components';
import scope from './scope';

let Container;
{
  const margin = '5px';

  Container = styled.ul`
    ._nodes-list {
      margin: 0;
      padding: 0;
      list-style-type: none;
    }

    ._nodes-list-item {
      margin-top: ${margin};
      margin-bottom: ${margin};
    }
  `;
}

scope.FSTree = class FSTree extends React.Component {
  constructor(props) {
    super(props);

    this.depth = Number(props.depth) || 0;

    this.state = {
      tree: props.tree
    };

    this._nodes = [];
  }

  componentWillUpdate() {
    this._nodes = [];
  }

  componentWillReceiveProps(props) {
    const state = {};

    if (props.hasOwnProperty('tree')) {
      state.tree = props.tree;
    }

    if (Object.keys(state).length) {
      this.setState(state);
    }
  }

  getNodes() {
    return this._nodes.filter(Boolean)
  }

  render() {
    const tree = this.state.tree;

    return (
      <Container>
        <ul className="_nodes-list">
          {tree.map((node) => (
            <li className="_nodes-list-item" key={node.title}>
              <scope.FSNode
                ref={ref => this._nodes.push(ref)}
                onSelect={this.onNodeSelect}
                onCollapse={this.onNodeCollapse}
                depth={this.depth + 1}
                node={node}
              />
            </li>
          ))}
        </ul>
      </Container>
    );
  }

  deselect() {
    this.getNodes().forEach((node) => {
      node.deselect();
    });

    this.selectedNode = null;
  }

  getSelectionPath() {
    const nodes = this.getNodes();

    for (let node of nodes) {
      const childSelectionPath = node.getSelectionPath();

      if (childSelectionPath) {
        return childSelectionPath;
      }
    }
  }

  onNodeSelect = (node, component) => {
    if (this.selectedNode && node !== this.selectedNode) {
      this.selectedNode.deselect();
    }

    this.selectedNode = component;

    if (typeof this.props.onSelect == 'function') {
      this.props.onSelect(node, component);
    }
  }

  onNodeCollapse = (node) => {
    if (this.selectedNode && node !== this.selectedNode) {
      this.selectedNode = null;
    }
  }
}

export default scope.FSTree;
