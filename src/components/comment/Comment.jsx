/** @jsxImportSource @emotion/react */

import React, {useEffect, useState} from "react";
import {css} from "@emotion/react";
import {BiCommentDetail} from "react-icons/bi";
import CommentDisplay from "./CommentDisplay";
import CommentInput from "./CommentInput";

export default function Comment() {
  const [commentCount, setCommentCount] = useState(5);
  return (
    <div // 댓글 전체 박스
      css={css({
        width: "760px",
        margin: "50px auto",
        // border: "1px solid black",
      })}
    >
      <div // 댓글 헤더
        css={css({
          display: "flex", // 부모 요소에 flexbox 적용
          alignItems: "center", // 자식 요소들 수직 정렬 (justify-content: center -> 수평 정렬)
          gap: "8px", // 요소들 사이의 간격 설정
          height: "40px",
          backgroundColor: "#F2F5FA",
          borderRadius: "5px",
          padding: "10px",
          paddingLeft: "18px", // 왼쪽에 여백 추가
        })}
      >
        <BiCommentDetail/> 댓글 {commentCount}
      </div>
      <CommentDisplay />
      <CommentDisplay />
      <CommentInput />
    </div>
  )
}