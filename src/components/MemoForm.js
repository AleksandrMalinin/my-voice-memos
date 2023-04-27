import { useEffect, useCallback, useRef, useState } from "react"
import styled, { keyframes } from "styled-components"
import { v4 as uuidv4 } from "uuid"

import micIcon from "../../src/assets/mic_icon.svg"

function MemoForm({ onSave, onCancel, memo = {} }) {
  const [memoName, setMemoName] = useState(memo.name || "")
  const [memoText, setMemoText] = useState(memo.text || "")
  const [copied, setCopied] = useState("")
  const [recognitionActive, setRecognitionActive] = useState(false)

  const recognitionRef = useRef(null)

  const handleSaveMemo = useCallback(
    (e) => {
      if (memoName?.length && memoText?.length) {
        e.preventDefault()

        onSave({
          id: memo.id || uuidv4(),
          name: memoName,
          text: memoText
        })
      }
    },
    [memoName, memoText, memo, onSave]
  )

  const handleResetMemo = useCallback(() => {
    setMemoText("")
  }, [])

  const handleCopyMemo = (copyUrl) => {
    setCopied(copyUrl)
    navigator.clipboard.writeText(copyUrl)
    setTimeout(() => setCopied(false), 3000)
  }

  const toggleVoiceInput = useCallback(() => {
    if (!recognitionActive) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition

      if (!SpeechRecognition) {
        alert(
          "Speech recognition is not supported by your browser. Please upgrade to a newer version or use a different browser."
        )
        return
      }

      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true // set continuous to true
      recognitionRef.current.lang = "en-US"
      recognitionRef.current.onstart = () => setRecognitionActive(true)
      recognitionRef.current.onresult = (e) => {
        const lastResult = e.results[e.results.length - 1]
        console.log(lastResult)
        const text =
          lastResult[0].transcript.indexOf(" ") === 0
            ? lastResult[0].transcript.slice(1)
            : lastResult[0].transcript
        setMemoText((prevText) => (prevText ? `${prevText} ${text}` : text))
      }
      recognitionRef.current.start()
    } else {
      recognitionRef.current.onend = () => setRecognitionActive(false)
      recognitionRef.current.stop()
    }
  }, [recognitionActive])

  useEffect(() => {
    setMemoName(memo.name)
    setMemoText(memo.text)
  }, [memo])

  return (
    <Form>
      <MemoNameLabel>
        <MemoName
          value={memoName ?? ""}
          placeholder='Type memo name'
          onChange={(e) => setMemoName(e.target.value)}
          required
        />
      </MemoNameLabel>

      <MemoTextLabel>
        <MemoText
          value={memoText}
          placeholder='Your memo will be displayed here. You can either type it or record it using your voice.'
          onChange={(e) => setMemoText(e.target.value)}
          rows='20'
          required
        />
      </MemoTextLabel>

      <BtnsContainer>
        <RecordBtn
          type='button'
          onClick={toggleVoiceInput}
          className={recognitionActive ? `active` : ""}
        >
          {!recognitionActive ? "Record voice" : "Stop recording"}
        </RecordBtn>
        <SaveBtn
          type='submit'
          onClick={handleSaveMemo}
          disabled={recognitionActive}
        >
          Save
        </SaveBtn>
        <ResetBtn type='button' onClick={handleResetMemo} disabled={!memoText}>
          Reset
        </ResetBtn>
        <CopyBtn
          type='button'
          className={memoText && copied === memoText ? "copied" : ""}
          onClick={() => handleCopyMemo(memoText)}
          disabled={!memoText || recognitionActive}
        >
          {memoText && copied === memoText ? "Copied" : "Copy"}
        </CopyBtn>
        <CancelBtn type='button' onClick={onCancel}>
          Cancel
        </CancelBtn>
      </BtnsContainer>
    </Form>
  )
}

const pulse = keyframes`
  from { 
    opacity: 1; 
  }

  to { 
    opacity: 0; 
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
`

const BtnsContainer = styled.div`
  display: flex;
`

const MemoNameLabel = styled.label``

const MemoTextLabel = styled.label`
  margin-bottom: 20px;
`

const MemoName = styled.input`
  width: 100%;
  margin-bottom: 20px;
  padding: 8px 0;
  font-family: monospace;
  font-size: 20px;
  color: white;
  border: none;
  background: none;
  border-bottom: 2px solid pink;
  outline: none;
  resize: none;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`

const MemoText = styled.textarea`
  width: 100%;
  height: 100%;
  margin-bottom: 10px;
  padding: 20px;
  color: black;
  border: none;
  background: lavender;
  border-radius: 25px;
  border: 2px solid pink;
  outline: none;
  resize: none;
`

const RecordBtn = styled.button`
  position: relative;
  margin-right: 10px;
  padding: 10px 15px;
  padding-right: 32px;
  font-family: monospace;
  font-size: 14px;
  font-weight: bold;
  color: white;
  background-color: fuchsia;
  border: none;
  border-radius: 20px;

  @media (max-width: 768px) {
    margin-right: 5px;
    font-size: 10px;
  }

  &:hover:not(:disabled) {
    opacity: 0.6;
  }

  &::after {
    content: "";
    position: absolute;
    right: 10px;
    top: 50%;
    width: 20px;
    height: 20px;
    background-image: url(${micIcon});
    background-repeat: no-repeat;
    background-size: 100%;
    transform: translateY(-50%);

    @media (max-width: 768px) {
      width: 15px;
      height: 15px;
    }
  }

  &.active {
    padding-right: 15px;
    background-color: #ff006f;

    &::after {
      content: "🔴";
      right: -15px;
      width: auto;
      height: auto;
      font-size: 6px;
      background-image: none;
      animation: ease ${pulse} 600ms infinite;
    }
  }
`

const SaveBtn = styled(RecordBtn)`
  width: auto;
  margin-left: auto;
  padding-right: 15px;
  background-color: slateblue;

  &:disabled {
    opacity: 0.6;
  }

  &::after {
    content: none;
  }
`

const CopyBtn = styled(SaveBtn)`
  margin-left: 0;

  &.copied {
    background-color: deepskyblue;
  }
`

const CancelBtn = styled(SaveBtn)`
  margin-left: 0;
`

const ResetBtn = styled(SaveBtn)`
  margin-left: 0;
`

export default MemoForm
