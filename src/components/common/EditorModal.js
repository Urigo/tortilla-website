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
      width: calc(100% - ${margin * 2}px);
      height: calc(100% - ${margin * 2}px - 30px);
      margin: ${margin}px;
      border: 1px solid gray;
      border-radius: 2px;
    }
  `
})()

const TextArea = (() => {
  const margin = 50

  return styled.textarea `
    width: calc(100% - ${margin * 2}px);
    height: calc(100% - ${margin * 2}px - 30px);
    margin: ${margin}px;
    resize: none;
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
  margin-top: -27.5px;
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
  const [value, setValue] = useState('')
  const [editor, setEditor] = useState(null)
  const [modeImported, setModeImported] = useState(false)
  const loading = useMemo(() => !text || !CodeMirror || !modeImported, [text, CodeMirror, modeImported])
  const mode = useMemo(() => ((CodeMirror && CodeMirror.findModeByExtension(extension)) || {}).mode, [extension, CodeMirror])
  const textareaRef = useRef(null)
  const shimRef = useRef(null)

  const close = useCallback(() => {
    onClose()
  }, [onClose])

  const updateValue = useCallback((e) => {
    setValue(e.target.value)
  }, [setValue])

  const submit = useCallback(() => {
    if (loading) return

    onSubmit(value)
  }, [loading, value, onSubmit])

  const onShimClick = useCallback((e) => {
    if (!shimRef.current) return
    if (e.target !== shimRef.current) return

    close()
  }, [shimRef.current, close])

  useEffect(() => {
    setValue(loading ? 'Loading...' : text)
  }, [text, loading])

  useEffect(() => {
    if (!textareaRef.current) return
    if (loading) return
    if (editor) return

    setEditor(CodeMirror.fromTextArea(textareaRef.current, {
      lineNumbers: true,
      mode,
    }))
  }, [textareaRef.current, CodeMirror, loading, editor, mode])

  useEffect(() => {
    if (!editor) return

    const onChange = (e) => {
      setValue(editor.getDoc().getValue())
    }

    editor.getDoc().setValue(text)
    editor.on('change', onChange)

    return () => {
      editor.off('change', onChange)
    }
  }, [editor, text, setValue])

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
        <TextArea onChange={updateValue} disabled={loading} value={value} resizable={false} ref={textareaRef} tabIndex={0} />
        <SubmitButton onClick={submit} disabled={loading}>submit</SubmitButton>
      </Container>
    </Shim>
  )
}

export default EditorModal