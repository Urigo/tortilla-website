import React from 'react'
import PropTypes from 'prop-types'
import { FSTree } from './FSTree'

// Will be used to store hidden properties
const internal = Symbol('files_tree_internal')

class FileTree extends React.Component {
  static propTypes = {
    diff: PropTypes.string.isRequired,
    addFile: PropTypes.func.isRequired,
    removeFile: PropTypes.func.isRequired,
    includePattern: PropTypes.oneOfType([PropTypes.instanceOf(RegExp), PropTypes.string]),
    excludePattern: PropTypes.oneOfType([PropTypes.instanceOf(RegExp), PropTypes.string]),
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
    super(props)

    this.constructChildren()

    this.state = {
      children: this.reduceChildren()
    }
  }

  render() {
    return (
      <div className={this.props.className}>
        <FSTree
          tree={this.state.children}
          onSelect={onSelect.bind(this)}
          onDeselect={onDeselect.bind(this)}
        />
      </div>
    )
  }

  UNSAFE_componentWillReceiveProps(props) {
    const state = {}
    let reduceChildren

    // Recalculate dat shit
    if (props.diff !== this.props.diff) {
      this.constructChildren(props, true)
      reduceChildren = true
    }

    reduceChildren = reduceChildren || (
      props.hasOwnProperty('includePattern') &&
      props.includePattern.toString() !== this.props.includePattern.toString()
    ) || (
      props.hasOwnProperty('excludePattern') &&
      props.excludePattern.toString() !== this.props.excludePattern.toString()
    )

    let oldChildren
    let newChildren

    if (reduceChildren) {
      oldChildren = this.state.children
      newChildren = state.children = this.reduceChildren(props)
    }

    if (Object.keys(state).length) {
      this.setState(state, () => {
        if (reduceChildren) {
          this.modifyFiles(newChildren, oldChildren)
        }
      })
    }
  }

  // This will call the props.addFile and props.removeFile callbacks based on the
  // modifications that have happened in children
  modifyFiles(newChildren, oldChildren) {
    const newLeaves = pickLeaves(newChildren)
    const oldLeaves = pickLeaves(oldChildren)
    const newActiveLeaves = newLeaves.filter(node => node.active)
    const oldActiveLeaves = oldLeaves.filter(node => node.active)

    newActiveLeaves.forEach((newActiveLeaf, i) => {
      const oldActiveLeaf = oldActiveLeaves[i]

      if (newActiveLeaf && !oldActiveLeaf) {
        this.props.addFile(newActiveLeaf.path)
      }
    })

    oldActiveLeaves.forEach((oldActiveLeaf, i) => {
      const newActiveLeaf = newActiveLeaves[i]

      if (oldActiveLeaf && !newActiveLeaf) {
        this.props.removeFile(oldActiveLeaf.path)
      }
    })
  }

  constructChildren(props = this.props, reset) {
    if (props.cache[internal] && !reset) {
      this.children = props.cache[internal].children

      return
    }

    props.cache[internal] = {
      children: this.children = []
    }

    // In SSR this is gonna be empty
    if (!props.diff) return

    // Compose children out of given diff, assuming the schema is correct
    props.diff.match(/\n--- [^\s]+\n\+\+\+ [^\s]+\n/g).forEach((header) => {
      const files = header
        .match(/--- ([^\s]+)\n\+\+\+ ([^\s]+)/)
        .slice(1)
        .map(path => ({
          rawPath: path,
          // Slice initial /a /b parts
          path: path.split('/').slice(1).join('/')
        }))

      if (files[0].path === files[1].path) {
        files.pop()
        files[0].mode = 'modified'
      }
      else if (files[0].rawPath === '/dev/null') {
        files.shift()
        files[0].mode = 'added'
      }
      else if (files[1].rawPath === '/dev/null') {
        files.pop()
        files[0].mode = 'deleted'
      }
      else {
        files[0].mode = 'deleted'
        files[1].mode = 'added'
      }

      files.forEach(({ path, mode }, i) => {
        const names = path.split('/')

        names.reduce((node, name, index, split) => {
          if (!node.children) {
            node.children = []
          }

          let childNode = node.children.find((candi) => {
            return candi.name === name
          })

          if (!childNode) {
            childNode = {
              name,
              path: split.slice(0, index + 1).join('/'),
            }

            // If leaf
            if (index === names.length - 1) {
              childNode.mode = mode
            }

            node.children.push(childNode)

            node.children.sort((a, b) => {
              return a.name > b.name ? 1 : -1
            })
          }

          return childNode
        }, this)
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
            get collapsed() { return node.collapsed },
            set collapsed(collapsed) { node.collapsed = collapsed },
            get selected() { return node.selected },
            set selected(selected) { node.selected = selected },
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

function pickLeaves(children) {
  // Use stash if already calculated
  if (children[internal]) return children[internal]

  const leaves = children.reduce((leaves, node) => {
    if (node.children) {
      leaves.push(...pickLeaves(node.children))
    } else {
      leaves.push(node)
    }

    return leaves
  }, [])

  // Store cache for future calculations
  children[internal] = leaves

  return leaves
}

function onSelect(node) {
  this.props.addFile(node.path)
}

function onDeselect(node) {
  this.props.removeFile(node.path)
}

export default FileTree
