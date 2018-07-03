import 'setimmediate'
import 'react-diff-view/index.css'

import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { parseDiff, Diff as ReactDiffView } from '../../../../libs/react-diff-view'

const Container = styled.div`
  clear: both;

  .diff {
    font-size: 1em;
    display: block;
    min-width: 100%;
    margin: 0;
    overflow-x: auto;
  }

  .diff-line {
    display: block;
    white-space: nowrap;
    width: 100%;
    border: none;
  }

  .diff-hunk-header {
    display: block;
    white-space: nowrap;
    width: 100%;
  }

  .diff-hunk-header-gutter {
    display: inline-block;
    border: none;
    background-color: #dbedff;
  }

  .diff-hunk-header-content {
    display: inline-block
    border: none;
    background-color: #f1f8ff;
    color: gray;
    padding-left: 0.5em;
    padding-top: 0.3em;
  }

  .diff-hunk {
    display: block;
    width: 100%;
    border: none;
  }

  .diff-gutter {
    display: inline-block;
    border: none;
    height: 1.5em;
    color: gray;

    $:not(.diff-gutter-delete):not(.diff-gutter-add) {
      background-color: #fafbfc;
    }
  }

  .diff-gutter-omit:empty {
    padding: 0;
  }

  .diff-code-omit:empty {
    background-color: #fafbfc;
    height: 21px;
  }

  .diff-gutter-omit::before {
    width: 100%;
    margin-left: 0;
    background-color: #fafbfc;
  }

  .diff-code {
    display: inline-block;
    white-space: pre;
    overflow: initial;
    border: none;
  }
`

const DiffHeader = styled.div`
  margin: 10px;
  display: block;
  width: 100%;
`

const Path = styled.a`
  color: inherit;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.primaryBlue};
    text-decoration: underline;
  }
`

const NullPath = styled.div`
  color: inherit;
  text-decoration: none;
`

class DiffsList extends React.Component {
  static propTypes = {
    baseUrl: PropTypes.string,
    srcHistoryObject: PropTypes.string,
    destHistoryObject: PropTypes.string,
    diffType: PropTypes.oneOf(['unified', 'split']),
    sortCb: PropTypes.func,
    paths: PropTypes.arrayOf(PropTypes.string).isRequired,
    diff: PropTypes.string.isRequired,
  }

  static defaultProps = {
    baseUrl: '',
    historyObject: '',
    diffType: 'unified',
    sortCb: (a, b) => a > b,
  }

  constructor(props) {
    super(props)

    /*
      This is a special component which will build the view dynamically,
      which means that it lives outside ReactDOM's render cycle and the concept of
      app state doesn't exist (at least in the context of React.Component)
     */

    if (props.baseUrl) {
      this.srcBaseUrl = `${props.baseUrl}/tree/${props.srcHistoryObject}`
      this.destBaseUrl = `${props.baseUrl}/tree/${props.destHistoryObject}`
    }

    // Cache
    this.allPaths = []
    this.parsedFilesDiffs = []

    // The thread which will be used to execute tasks in series
    this.thread = Promise.resolve()

    // Split diff into file-specific diffs
    this.rawFilesDiffs = !props.diff ? [] : props.diff
      // Fix inline hunks
      .replace(/\n(@@[^@]+@@)([^\n]+)\n/g, '\n$1\n$2\n')
      .split('\ndiff --git')
      .map((fileDiff, i) => {
        return i ? '\ndiff --git' + fileDiff : fileDiff
      })

    this.resetDiffTypeParams()
  }

  componentWillReceiveProps(props) {
    let reset
    let oldPaths
    let newPaths

    if (props.hasOwnProperty('diffType') && props.diffType != this.props.diffType) {
      this.resetDiffTypeParams(props)
      reset = true
    }

    if (props.hasOwnProperty('paths')) {
      oldPaths = !reset && this.allPaths.filter((path) =>
        !props.paths.includes(path)
      )

      newPaths = props.paths.filter((path) =>
        !this.allPaths.includes(path)
      )
    }

    if (reset) {
      newPaths = newPaths ? this.allPaths.concat(newPaths) : this.allPaths
    }

    this.disposeFilesDiffs(oldPaths)
    this.buildFilesDiffs(newPaths, reset)
  }

  componentWillUnmount() {
    this.stopBuildingFileDiff()
  }

  resetDiffTypeParams(props = this.props) {
    switch (props.diffType) {
      case 'split':
        this.diffHunkWidth = 50
        this.oppositeViewType = 'unified'
        this.viewTypeAction = 'unify'
        this.gutterProduct = 1
        break
      case 'unified':
        this.diffHunkWidth = 100
        this.oppositeViewType = 'split'
        this.viewTypeAction = 'split'
        this.gutterProduct = 2
        break
    }
  }

  // paths - Paths we would like to get rid of
  disposeFilesDiffs(paths) {
    // TODO: Implement
  }

