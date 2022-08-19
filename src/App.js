import './App.css';
import styled from "styled-components";
import { useState, useEffect} from 'react';
import MemoBox from './component/memobox';
import CreateMemo from './component/createMemo';
import ModiMemo from "./component/modifyMemo";

const SearchBar = styled.input`
  margin-top: 10px;
  width: 30%;
  height: 30px;
  background-color: #FFF8F3;
  border:none;
  border-radius: 10px;
  box-shadow: 4px 4px 10px 2px #F1E1A6;
`;
const AddButton = styled.button`
  margin-top: 4px;
  width: 30%;
  height: 30px;
  border:none;
  border-radius: 10px;
  background-color: #FFF8F3;
  color: black;
  &:hover{
    color: white;
  }
`;

function App() {
  const [searchWord, setSearchWord] = useState('');
  const [addButton, setAddButton] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modiOpen, setModiOpen] = useState(false);
  const [memoList, setMemoList] = useState('');
  const [modiMemo, setModiMemo] = useState('');
  useEffect(() => {
    if(searchWord.length > 0){
      setAddButton(true);
    } else {
      setAddButton(false)
    }
    
  }, [searchWord])
  useEffect(()=>{
    fetch('http://localhost:3001/memo')
    .then(res => res.json())
    .then(data => setMemoList(data))
  }, [])
  useEffect(()=>{
    if(modiMemo !== ''){
      setModiOpen(true);
    } else {
      setModiOpen(false);
    }
  }, [modiMemo])

  return (
    <div className='body'>
      <section>
        {
          memoList && memoList.filter((ele) => ele.title.includes(searchWord) || ele.body.includes(searchWord)).map((ele) => {
            return <MemoBox setModiMemo={setModiMemo} memoList={memoList} setMemoList={setMemoList} key={ele.id} data={ele} />
          })
        }
      </section>
      { modalOpen ? <CreateMemo searchWord={searchWord} setSearchWord={setSearchWord} memoList={memoList} setMemoList={setMemoList} setModalOpen={setModalOpen}/> : ''}
      { modiOpen ? <ModiMemo modiMemo={modiMemo} setModiMemo={setModiMemo} memoList={memoList} setMemoList={setMemoList} setModiOpen={setModiOpen}/> : ''}
      <header>
        <SearchBar onChange={(e) => setSearchWord(e.target.value)} value={searchWord} onKeyPress={(e) => {if(e.key === "Enter"){setModalOpen(true)}}}/>
        {addButton ? <AddButton onClick={() => setModalOpen(true)}>해당 키워드로 메모 추가</AddButton> : ''}
      </header>
    </div>
  );
}

export default App;
