import React from 'react'
import styled from 'styled-components'
import { Diff as ReactDiffView } from '../../../../libs/react-diff-view'

const baseStyle = `
  margin: 20px;
  margin-bottom: 25px;
  display: block;
  border: 1px solid silver;
  border-radius: 3px;

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

  .diff-hunk {
    width: 100%;
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
`

const DiffHeader = styled.div`
  margin: 10px;
  display: block;
  width: 100%;
`

const SimpleDiffView = ({ file, title }) => {
  const { hunks } = file

  const maxLineNum = hunks.reduce((maxLineNum, hunk) => {
    return Math.max(
      2,
      maxLineNum.toString().length,
      (hunk.newStart + hunk.newLines).toString().length,
      (hunk.oldStart + hunk.oldLines).toString().length
    )
  }, 0)

  const hunkContentLengths = hunks.map(hunk => hunk.content.length)
  const maxHunkContentLength = Math.max(...hunkContentLengths)

  const maxLineLength = hunks.reduce((maxContentLength, hunk) => {
    return hunk.changes.reduce((maxContentLength, change) => {
      return Math.max(maxContentLength, change.content.length)
    }, maxContentLength)
  }, maxHunkContentLength)

  /* Adding 2 for padding of 1ch in each side */
  const gutterWidth = maxLineNum + 2
  const lineWidth = maxLineLength + 1

  const Container = styled.div`
    ${baseStyle}

    .diff-hunk-header-gutter {
      width: ${gutterWidth * 2 - 0.8}ch;
    }

    .diff-gutter {
      width: ${gutterWidth}ch;
    }

    .diff-code,
    .diff-hunk-header-content {
      min-width: calc(100% - ${gutterWidth * 2}ch);
      width: ${lineWidth}ch;
    }

    .diff-hunk-header-content {
      width: ${lineWidth + gutterWidth}ch;
    }
  `

  return (
    <Container>
      <DiffHeader>{projectTitle(title)}</DiffHeader>
      <ReactDiffView hunks={hunks} viewType="unified" />
    </Container>
  )
}

// TODO: Hardcore in dump
const projectTitle = title => {
  return title
    .replace(/^Changed?/, 'modify')
    .replace(/^Removed?/, 'deleted')
    .replace(/^Adde?d?/, 'add')
    .replace(/^Renamed?/, 'move')
    .replace(/^Moved?/, 'move')
}

export default SimpleDiffView
