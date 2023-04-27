import styled from "styled-components"

function MemoItem({ memo, setCurrentMemo, handleDeleteMemo }) {
  return (
    <Layout>
      <MemoBtn
        onClick={() => {
          setCurrentMemo(memo)
        }}
      >
        {memo.name}
      </MemoBtn>
      <DeleteBtn onClick={() => handleDeleteMemo(memo)}>x</DeleteBtn>
    </Layout>
  )
}

const Layout = styled.li`
  position: relative;
  width: 70%;
  min-height: 40px;
  margin-bottom: 10px;
  margin-left: auto;
  background-color: paleturquoise;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 100%;
  }
`

const MemoBtn = styled.button`
  width: 100%;
  min-height: 40px;
  padding: 10px 15px;
  color: darkblue;
  font-family: monospace;
  background: none;
  border: none;
  border-radius: 10px;

  &:hover {
    box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.2);
  }
`

const DeleteBtn = styled.button`
  position: absolute;
  top: 50%;
  right: -30px;
  width: 24px;
  height: 24px;
  font-size: 16px;
  color: white;
  border: none;
  background: none;
  transform: translateY(-50%);

  &:hover {
    color: paleturquoise;
  }
`

export default MemoItem
