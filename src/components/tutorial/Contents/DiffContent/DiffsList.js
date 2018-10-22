import 'react-diff-view/index.css'

import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'
import styled, { css } from 'styled-components'

import { parseDiff, Diff as ReactDiffView } from '../../../../libs/react-diff-view'
import Thread from '../../../../utils/Thread'
import DiffHeader from './DiffHeader'

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
    display: inline-block;
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

  .diff-binary, .diff-long {
    width: 100%;
    padding: 0;
    padding-top: 20px;
    padding-bottom: 20px;
    text-align: center;

    ._title {
      font-weight: bold;
      font-size: 1.2em;
      cursor: pointer;
    }

    ._subtitle {
      font-weight: normal;
      color: black;
    }
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

const NullPath = styled.span`
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

    this.resetRawData()
    this.resetDiffTypeParams()
  }

  resetRawData(props = this.props) {
    if (props.baseUrl) {
      this.srcBaseUrl = `${props.baseUrl}/tree/${props.srcHistoryObject}`
      this.destBaseUrl = `${props.baseUrl}/tree/${props.destHistoryObject}`
    }

    // Cache
    this.allPaths = []
    this.parsedFilesDiffs = []

    // Split diff into file-specific diffs
    this.rawFilesDiffs = !props.diff ? [] : props.diff
      // Fix inline hunks
      .replace(/\n(@@[^@]+@@)([^\n]+)\n/g, '\n$1\n$2\n')
      .split('\ndiff --git')
      .map((fileDiff, i) => {
        return i ? '\ndiff --git' + fileDiff : fileDiff
      })
  }

  componentDidMount() {
    document.addEventListener('scroll', this.onScroll)
    document.addEventListener('mousedown', this.onMouseDown)
    document.addEventListener('mouseup', this.onMouseUp)
    this.buildFilesDiffs(this.props.paths)
  }

  UNSAFE_componentWillReceiveProps(props) {
    let rebuild

    // Diff is completely different. Hard reseting
    if (props.diff !== this.props.diff) {
      this.resetRawData(props)
      rebuild = true
    }

    if (props.hasOwnProperty('diffType') && props.diffType !== this.props.diffType) {
      this.resetDiffTypeParams(props)
      rebuild = true
    }

    rebuild = rebuild || (
      props.paths.some(path => !this.recentPaths.includes(path)) ||
      this.recentPaths.some(path => !props.paths.includes(path))
    )

    if (rebuild) {
      this.buildFilesDiffs(props.paths)
    }
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.onScroll)
    document.removeEventListener('mousedown', this.onMouseDown)
    document.removeEventListener('mouseup', this.onMouseUp)
    this.stopThread()
  }

  resetDiffTypeParams(props = this.props) {
    switch (props.diffType) {
      case 'split':
        this.oppositeViewType = 'unified'
        this.viewTypeAction = 'unify'
        this.gutterProduct = 1
        break
      case 'unified':
        this.oppositeViewType = 'split'
        this.viewTypeAction = 'split'
        this.gutterProduct = 2
        break
      default:
    }
  }

  // paths - Paths we would like to build
  buildFilesDiffs(paths) {
    this.recentPaths = [...paths]

    // Sometimes there might be no visible changes between versions
    if (!this.props.diff) return

    let rawFilesDiffs
    // If paths provided, filter accordingly
    if (paths && paths.length) {
      // Takes diffs which match the paths
      rawFilesDiffs = this.rawFilesDiffs.filter((fileDiff) => {
        // Gotta match because of the way we split the file diffs
        const [oldPath, newPath] = fileDiff
          .match(/diff --git ([^\s]+) ([^\s]+)/)
          .slice(1)
          // Remove /a /b
          .map(path => path.split('/').slice(1).join('/'))

        return paths.includes(oldPath) || paths.includes(newPath)
      })
    }
    // Otherwise, include everything
    else {
      rawFilesDiffs = this.rawFilesDiffs
    }

    // Will be used to indicate weather view should be cleaned or not
    let reset = true
    // Parse and render diff views in series
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
        const thread = this.restartThread()

        // Here we use setImmediate so we won't clog the execution thread
        setTimeout(thread.wrap(() => {
          const diffFileView = document.createElement('span')
          let diffFileViewChildren

          // Will re-render the diff, in case we hide it or reveal it.
          // We can also force-render diffs which are normally too long to show.
          const forceUpdate = (reparse) => {
            if (reparse) {
              parsedFileDiff = parseDiff(rawFileDiff, { showLong: !parsedFileDiff.tooLong })[0]
            }

            diffFileViewChildren = this.renderDiffFile(parsedFileDiff, forceUpdate)

            ReactDOM.render(diffFileViewChildren, diffFileView)
          }

          diffFileViewChildren = this.renderDiffFile(parsedFileDiff, forceUpdate)
          const { path } = diffFileViewChildren.props

          diffFileView.addEventListener('scroll', this.onScroll)
          diffFileView.addEventListener('mousedown', this.onMouseDown)
          diffFileView.addEventListener('mouseup', this.onMouseUp)

          ReactDOM.render(diffFileViewChildren, diffFileView, thread.wrap(() => {
            if (!this.diffContainer) return

            if (reset) {
              reset = false
              // Reset the view itself only after building the first diff so we won't see
              // a stutter side effect
              this.diffContainer.innerHTML = ''
              this.allPaths = []
            }

            // Insert view in the right order
            this.allPaths = this.allPaths.concat(path).sort(this.props.sortCb)

            const nextDiffFileIndex = this.allPaths.indexOf(path)
            const nextDiffFileView = this.diffContainer.children[nextDiffFileIndex]

            this.diffContainer.insertBefore(diffFileView, nextDiffFileView)

            resolve()
          }))
        }), 10)
      })
    }), Promise.resolve())
  }

  restartThread() {
    this.stopThread()

    return this.thread = new Thread()
  }

  resumeThread() {
    if (this.thread) {
      this.thread.resume()
    }
  }

  stopThread() {
    if (this.thread) {
      this.thread.stop()
    }
  }

  render() {
    return <Container ref={ref => this.diffContainer = ReactDOM.findDOMNode(ref)} />
  }

  renderDiffFile(diffState, forceUpdate) {
    const {
      type,
      oldPath,
      newPath,
      newRevision,
      oldRevision,
      hunks,
      isBinary,
      tooLong,
      isHidden,
    } = diffState

    // TODO: Address .type prop
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
    let keyPath

    // File removed
    if (Number(oldRevision) !== 0) {
      keyPath = oldPath

      header.push(this.srcBaseUrl
        ? <Path key={0} href={`${this.srcBaseUrl}/${oldPath}`}>{oldPath}</Path>
        : <NullPath key={0}>{oldPath}</NullPath>
      )
    }

    if (Number(newRevision) !== 0) {
      // File changed
      if (newPath === oldPath) {
        header = [this.destBaseUrl
          ? <Path key={0} href={`${this.destBaseUrl}/${oldPath}`}>{oldPath}</Path>
          : <NullPath key={0}>{oldPath}</NullPath>
        ]
      // File renamed, moved or added
      } else {
        keyPath = keyPath || newPath

        header.push(this.destBaseUrl
          ? <Path key={header.length} href={`${this.destBaseUrl}/${newPath}`}>{newPath}</Path>
          : <NullPath key={header.length}>{newPath}</NullPath>
        )
      }
    }

    if (header.length === 2) {
      header.splice(1, 0, <span key={0.5}>→</span>)
      // Custom file mode
      header.unshift('move ')
    }
    else {
      header.unshift(`${type} `)
    }

    /* Adding 2 for padding of 1ch in each side */
    const gutterWidth = maxLineNum + 2;
    const lineWidth = maxLineLength + 1;

    const Container = styled.span`
      margin: 20px;
      display: block;
      border: 1px solid silver;
      border-radius: 3px;

      .diff {
        overflow: ${this.props.diffType === 'split' && 'hidden'};
      }

      .diff-hunk-header-gutter {
        width: ${gutterWidth * this.gutterProduct - (0.4 * this.gutterProduct)}ch;
      }

      .diff-gutter {
        width: ${gutterWidth}ch;
      }

      .diff-hunk-header-content {
        width: ${lineWidth * (2 / this.gutterProduct) + gutterWidth}ch;
      }

      .diff-code, .diff-hunk-header-content {
        ${this.props.diffType === 'split' ? css`
          width: calc(50% - ${gutterWidth * this.gutterProduct}ch);
          overflow-wrap: break-word;
          white-space: pre-wrap;
        ` : css`
          min-width: calc(100% - ${gutterWidth * this.gutterProduct}ch);
          width: ${lineWidth}ch;
        `}
      }

      ${this.props.diffType === 'split' && css`
        .diff-hunk {
          contain: content;
        }

        .diff-hunk-header-content {
          width: calc(100% - ${gutterWidth * this.gutterProduct}ch);
        }
      `}
    `

    const onHideChange = (isHidden) => {
      diffState.isHidden = isHidden
      forceUpdate()
    }

    const loadLongDiff = () => {
      diffState.tooLong = false
      forceUpdate(true)
    }

    return (
      <Container path={keyPath}>
        <DiffHeader hidden={isHidden} onHideChange={onHideChange}>{header}</DiffHeader>
        {!isHidden && (
          isBinary ? (
            <div className={`diff-binary ${newPath ? 'diff-code-insert' : 'diff-code-delete'}`}>
              BINARY
            </div>
          ) : tooLong ? (
            <div className={`diff-long ${newPath ? 'diff-code-insert' : 'diff-code-delete'}`}>
              <div className="_title" onClick={loadLongDiff}>Load diff</div>
              <div className="_subtitle">Large diffs are not rendered by default.</div>
            </div>
          ) : (
            <ReactDiffView hunks={hunks} viewType={this.props.diffType} />
          )
        )}
      </Container>
    )
  }

  onScroll = () => {
    clearTimeout(this.scrollTimeout)
    this.stopThread()

    this.scrollTimeout = setTimeout(() => {
      this.resumeThread()
    }, 500)
  }

  onMouseDown = () => {
    this.stopThread()
  }

  onMouseUp = () => {
    this.resumeThread()
  }
}

export default DiffsList
