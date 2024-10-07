/** @jsxImportSource @emotion/react */

import {useEffect, useState} from "react";
import {css} from "@emotion/react";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import EmojiPicker from 'emoji-picker-react';
import {FaRegSmile} from "react-icons/fa";
import {EmojiClickData} from "emoji-picker-react";
import dayjs from "dayjs";

export default function CommentInput({ addComment }) {
  const [content, setContent] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  const handleSave = () => {
    if (content === "") { // 내용이 비어있을 때는 추가하지 않음
      console.log("내용을 입력해주세요. alert Dialog 창 넣기");
      return;
    }

    const currentDate = dayjs().format('YY-MM-DD HH:mm');
    console.log(currentDate)

    const newComment = {
      currentDate,
      content,
    }

    // 부모 컴포넌트의 addComment 함수를 호출하여 댓글 추가
    addComment(newComment);
    setContent(""); // 입력 필드를 초기화
    setEmojiPickerOpen(false); // 이모지 선택 창 닫기
  }

  // 이모지 picker의 open 상태를 토글
  const showEmojiPicker = () => {
    setEmojiPickerOpen((prev) => !prev);
  }

  // 이모지 클릭했을 때 입력창에 추가
  const emojiClick = (emojiData: EmojiClickData) => {
    setContent((prev) => prev + emojiData.emoji);
    // setEmojiPickerOpen(false)
    // console.log(emojiData)
  }

  return (
    <div
      css={css({
        gap: "18px",
        margin: "20px",
        marginTop: "20px",
        // border: "1px solid black"
      })}
    >
      <TextField
        fullWidth
        id="filled-multiline-static"
        placeholder={"댓글을 입력해주세요."}
        label="댓글"
        multiline
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        inputProps={{
          style: {fontSize: '16px', fontFamily: "Pretendard"}
        }}
      />
      <div
        css={css({
          display: "flex",
          justifyContent: "space-between",
          marginTop: "15px",
        })}
      >
        <FaRegSmile
          onClick={showEmojiPicker}
          css={css({
            fontSize: "25px",
            cursor: "pointer",
          })}
        />
        <div
          onClick={handleSave}
          css={css({
            width: '10%',
            height: '35px',
            display: 'flex',
            alignItems: 'center', // 수직 정렬
            justifyContent: 'center', // 수평 정렬
            fontSize: "15px",
            border: "1px solid #D3D3D3",
            borderRadius: "5px",
            backgroundColor: "#F2F5FA",
            cursor: "pointer"
          })}
        >
          등록
        </div>
      </div>
      {emojiPickerOpen && <EmojiPicker onEmojiClick={emojiClick} />}
    </div>

  )
}