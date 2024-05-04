/** @jsxImportSource @emotion/react */

import React from "react";
import { css } from "@emotion/react";
import ProfileNickName from "./ProfileNickName";
import testProfileImg from "../../assets/images/testProfileImg.png";
export default function RecoderRecommendation() {
  const testNickName = "닉네임!";
  const introduce = "리액트, spring 공부 개발 프로젝트 진행";
  return (
    <div
      css={css`
        width: 200px;
      `}
    >
      <ProfileNickName profileImgSrc={testProfileImg} nickName={testNickName} />
      <div
        css={css`
          text-align: center;
          font-size: 15px;
          font-weight: 400;

          word-break: keep-all;
        `}
      >
        {introduce}
      </div>
      <div
        css={css`
          margin-top: 20px;
        `}
      ></div>
      <div
        css={css`
          width: 200px;
          height: 50px;
          border-radius: 30px;
          background: #f5f5f5;
          margin-top: 8px;
        `}
      ></div>
    </div>
  );
}
