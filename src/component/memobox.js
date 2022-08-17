import { useState } from "react";
import styled from "styled-components";

const Box = styled.div`
    margin: 10px;
    padding: 10px;
    /* min-width: 200px; */
    max-width: 300px;
    /* border: 1px solid black; */
    border-radius: 10px;
    box-shadow: 10px 10px 10px 2px #FFB200;
    display: flex;
    /* align-items: flex-start; */
    /* align-content: flex-start; */
    flex-direction: column;
    background-color: #FFFDDE;
`;

const TitleLine = styled.div`
    font-weight: 700;
    width: 100%;
    text-align: center;
    margin: 3px;
`
const BodyLine = styled.div`
    text-align: left;
    width:100%;
    margin: 3px;

    word-wrap: break-word;      /* IE 5.5-7 */
    white-space: -moz-pre-wrap; /* Firefox 1.0-2.0 */
    white-space: pre-wrap;      /* current browsers */
`
const DateLine = styled.div`
    font-size: 10px;
    text-align: right;
    width:100%;
    margin: 3px;
`
const ButtonLine = styled.div`
    position: relative;
        right: 5px;
        bottom: 1px;
    text-align: right;
    width:100%;
`

export default function MemoBox ({memoList, setMemoList, data, setModiMemo}){
    return (
        <Box>
            <TitleLine>{data.title}</TitleLine>
            <BodyLine>{data.body}</BodyLine>
            <DateLine>{data.createdAt}</DateLine>
            <ButtonLine>
                <button onClick={() => setModiMemo(data.id)}>수정</button>
                <button onClick={() => {
                    fetch(`http://localhost:3001/memo/${data.id}`, {
                        method: "DELETE"
                    })
                    .then(res => res.json())
                    .then(setMemoList(memoList.filter(ele => ele.id !== data.id)))
                }}>삭제</button>
            </ButtonLine>
        </Box>
    )
}