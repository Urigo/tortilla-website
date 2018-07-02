import React from 'react';
import PropTypes from 'prop-types';
import { Treebeard, decorators } from 'react-treebeard';

const diffDecorators = {
  ...decorators,

  Container(props) {
    Object.assign(props.style.activeLink, {
      boxShadow: 'inset 1px 0 0 white',
      background: 'rgba(255, 255, 255, .1)',
    });

    return React.createElement(decorators.Container, props);
  }
}

class DiffNode extends React.Component {
  static propTypes = {
    diff: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    this.children = [];

    // Compose children out of given diff, assuming the schema is correct
    props.diff.match(/^diff --git [^\s]+ [^\s]+/mg).forEach((header) => {
      header.split(' ').slice(-2).forEach((path) => {
        if (path == '/dev/null') return;

        // Slice initial /a /b parts
        path.split('/').slice(1).reduce((node, name, index, split) => {
          if (!node.children) {
            node.children = [];
          }

          let childNode = node.children.find((candi) => {
            return candi.name == name
          });

          if (!childNode) {
            childNode = { name };

            node.children.push(childNode);

            node.children.sort((a, b) => {
              return a.name > b.name ? 1 : -1;
            });
          }

          return childNode;
        }, this);
      })
    })
  }

  render() {
    return (
      <Treebeard
        data={this.children}
        decorators={diffDecorators}
        onToggle={onToggle.bind(this)}
      />
    );
  }
}

function onToggle(node, toggled) {
  if (node.children) {
    node.toggled = toggled;
  } else if (node.active) {
    delete node.active;
  } else {
    node.active = true;
  }

  this.forceUpdate();
}

export default DiffNode;
