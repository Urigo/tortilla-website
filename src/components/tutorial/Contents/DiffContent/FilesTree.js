import React from 'react';
import PropTypes from 'prop-types';
import { Treebeard, decorators } from 'react-treebeard';

// Will be used to store hidden properties
const internal = Symbol('files_tree_internal')

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

class FileTree extends React.Component {
  static propTypes = {
    diff: PropTypes.string.isRequired,
    addFile: PropTypes.func.isRequired,
    removeFile: PropTypes.func.isRequired,
    cache: PropTypes.object,
  }

  static defaultProps = {
    // Will be used to persist data in case component is unmounted
    cache: {}
  }

  constructor(props) {
    super(props);

    this.constructChildren();
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

  constructChildren() {
    if (this.props.cache[internal]) {
      this.children = this.props.cache[internal].children;

      return;
    }

    this.props.cache[internal] = {
      children: this.children = []
    };

    // Compose children out of given diff, assuming the schema is correct
    this.props.diff.match(/^diff --git [^\s]+ [^\s]+/mg).forEach((header) => {
      header.split(' ').slice(-2).forEach((path) => {
        if (path == '/dev/null') return;

        const names = path.split('/').slice(1)
        path = names.join('/')

        // Slice initial /a /b parts
        names.slice(1).reduce((node, name, index, split) => {
          if (!node.children) {
            node.children = [];
          }

          let childNode = node.children.find((candi) => {
            return candi.name == name
          });

          if (!childNode) {
            childNode = { name, path };

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
}

function onToggle(node, toggled) {
  if (node.children) {
    node.toggled = toggled;
  } else if (node.active) {
    delete node.active;

    this.props.removeFile(node.path);
  } else {
    node.active = true;

    this.props.addFile(node.path);
  }

  this.forceUpdate();
}

export default FileTree;
