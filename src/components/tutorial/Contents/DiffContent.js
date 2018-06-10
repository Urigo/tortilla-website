import React from 'react'
import styled from 'styled-components'
import { parseDiff, Diff as ReactDiffView } from '../../../libs/react-diff-view'
import 'react-diff-view/index.css'

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
`

const Diff = styled.div`
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

export default class extends React.Component {
  render() {
    return (
      <Content>
        <Title>$ tortilla release diff {this.props.destVersion} {this.props.srcVersion}</Title>

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

            .diff-hunk-header-gutter {
              width: ${gutterWidth * 2 - 0.8}ch;
            }

            .diff-gutter {
              width: ${gutterWidth}ch;
            }

            .diff-code, .diff-hunk-header-content {
              min-width: calc(100% - ${gutterWidth * 2}ch);
              width: ${lineWidth}ch;
            }
          `

          return (
            <Container key={i}>
              <DiffHeader>{header}</DiffHeader>
              <ReactDiffView hunks={hunks} viewType="unified" />
            </Container>
          )
        })}
      </Diff>
    )
  }
}
