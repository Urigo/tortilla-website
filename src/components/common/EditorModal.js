import { faTimes } from '@fortawesome/free-solid-svg-icons'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import FaIcon from './FaIcon'

const Shim = styled.div `
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`

const Container = (() => {
  const margin = 50

  return styled.div `
    position: fixed;
    top: ${margin}px;
    left: ${margin}px;
    width: calc(100% - ${margin * 2}px);
    height: calc(100% - ${margin * 2}px);
    border-radius: 3px;
    background-color: white;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);

    .CodeMirror {
      width: 100%;
      height: 100%;
      margin-top: 10px;
      border: 1px solid silver;

      pre {
        background: transparent;
      }
    }
  `
})()

const PurposeInput = styled.input.attrs({
  type: 'text',
  placeholder: 'Purpose of changes...',
}) `
  border: 1px solid silver;
  padding-left: 5px;
  padding-right: 5px;
`

const ContentsInput = styled.textarea `
  flex: 1;
  margin-top: 10px;
  border: 1px solid silver;
  padding-left: 5px;
  resize: none;
`

const InputFields = (() => {
  const margin = 50

  return styled.div `
    display: flex;
    flex-direction: column;
    width: calc(100% - ${margin * 2}px);
    height: calc(100% - ${margin * 2}px - 30px);
    margin: ${margin}px;
    margin-bottom: 22.5px;
  `
})()

const CloseButton = styled(FaIcon).attrs({
  icon: faTimes,
  size: 20,
})`
  position: absolute;
  top: 10px;
  left: 10px;
  cursor: pointer;
  float: right;
  color: ${({ theme }) => theme.primaryBlue};
`

const SubmitButton = styled.button `
  display: block;
  padding: 5px 20px;
  margin-left: auto;
  margin-right: auto;
  color: ${({ theme }) => theme.primaryBlue};
  border: 1px solid ${({ theme }) => theme.primaryBlue};
  border-radius: 3px;
  cursor: pointer;
  background-color: white;
`

const EditorModal = ({ extension, text, onSubmit, onClose }) => {
  onSubmit = useMemo(() => typeof onSubmit === 'function' ? onSubmit : () => {}, [onSubmit])
  onClose = useMemo(() => typeof onClose === 'function' ? onClose : () => {}, [onClose])
  const [CodeMirror, setCodeMirror] = useState(null)
  const [purpose, setPurpose] = useState('')
  const [contents, setContents] = useState('')
  const [editor, setEditor] = useState(null)
  const [modeImported, setModeImported] = useState(false)
  const loading = useMemo(() => !text || !CodeMirror || !modeImported, [text, CodeMirror, modeImported])
  const mode = useMemo(() => ((CodeMirror && CodeMirror.findModeByExtension(extension)) || {}).mode, [extension, CodeMirror])
  const contentsRef = useRef(null)
  const shimRef = useRef(null)

  const close = useCallback(() => {
    onClose()
  }, [onClose])

  const updatePurpose = useCallback((e) => {
    setPurpose(e.target.value)
  }, [setPurpose])

  const updateContents = useCallback((e) => {
    setContents(e.target.value)
  }, [setContents])

  const submit = useCallback(() => {
    if (loading) return

    onSubmit({ contents, purpose })
  }, [loading, contents, purpose, onSubmit])

  const onShimClick = useCallback((e) => {
    if (!shimRef.current) return
    if (e.target !== shimRef.current) return

    close()
  }, [shimRef.current, close])

  useEffect(() => {
    setContents(loading ? 'Loading...' : text)
  }, [text, loading])

  useEffect(() => {
    if (!contentsRef.current) return
    if (loading) return
    if (editor) return

    setEditor(CodeMirror.fromTextArea(contentsRef.current, {
      lineNumbers: true,
      mode,
    }))
  }, [contentsRef.current, CodeMirror, loading, editor, mode])

  useEffect(() => {
    if (!editor) return

    const onChange = (e) => {
      setContents(editor.getDoc().getValue())
    }

    editor.getDoc().setValue(text)
    editor.on('change', onChange)

    return () => {
      editor.off('change', onChange)
    }
  }, [editor, text, setContents])

  useEffect(() => {
    const onKeyPress = (e) => {
      if (e.code === 'Escape') close()
    }

    document.addEventListener('keydown', onKeyPress)

    return () => {
      document.removeEventListener('keydown', onKeyPress)
    }
  }, [close])

  useEffect(() => {
    if (CodeMirror) return
    if (typeof window === 'undefined') return

    import('../../libs/codemirror').then((esModule) => {
      if (esModule) {
        // "default" is a function therefore if it's passed directly it will be invoked
        setCodeMirror(() => esModule.default)
      }
    })
  }, [CodeMirror, setCodeMirror])

  useEffect(() => {
    if (!CodeMirror) return

    if (!mode) {
      setModeImported(true)

      return
    }

    // Webpack will create an endpoint for all files matching the following pattern
    import(`codemirror/mode/${mode}/${mode}.js`).then(() => {
      setModeImported(true)
    })
  }, [CodeMirror, setModeImported, mode])

  return (
    <Shim onClick={onShimClick} ref={shimRef}>
      <Container>
        <CloseButton onClick={close}>x</CloseButton>
        <InputFields>
          <PurposeInput onChange={updatePurpose} value={purpose} tabIndex={0} />
          <ContentsInput onChange={updateContents} disabled={loading} value={contents} resizable={false} ref={contentsRef} tabIndex={1} />
        </InputFields>
        <SubmitButton onClick={submit} disabled={loading} tabIndex={2}>submit</SubmitButton>
      </Container>
    </Shim>
  )
}

export default EditorModal