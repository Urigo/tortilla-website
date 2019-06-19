import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Diff as ReactDiffView } from '../../../../../libs/react-diff-view'
import { freeText } from '../../../../../utils'
import EditorModal from '../../../../common/EditorModal'
import CopyButton from './CopyButton'
import EditButton from './EditButton'

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
  display: flex;
  align-items: center;
`

const SimpleDiffView = ({ file, title, tutorial, step, rawUrl, submodule }) => {
  const { hunks } = file
  const [editing, setEditing] = useState(false)
  const [editText, setEditText] = useState('')
  const extension = useMemo(() => (title.match(/\w+\.(\w+)$/) || []).pop() || '', [title])

  const maxLineNum = useMemo(() =>
    hunks.reduce((maxLineNum, hunk) => {
      return Math.max(
        2,
        maxLineNum.toString().length,
        (hunk.newStart + hunk.newLines).toString().length,
        (hunk.oldStart + hunk.oldLines).toString().length
      )
    }, 0)
  , [hunks])

  const hunkContentLengths = useMemo(() =>
    hunks.map(hunk => hunk.content.length)
  , [hunks])

  const maxHunkContentLength = useMemo(() =>
    Math.max(...hunkContentLengths)
  , [hunkContentLengths])

  const maxLineLength = useMemo(() =>
    hunks.reduce((maxContentLength, hunk) => {
      return hunk.changes.reduce((maxContentLength, change) => {
        return Math.max(maxContentLength, change.content.length)
      }, maxContentLength)
    }, maxHunkContentLength)
  , [hunks, maxHunkContentLength])


  /* Adding 2 for padding of 1ch in each side */
  const gutterWidth = useMemo(() => maxLineNum + 2, [maxLineNum])
  const lineWidth = useMemo(() => maxLineLength + 1, [maxLineLength])

  const Container = useMemo(() => styled.div`
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
  `, [gutterWidth, lineWidth])

  const filePath = useMemo(() => title.split(' ').pop(), [title])

  const editFile = useCallback(() => {
    fetch(`${rawUrl}/${filePath}`).then(r => r.text()).then(setEditText)

    setEditing(true)
  }, [rawUrl, filePath, setEditText, setEditing])

  const closeEditModal = useCallback(() => {
    setEditing(false)
    setEditText('')
  }, [setEditing, setEditText])

  const submitFileChanges = useCallback((newFileContent) => {
    setEditing(false)
    setEditText('')

    const filePath = title.split(' ').pop()
    const issueTitle = `[${submodule} ${step.id}] update ${filePath}`

    const body = freeText(`
      **${issueTitle}**

      \`\`\`${extension}
      ==>${newFileContent}<==
      \`\`\`

      **Description**

      Write a short summary that describes your changes to the file...
    `)

    const a = document.createElement('a')
    a.href = `https://github.com/${tutorial.author.username}/${tutorial.repo}/issues/new?title=${escape(issueTitle)}&body=${escape(body)}`
    a.target = '_blank'
    a.click()
  }, [setEditing, setEditText])

  return (
    <Container>
      {editing && (
        <EditorModal
          extension={extension}
          text={editText}
          onClose={closeEditModal}
          onSubmit={submitFileChanges}
        />
      )}
      <DiffHeader>
        <div>{projectTitle(title)}</div>
        <EditButton onClick={editFile} />
        <CopyButton text={title.split(' ').pop()} />
      </DiffHeader>
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
