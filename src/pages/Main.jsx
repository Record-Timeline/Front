/** @jsxImportSource @emotion/react */

import React from "react";
import { css } from "@emotion/react";
import Header from "../components/common/Header";

export default function Main() {
  const interestFields = [
    "마케팅/홍보/조사",
    "회계/세무/재무",
    "총무/법무/사무",
    "IT개발/데이터",
    "디자인",
    "서비스",
    "건설/건축",
    "의료",
    "교육",
    "미디어/문화/스포츠",
  ];
  const handleClick = (text) => {
    console.log(text);
  };
  return (
    <div
      css={css`
        display: flex;
        width: 100%;
        height: 100vh;
        flex-direction: column;
        align-items: center;
      `}
    >
      <Header />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          width: 55%;
        `}
      >
        <div
          css={css`
            font-size: 20px;
            font-weight: 500;
          `}
        >
          관심 분야 / 직종
        </div>
        <div
          css={css`
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 10px;
            margin: 20px 0px 50px 0px;
          `}
        >
          {interestFields.map((interest, index) => (
            <button
              key={index}
              css={css`
                font-size: 16px;
                font-weight: 500;
                padding: 20px 5px;
                border: "1px solid #D9D9D9";
                background-color: #f0f0f0;
                cursor: pointer;
              `}
              onClick={() => handleClick(interest)}
            >
              {interest}
            </button>
          ))}
        </div>
        <div
          css={css`
            font-size: 20px;
            font-weight: 500;
          `}
        >
          추천 레코더
        </div>
      </div>
    </div>
  );
}
