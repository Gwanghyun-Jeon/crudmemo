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
`

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
    width: 100%;
    text-align: center;
    margin: 3px;
    height: 20px;
`
const BodyLine = styled.textarea`
    /* text-align: left; */
    font-size: 20px;
    width:100%;
    margin: 3px;
    height: 300px;
`
const ButtonLine = styled.div`
    text-align: right;
    width:100%;
`

export default function ModiMemo ({memoList, setMemoList, setModiOpen, setModiMemo, modiMemo}){
    const [newTitle, setNewTitle] = useState(memoList.filter(ele => Number(ele.id) === Number(modiMemo))[0].title);
    const [newBody, setNewBody] = useState(memoList.filter(ele => Number(ele.id) === Number(modiMemo))[0].body);
    const date = new Date();
    let temp = JSON.parse(JSON.stringify(memoList));
    let temp2 = temp.map(ele => {
        if(Number(ele.id) === modiMemo){
            ele.title = newTitle;
            ele.body = newBody;
            ele.createdAt = date.toLocaleString('ko-kr');
        }
        return ele
    });
    console.log(temp2)
    return (
        <Background>
            <Box>
                <TitleLine onChange={(e) => setNewTitle(e.target.value)} placeholder={newTitle}/>
                <BodyLine onChange={(e) => setNewBody(e.target.value)} placeholder={newBody}/>
                <ButtonLine>
                    <button onClick={() => {
                        setModiMemo('');
                        setModiOpen(false);
                        }}>작성 취소</button>
                    <button onClick={() => {
                        fetch(`http://localhost:3001/memo/${modiMemo}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                id: modiMemo,
                                title: newTitle,
                                body: newBody,
                                createdAt: date.toLocaleString('ko-kr')
                            })
                        })
                        .then(res => res.json())
                        .then(setMemoList(temp2))
                        .then(setModiMemo(''))
                        .then(setModiOpen(false))
                    }}>작성 완료</button>
                </ButtonLine>
            </Box>
        </Background>
    )
}