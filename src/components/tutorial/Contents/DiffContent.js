import 'react-diff-view/index.css'

import React from 'react'
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
  height: 100%;
`

const Title = styled.div`
  margin: 40px;
  font-size: 24px;
  font-family: monospace;
  float: left;
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
    this.resetViewTypeParams()
  }

  componentWillUpdate(props, state) {
    this.resetViewTypeParams(state)
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
    })
  }

  render() {
    return (
      <Content>
        <Title>$ tortilla release diff {this.props.destVersion} {this.props.srcVersion}</Title>
        <ViewTypeButton onClick={this.toggleDiffViewType}>
          {this.viewTypeAction}
        </ViewTypeButton>

        {this.renderDiff()}
      </Content>
    )
  }

  renderDiff() {
    const diff = this.props.diff.replace(/\n(@@[^@]+@@)([^\n]+)\n/g, '\n$1\n$2\n')
    const files = parseDiff(diff)

    const maxLineNums = files.map((file) => {
      return file.hunks.reduce((maxLineNum, hunk) => {
        return Math.max(
          2,
          (maxLineNum).toString().length,
          (hunk.newStart + hunk.newLines).toString().length,
          (hunk.oldStart + hunk.oldLines).toString().length,
        )
      }, 0)
    })

    const maxLineLengths = files.map((file) => {
      const hunkContentLengths = file.hunks.map((hunk => hunk.content.length))
      const maxHunkContentLength = Math.max(...hunkContentLengths)

      return file.hunks.reduce((maxContentLength, hunk) => {
        return hunk.changes.reduce((maxContentLength, change) => {
          return Math.max(maxContentLength, change.content.length)
        }, maxContentLength)
      }, maxHunkContentLength)
    })

    return (
      <Diff>
        {files.map(({ oldPath, newPath, hunks }, i) => {
          const paths = []

          if (oldPath != '/dev/null') {
            paths.push(oldPath)
          }

          if (newPath != '/dev/null' && newPath != oldPath) {
            paths.push(newPath)
          }

          const header = paths.join('→')

          /* Adding 2 for padding of 1ch in each side */
          const gutterWidth = maxLineNums[i] + 2;
          const lineWidth = maxLineLengths[i] + 1;

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

            .diff-hunk-header-content {
              width: ${lineWidth * (2 / this.gutterProduct) + gutterWidth}ch;
            }
          `

          return (
            <Container key={i}>
              <DiffHeader>{header}</DiffHeader>
              <ReactDiffView hunks={hunks} viewType={this.state.diffViewType} />
            </Container>
          )
        })}
      </Diff>
    )
  }
}
