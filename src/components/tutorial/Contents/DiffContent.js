import 'setimmediate'
import 'react-diff-view/index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { parseDiff, Diff as ReactDiffView } from '../../../libs/react-diff-view'
import storage from '../../../utils/storage';
import Button from '../../common/Button';

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

  componentDidMount() {
    this.buildDiff()
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

  buildDiff() {
    // Sometimes there might be no visible changes between versions
    if (!this.props.diff) return

    this.stopBuildingDiff()
    // Rebuilding view completely as it's the most efficient way
    this.diffContainer.innerHTML = ''

    // Split diff into file-specific diffs
    // Use cache
    this.fileDiffs = this.fileDiffs || this.props.diff
      // Fix inline hunks
      .replace(/\n(@@[^@]+@@)([^\n]+)\n/g, '\n$1\n$2\n')
      .split('\ndiff --git')
      .map((fileDiff, i) => {
        return i ? '\ndiff --git' + fileDiff : fileDiff
      })

    // Use cache
    this.files = this.files || []

    // Parse and render diff views in series
    this.fileDiffs.reduce((rendered, rendering, i) => rendered.then(() => {
      const fileDiff = this.fileDiffs[i]
      let file = this.files[i]

      // If cache not exist
      if (!file) {
        file = parseDiff(fileDiff)[0]
        this.files.push(file)
      }

      return new Promise(resolve => {
        // We use setImmediate for 2 reasons
        // 1. Between 2 executions the DOM will render and so this way we can
        //    see the progress
        // 2. We can store the most recent build process and stop the series
        //    of executions when needed
        this.currentDiffBuildProcess = setImmediate(() => {
          const diffFileView = document.createElement('span')

          ReactDOM.render(this.renderDiffFile(file), diffFileView, () => {
            this.diffContainer.appendChild(diffFileView)

            resolve()
          })
        })
      })
    }), Promise.resolve())
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

    let header = []

    // File removed
    if (Number(oldRevision) !== 0) {
      header.push(this.srcBaseUrl
        ? <Path key={0} href={`${this.srcBaseUrl}/${oldPath}`}>{oldPath}</Path>
        : <NullPath key={0}>{oldPath}</NullPath>
      )
    }

    if (Number(newRevision) !== 0) {
      // File changed
      if (newPath == oldPath) {
        header = [this.destBaseUrl
          ? <Path key={0} href={`${this.destBaseUrl}/${oldPath}`}>{oldPath}</Path>
          : <NullPath key={0}>{oldPath}</NullPath>
        ]
      // File renamed, moved or added
      } else {
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

    return (
      <Container>
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