  // paths - Paths we would like to build
  // reset - If true, will reset the view
  buildFilesDiffs(paths, reset) {
    // Sometimes there might be no visible changes between versions
    if (!this.props.diff) return

    if (typeof paths == 'boolean') {
      reset = paths
      paths = null
    }

    if (reset) {
      this.stopBuildingFileDiff()
      // Rebuilding view completely as it's the most efficient way
      this.diffContainer.innerHTML = ''
      // Move build process cursor
      this.thread = Promise.resolve()
    }

    // If no paths provided, no need to continue
    if (!paths) return
    if (!paths.length) return

    // Takes diffs which match the paths
    const rawFilesDiffs = this.rawFilesDiffs.filter((fileDiff) => {
      // Gotta match because of the way we split the file diffs
      const [oldPath, newPath] = fileDiff
        .match(/diff --git ([^\s]+) ([^\s]+)/)
        .slice(1)
        // Remove /a /b
        .map(path => path.split('/').slice(1).join('/'))

      return paths.includes(oldPath) || paths.includes(newPath)
    })

    // Parse and render diff views in series
    this.recentBuildProcess =
    rawFilesDiffs.reduce((rendered, rendering, i) => rendered.then(() => {
      const path = paths[i]
      const rawFileDiff = rawFilesDiffs[i]
      let parsedFileDiff = this.parsedFilesDiffs.find(parsedFileDiff =>
        [parsedFileDiff.oldPath, parsedFileDiff.newPath].includes(paths[i])
      )

      // If cache not exist
      if (!parsedFileDiff) {
        parsedFileDiff = parseDiff(rawFileDiff)[0]
        this.parsedFilesDiffs.push(parsedFileDiff)
      }

      return new Promise(resolve => {
        // We use setImmediate for 2 reasons
        // 1. Between 2 executions the DOM will render and so this way we can
        //    see the progress
        // 2. We can store the most recent build process and stop the series
        //    of executions when needed
        this.activeFileDiffBuildProcess = setImmediate(() => {
          const diffFileView = document.createElement('span')
          const diffFileReactEl = this.renderDiffFile(parsedFileDiff)

          ReactDOM.render(this.renderDiffFile(parsedFileDiff), diffFileView, () => {
            // Insert view in the right order
            this.allPaths = this.allPaths.concat(path).sort(this.props.sortCb)

            const nextDiffFileIndex = this.allPaths.indexOf(path)
            const nextDiffFileView = this.diffContainer.children[nextDiffFileIndex]

            this.diffContainer.insertBefore(diffFileView, nextDiffFileView)

            resolve()
          })
        })
      })
    }), this.thread)
  }

  stopBuildingFileDiff() {
    clearImmediate(this.activeFileDiffBuildProcess)
  }

  render() {
    return <Container ref={ref => this.diffContainer = ReactDOM.findDOMNode(ref)} />
  }

  renderDiffFile({
    oldPath,
    newPath,
    newRevision,
    oldRevision,
    hunks,
    isBinary,
  }) {
    const maxLineNum = hunks.reduce((maxLineNum, hunk) => {
      return Math.max(
        2,
        (maxLineNum).toString().length,
        (hunk.newStart + hunk.newLines).toString().length,
        (hunk.oldStart + hunk.oldLines).toString().length,
      )
    }, 0)

    const hunkContentLengths = hunks.map((hunk => hunk.content.length))
    const maxHunkContentLength = Math.max(...hunkContentLengths)

    const maxLineLength = hunks.reduce((maxContentLength, hunk) => {
      return hunk.changes.reduce((maxContentLength, change) => {
        return Math.max(maxContentLength, change.content.length)
      }, maxContentLength)
    }, maxHunkContentLength)

    // Will store the view's header
    let header = []
    // Will store the new file path for external use
    let filePath

    // File removed
    if (Number(oldRevision) !== 0) {
      filePath = oldPath

      header.push(this.srcBaseUrl
        ? <Path key={0} href={`${this.srcBaseUrl}/${oldPath}`}>{oldPath}</Path>
        : <NullPath key={0}>{oldPath}</NullPath>
      )
    }

    if (Number(newRevision) !== 0) {
      // File changed
      if (newPath == oldPath) {
        filePath = oldPath

        header = [this.destBaseUrl
          ? <Path key={0} href={`${this.destBaseUrl}/${oldPath}`}>{oldPath}</Path>
          : <NullPath key={0}>{oldPath}</NullPath>
        ]
      // File renamed, moved or added
      } else {
        filePath = newPath

        header.push(this.destBaseUrl
          ? <Path key={header.length} href={`${this.destBaseUrl}/${newPath}`}>{newPath}</Path>
          : <NullPath key={header.length}>{newPath}</NullPath>
        )
      }
    }

    if (header.length == 2) {
      header.splice(1, 0, <span key={0.5}>→</span>)
    }

    /* Adding 2 for padding of 1ch in each side */
    const gutterWidth = maxLineNum + 2;
    const lineWidth = maxLineLength + 1;

    const Container = styled.span`
      margin: 20px;
      display: block;
      border: 1px solid silver;
      border-radius: 3px;

      .diff-hunk {
        width: ${this.diffHunkWidth}%;
      }

      .diff-hunk-header-gutter {
        width: ${gutterWidth * this.gutterProduct - (0.4 * this.gutterProduct)}ch;
      }

      .diff-hunk-header {
        width: ${this.props.diffType == 'split' && '200%'};
      }

      .diff-gutter {
        width: ${gutterWidth}ch;
      }

      .diff-code, .diff-hunk-header-content {
        min-width: calc(100% - ${gutterWidth * this.gutterProduct}ch);
        width: ${lineWidth}ch;
      }

      .diff-binary {
        width: 100%;
        padding: 0;
        text-align: center;
        font-weight: bold;
      }

      .diff-hunk-header-content {
        width: ${lineWidth * (2 / this.gutterProduct) + gutterWidth}ch;
      }
    `

    // We attach the filePath as an additional metadata for the returned value
    return (
      <Container>
        <DiffHeader>{header}</DiffHeader>
        {isBinary ? (
          <div className={`diff-binary ${newPath ? 'diff-code-insert' : 'diff-code-delete'}`}>
            BINARY
          </div>
        ) : (
          <ReactDiffView hunks={hunks} viewType={this.props.diffType} />
        )}
      </Container>
    )
  }
}

export default DiffsList
