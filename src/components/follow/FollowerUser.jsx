/** @jsxImportSource @emotion/react */

import React from "react";
import { css } from "@emotion/react";

export default function FollowerUser({
                                      profileImgSrc,
                                      nickName,
                                      interest,
                                    }) {

  return (
    <div
      css={css`
          display: flex;
          align-items: center;
          padding: 30px;
      `}
    >
      <img       css={css`
          width: 80px;
      `} src={profileImgSrc}/>
      <div
        css={css`
          display: flex;
            flex-direction: column;
            margin-left: 20px;
      `}
      >
      <div         css={css`
          font-size: 22px;
          font-weight: 700;
      `}>{nickName}</div>
        <div         css={css`
            border-radius: 20px;
            background: #829FD7;
            color: white;
            padding: 5px 25px;
            margin-top: 8px;
        `}>{interest}</div>
</div>
      <div css={css`
          margin-left: 70px;
          cursor: pointer;
          padding: 5px 20px;
          border-radius: 10px;
          border: 1px solid #D9D9D9;
          background: #909090;
          color: #FFF;
          font-size: 17px;
          font-weight: 500;
        `}>팔로우 취소</div>
</div>
)
}
