/** @jsxImportSource @emotion/react */

import React from "react";
import { css } from "@emotion/react";
import SearchIcon from "@mui/icons-material/Search";

export default function Search() {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        flex-direction: column;
      `}
    >
      <div
        css={css`
          border-bottom: 1px solid black;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <input
          css={css`
            color: #273b4a;
            font-size: 30px;
            font-weight: 400;
            outline: none;
            border: none;
            width: 600px;
            padding: 10px 20px;
            &::placeholder {
              color: #cecece;
            }
          `}
          placeholder="검색어를 입력해주세요"
        ></input>
        <SearchIcon
          style={{
            fontSize: "35px",
            cursor: "pointer",
            color: "#525252",
          }}
        />
      </div>
      <div
        css={css`
          color: #273b4a;
          font-size: 23px;
          font-weight: 400;
          margin-top: 80px;

          > span {
            color: #6089b9;
            font-weight: 600;
          }
        `}
      >
        관심 분야 / 직종이 비슷한 레코더들의 <span>타임라인</span>을 둘러보세요.
      </div>
    </div>
  );
}
