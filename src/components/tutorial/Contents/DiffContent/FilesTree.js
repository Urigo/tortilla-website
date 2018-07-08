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
    includePattern: PropTypes.oneOf([PropTypes.instanceOf(RegExp), PropTypes.string]),
    excludePattern: PropTypes.oneOf([PropTypes.instanceOf(RegExp), PropTypes.string]),
    cache: PropTypes.object,
    sortCb: PropTypes.func,
  }

  static defaultProps = {
    sortCb: (a, b) => a.name < b.name ? -1 : 1,
    includePattern: '',
    excludePattern: '',
    // Will be used to persist data in case component is unmounted
    cache: {},
  }

  constructor(props) {
    super(props);

    this.constructChildren();

    this.state = {
      children: this.reduceChildren()
    }
  }

  render() {
    return (
      <Treebeard
        data={this.state.children}
        decorators={diffDecorators}
        onToggle={onToggle.bind(this)}
      />
    );
  }

  componentWillReceiveProps(props) {
    const state = {}

    const reduceChildren = (
      props.hasOwnProperty('includePattern') &&
      props.includePattern.toString() != this.props.includePattern.toString()
    ) || (
      props.hasOwnProperty('excludePattern') &&
      props.excludePattern.toString() != this.props.excludePattern.toString()
    )

    if (reduceChildren) {
      state.children = this.reduceChildren(props)
    }

    if (Object.keys(state).length) {
      this.setState(state)
    }
  }

  constructChildren() {
    if (this.props.cache[internal]) {
      this.children = this.props.cache[internal].children;

      return;
    }

    this.props.cache[internal] = {
      children: this.children = []
    };

    // In SSR this is gonna be empty
    if (!this.props.diff) return

    // Compose children out of given diff, assuming the schema is correct
    this.props.diff.match(/^diff --git [^\s]+ [^\s]+/mg).forEach((header) => {
      header.split(' ').slice(-2).forEach((path) => {
        if (path == '/dev/null') return;

        // Slice initial /a /b parts
        const names = path.split('/').slice(1)
        path = names.join('/')

        names.reduce((node, name, index, split) => {
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

  // Will reduce the full tree into a filtered one based on the given patterns
  // Note that the state of the old tree will be stashed on the component
  reduceChildren(props = this.props, children = this.children) {
    if (!children.length) return children

    const { includePattern, excludePattern } = props

    const reducedChildren = children.reduce((reducedChildren, node) => {
      if (
        (!includePattern || node.path.match(includePattern)) &&
        (!excludePattern || !node.path.match(excludePattern))
      ) {
        let reducedNode = node

        // Ensure that we don't modify the original children cache!
        if (node.children) {
          reducedNode = {
            ...node,
            children: this.reduceChildren(props, node.children),
            get toggled() { return node.toggled },
            set toggled(toggled) { node.toggled = toggled },
            get active() { return node.active },
            set active(active) { node.active = active },
          }
        }

        reducedChildren.push(reducedNode)
      }

      return reducedChildren
    }, [])

    const dirChildren = reducedChildren
      .filter(node => node.children)
      .sort(props.sortCb)

    const fileChildren = reducedChildren
      .filter(node => !node.children)
      .sort(props.sortCb)

    // Ascending order. Dirs first
    return dirChildren.concat(fileChildren)
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
