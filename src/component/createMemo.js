import { useState } from "react";
import styled from "styled-components";

const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #00000080;
    z-index: 10000;
`;
const Box = styled.div`
    position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    padding: 10px;
    width: 60%;
    display: flex;
    align-items: center;
    flex-direction: column;
`;
const TitleLine = styled.input`
    font-size: 30px;
    font-weight: 900;
    width: 70%;
    text-align: center;
    margin: 3px;
    height: 40px;
    background-color: #FFFDDE;
    border:none;
    border-radius: 10px;
    /* box-shadow: 10px 10px 10px 2px black; */
`;
const BodyLine = styled.textarea`
    /* text-align: left; */
    font-size: 20px;
    width: 70%;
    margin: 3px;
    height: 300px;
    background-color: #FFFDDE;
    border:none;
    border-radius: 10px;
    /* box-shadow: 10px 10px 10px 2px #FFB200; */
`;
const ButtonLine = styled.div`
    text-align: right;
    width: 70%;
`;

export default function CreateMemo ({memoList, setMemoList, setModalOpen, searchWord, setSearchWord}){
    const [newTitle, setNewTitle] = useState('');
    const [newBody, setNewBody] = useState('');
    const date = new Date();
    return (
        <Background>
            <Box>
                <TitleLine onChange={(e) => setNewTitle(e.target.value)} placeholder={searchWord}/>
                <BodyLine onChange={(e) => setNewBody(e.target.value)} placeholder="본문을 입력하세요"/>
                <ButtonLine>
                    <button onClick={() => setModalOpen(false)}>작성 취소</button>
                    <button onClick={() => {
                        fetch('http://localhost:3001/memo', {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                id: memoList[memoList.length-1].id + 1,
                                title: newTitle.length > 0 ? newTitle : searchWord,
                                body: newBody,
                                createdAt: date.toLocaleString('ko-kr')
                            })
                        })
                        .then(res => res.json())
                        .then(data => setMemoList([...memoList, data]))
                        .then(setSearchWord(''))
                        .then(setModalOpen(false))
                    }}>작성 완료</button>
                </ButtonLine>
            </Box>
        </Background>
    )
}