import 'setimmediate'
import 'react-diff-view/index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { parseDiff, Diff as ReactDiffView } from '../../../../libs/react-diff-view'
import storage from '../../../../utils/storage';
import Button from '../../../common/Button';
import DiffNode from './DiffNode';

// Will be used to attach private metadata for internal use
const internal = Symbol('diff_internal')

const Content = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  background-color: ${({theme}) => theme.white};
  color: ${({theme}) => theme.lightBlack};
  font-weight: normal;
  font-size: 14px;
  overflow-y: auto;
`

const Title = styled.div`
  margin: 40px;
  font-size: 24px;
  font-family: monospace;
  float: left;
`

const NoDiff = styled.div`
  width: 100%;
  height: 200px;
  line-height: 200px;
  clear: both;
  text-align: center;
`

const Diff = styled.div`
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

const ViewTypeButton = Button.extend`
  width: 120px;
  height: 50px;
  color: ${({ theme }) => theme.primaryBlue};
  background-color: ${({ theme }) => theme.white};
  padding: 10px;
  border-radius: 5px;
  float: right;
  margin: 25px 20px;
  outline: none;

  &:hover {
    background-color: #e8e8e8;
  }
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

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
    // Parsed file-diffs cache
    this.parsedFilesDiffs = []
    // Paths of diffs that we would like to render
    this.paths = new Set()
    // Will be used to build diffs in series
    this.recentDiffBuildProcess = Promise.resolve()

    // Split diff into file-specific diffs
    this.rawFilesDiffs = !props.diff ? [] : props.diff
      // Fix inline hunks
      .replace(/\n(@@[^@]+@@)([^\n]+)\n/g, '\n$1\n$2\n')
      .split('\ndiff --git')
      .map((fileDiff, i) => {
        return i ? '\ndiff --git' + fileDiff : fileDiff
      })

    let diffViewType = storage.getItem('diff-view-type')

    if (!diffViewType) {
      diffViewType = 'unified'
      storage.setItem('diff-view-type', diffViewType)
    }

    this.state.diffViewType = diffViewType

    // In case git URL is not defined in package.json
    if (props.tutorialRepo) {
      this.srcBaseUrl = `${props.tutorialRepo}/tree/${props.srcHistory}`
      this.destBaseUrl = `${props.tutorialRepo}/tree/${props.destHistory}`
    }

    this.resetViewTypeParams()
  }

  componentWillUpdate(props, state) {
    this.resetViewTypeParams(state)
  }

  componentWillUnmount() {
    this.stopBuildingDiff()
  }

  resetViewTypeParams(state = this.state) {
    switch (state.diffViewType) {
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

  toggleDiffViewType = () => {
    this.setState({
      diffViewType: this.oppositeViewType
    }, () => {
      storage.setItem('diff-view-type', this.state.diffViewType)

      this.buildDiff()
    })
  }

  render() {
    return (
      <Content>
        <DiffNode diff={this.props.diff} addFile={this.buildDiff.bind(this)} removeFile={() => {}} />

        <Title>$ tortilla release diff {this.props.srcVersion} {this.props.destVersion}</Title>
        {this.props.diff ? (
          <span>
            <ViewTypeButton onClick={this.toggleDiffViewType}>{this.viewTypeAction}</ViewTypeButton>
            <Diff ref={ref => this.diffContainer = ReactDOM.findDOMNode(ref)} />
          </span>
        ) : (
          <NoDiff>There are no visible changes between the versions :-)</NoDiff>
        )}
      </Content>
    )
  }

  // Given paths represent paths that we would like to add
  // If no paths were provided, all the diffs would be rendered
  // The reset flag indicates whether given paths should be added or completely replace
  // the existing rendered diffs
  buildDiff(paths, reset) {
    // Sometimes there might be no visible changes between versions
    if (!this.props.diff) return

    if (typeof paths == 'boolean') {
      reset = paths
      paths = null
    }

    if (paths) {
      paths = [].concat(paths)
    }

    // Accumulate paths so they would be remembered in the next reset
    if (reset) {
      this.paths = new Set()

      if (paths) {
        this.paths.add(...paths)
      }
    } else if (paths) {
      // Only take paths that have yet to be rendered
      paths = paths.filter(path => !this.paths.has(path))

      this.paths.add(...paths)
    }

    let rawFilesDiffs

    // If specific paths were not provided, reset the entire view
    if (paths) {
      rawFilesDiffs = this.rawFilesDiffs.filter((fileDiff) => {
        // Gotta match because of the way we split the file diffs
        const [oldPath, newPath] = fileDiff
          .match(/diff --git ([^\s]+) ([^\s]+)/)
          .slice(1)

        return paths.includes(oldPath) || paths.includes(newPath)
      })
    } else {
      // Include all file diffs
      // WARNING! This is gonna be overwhelming, thus, don't call this method with no
      // paths unless you REALLY wanna render anything
      rawFilesDiffs = []
    }

    if (!paths || reset) {
      this.stopBuildingDiff()
      // Rebuilding view completely as it's the most efficient way
      this.diffContainer.innerHTML = ''
      // Move build process cursor
      this.recentDiffBuildProcess = Promise.resolve()
    }

    // Parse and render diff views in series
    this.recentBuildProcess =
    rawFilesDiffs.reduce((rendered, rendering, i) => rendered.then(() => {
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
        this.currentDiffBuildProcess = setImmediate(() => {
          const diffFileView = document.createElement('span')
          const diffFileReactEl = this.renderDiffFile(parsedFileDiff)
          const filePath = diffFileReactEl.props.filePath

          ReactDOM.render(this.renderDiffFile(parsedFileDiff), diffFileView, () => {
            // Insert the new view in the right order
            const refNode = Array.from(this.diffContainer.childNodes).find(childNode =>
              childNode[internal].filePath > filePath
            )
            diffFileView[internal] = { filePath }
            this.diffContainer.insertBefore(diffFileView, refNode)

            resolve()
          })
        })
      })
    }), this.recentDiffBuildProcess)
  }

  stopBuildingDiff() {
    clearImmediate(this.currentDiffBuildProcess)
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
        width: ${this.state.diffViewType == 'split' && '200%'};
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
      <Container filePath={filePath}>
        <DiffHeader>{header}</DiffHeader>
        {isBinary ? (
          <div className={`diff-binary ${newPath ? 'diff-code-insert' : 'diff-code-delete'}`}>
            BINARY
          </div>
        ) : (
          <ReactDiffView hunks={hunks} viewType={this.state.diffViewType} />
        )}
      </Container>
    )
  }
}
