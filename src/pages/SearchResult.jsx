/** @jsxImportSource @emotion/react */

import React from "react";
import { css } from "@emotion/react";
import { useLocation } from "react-router-dom";
export default function SearchResult() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchKeyword = queryParams.get("keyword");
  console.log(searchKeyword);

  const searchResultNum = 390;
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        height: 100vh;
        flex-direction: column;
        padding-left: 5%;
      `}
    >
      <div
        css={css`
          font-size: 30px;
          font-weight: 600;
          margin-bottom: 30px;
        `}
      >
        {searchKeyword}
      </div>
      <div
        css={css`
          display: flex;
          font-size: 20px;
          font-weight: 400;
        `}
      >
        <div
          css={css`
            color: #607fb9;
            width: 100px;
            padding: 5px;
            border-bottom: 4px solid #829fd7;
          `}
        >
          글
        </div>
        <div
          css={css`
            color: #737373;
            width: 100px;
            padding: 5px;
          `}
        >
          레코더
        </div>
      </div>
      <div
        css={css`
          color: #717171;
          font-size: 14px;
          font-weight: 400;
          margin-top: 25px;
        `}
      >
        글 검색 결과 {searchResultNum}건
      </div>
    </div>
  );
}
