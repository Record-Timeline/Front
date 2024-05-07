/** @jsxImportSource @emotion/react */

import React from "react";
import { css } from "@emotion/react";
import ProfileNickName from "./ProfileNickName";

export default function ProfileInfo({
  profileImgSrc,
  nickName,
  introduce,
  followers,
}) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <ProfileNickName profileImgSrc={profileImgSrc} nickName={nickName} />
      <div
        css={css`
          width: 170px;
          text-align: center;
          font-size: 16px;
          font-weight: 400;
          word-break: keep-all;
        `}
      >
        {introduce.length > 25 ? `${introduce.slice(0, 25)}...` : introduce}
      </div>
      <div
        css={css`
          text-align: center;
          color: #535353;
          font-size: 15px;
          font-weight: 400;
          margin-top: 10px;
        `}
      >
        팔로워 {followers}명
      </div>
    </div>
  );
}
