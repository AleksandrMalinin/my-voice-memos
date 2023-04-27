import { useState, useCallback } from "react"
import styled from "styled-components"
import { v4 as uuidv4 } from "uuid"

import MemoForm from "./components/MemoForm"
import MemoItem from "./components/MemoItem"
import useLocalStorage from "./hooks/useLocalStorage"

import githubLogo from "../src/assets/github_logo.svg"
import micIcon from "../src/assets/mic_icon.svg"

function App() {
  const [memos, setMemos] = useLocalStorage("memos", [])
  const [currentMemo, setCurrentMemo] = useState(null)

  const handleSaveMemo = useCallback(
    (memo) => {
      const index = memos.findIndex((item) => item.id === memo.id)

      if (index !== -1) {
        setMemos(memos.map((item, i) => (i === index ? memo : item)))
      } else {
        setMemos([...memos, { ...memo, id: uuidv4() }])
      }

      setCurrentMemo(null)
    },
    [memos, setMemos]
  )

  const handleDeleteMemo = useCallback(
    (memo) => {
      setMemos(memos.filter((item) => item.id !== memo.id))
      setCurrentMemo(null)
    },
    [memos, setMemos]
  )

  const handleCancelMemo = useCallback(() => {
    setCurrentMemo(null)
  }, [])

  const handlelEditMemo = useCallback((memo) => {
    setCurrentMemo(memo)
  }, [])

  return (
    <Layout>
      <Header>
        <Title>
          My voice memos
          <br />
          <span>Save thoughts using your voice.</span>
        </Title>
        <GithubLink
          type='button'
          href='https://github.com/AleksandrMalinin/my-voice-memos'
          target='_blank'
        >
          <Image src={githubLogo} alt='GitHub logo' width='50' height='50' />
        </GithubLink>
      </Header>

      <Wrapper>
        <EditorContainer>
          {currentMemo ? (
            <MemoForm
              memo={currentMemo}
              onSave={handleSaveMemo}
              onEdit={handlelEditMemo}
              onDelete={handleDeleteMemo}
              onCancel={handleCancelMemo}
            />
          ) : (
            <CreateMemoBtn onClick={() => setCurrentMemo({})}>
              Create memo
            </CreateMemoBtn>
          )}
        </EditorContainer>

        <MemosList>
          {memos.map((memo) => (
            <MemoItem
              memo={memo}
              setCurrentMemo={setCurrentMemo}
              handleDeleteMemo={handleDeleteMemo}
              key={memo.id}
            />
          ))}
        </MemosList>
      </Wrapper>
    </Layout>
  )
}

const Layout = styled.section`
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 80px 30px;

  @media (max-width: 768px) {
    height: auto;
    padding: 40px 30px 80px;
  }
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 100px;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    margin-bottom: 60px;
  }
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  margin-right: -30px;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    margin-right: 0;
    overflow: initial;
  }
`

const Title = styled.h1`
  position: relative;
  font-family: monospace;
  font-size: 48px;
  line-height: 0.6;
  color: white;

  @media (max-width: 768px) {
    font-size: 37px;
    line-height: 0.8;
  }

  span {
    font-size: 14px;
    font-weight: normal;
    color: paleturquoise;
  }

  &::after {
    content: "";
    position: absolute;
    right: -50px;
    top: calc(50% - 15px);
    width: 40px;
    height: 40px;
    background-image: url(${micIcon});
    background-repeat: no-repeat;
    background-size: 100%;
    transform: translateY(-50%);

    @media (max-width: 768px) {
      right: -40px;
      width: 30px;
      height: 30px;
    }
  }
`

const GithubLink = styled.a`
  position: relative;
  top: 10px;
  cursor: pointer;

  @media (max-width: 768px) {
    top: 0;
    margin-bottom: 30px;
  }
`

const Image = styled.img`
  &:hover {
    opacity: 0.6;
  }
`

const CreateMemoBtn = styled.button`
  width: auto;
  margin-bottom: 40px;
  padding: 20px 50px;
  font-family: monospace;
  font-size: 20px;
  font-weight: bold;
  color: white;
  background-color: fuchsia;
  border: none;
  border-radius: 30px;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.2);

  &:hover {
    opacity: 0.6;
  }
`

const EditorContainer = styled.div`
  max-width: 48%;
  min-width: 48%;
  height: 100%;

  @media (max-width: 768px) {
    max-width: none;
    min-width: auto;
  }
`

const MemosList = styled.ul`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 48%;
  min-width: 48%;
  overflow: scroll;
  height: 100%;
  padding-right: 30px;

  @media (max-width: 768px) {
    max-width: none;
    min-width: auto;
    height: auto;
    margin-bottom: 40px;
    overflow: initial;
  }
`

export default App
