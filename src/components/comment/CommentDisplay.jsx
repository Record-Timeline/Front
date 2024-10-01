/** @jsxImportSource @emotion/react */

import React, {useEffect, useState} from "react";
import {css} from "@emotion/react";
import {FaRegTrashAlt} from "react-icons/fa";

export default function CommentDisplay() {
  return (
    <div // 댓글
      css={css({
        padding: "20px 20px 0 20px",
        // border: "1px solid black",
      })}
    >
      <div // 닉네임 + 작성일시
        css={css({
          display: "flex",
          alignItems: "center",
          gap: "15px",
          // border: "1px solid red",
        })}
      >
        <b>닉네임</b>
        <div css={css({fontSize: "13px", color: "#A5A5A5"})}>24-03-23 19:23</div>
        <div
          css={css({
            display: "flex",
            justifyContent: "center",
            width: "fit-content",
            fontSize: "14px",
            cursor: "pointer",
          })}>
          답글
        </div>
        <FaRegTrashAlt css={css({fontSize: "13px", color: "#E89494", cursor: "pointer"})}/>
      </div>
      <div // 댓글 내용
        css={css({
          marginTop: "10px",
          // border: "1px solid red",
        })}
      >
        헤이 모두들 안녕 내가 누군지 아니?계산을 통해 정해지는 수치로 표현하므로,
        정확한 갯수와 아이템의 너비가 같을 경우에 사용가능하며, 만약 갯수가 변경되거나,
        아이템 너비가 각각 변하게 된다면 추가적인 수정이 필요하게 됩니다. 하지만,
        하위 브라우저에 대한 지원도 가능하니, 알아둬야 되는 방법입니다
      </div>
      <hr css={css({marginTop: "20px", border: "1px solid #E9E9E9"})}/>
    </div>
  )
}