/** @jsxImportSource @emotion/react */

import React from "react";
import { css } from "@emotion/react";

export default function FollowerUser({
                                       profileImgSrc,
                                       nickName,
                                       interest,
                                       followerId,
                                       cancleFollow,
                                       isFollowing
                                     }) {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        padding: 30px;
        border-bottom: 1px solid #D8D8D8;
          width: 500px;
      `}
    >
      <img
        css={css`
          width: 80px;
            height: 80px;
            overflow: hidden;
            border-radius: 50%;
        `}
        src={profileImgSrc}
        alt={`${nickName}의 프로필 이미지`}
      />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          margin-left: 20px;
        `}
      >
        <div
          css={css`
            font-size: 21px;
            font-weight: 700;
              margin-left: 5px;
          `}
        >
          {nickName}
        </div>
        <div
          css={css`
            border-radius: 20px;
            background: #829fd7;
            color: white;
            padding: 5px 18px;
            font-size: 15px;
            margin-top: 8px;
          `}
        >
          {interest}
        </div>
      </div>
      <div
        css={css`
          margin-left: auto;
          cursor: pointer;
          padding: 5px 20px;
          border-radius: 10px;
            background: ${isFollowing ? "#909090" : "#b4b4b4"};
          color: #FFF;
          font-size: 17px;
          font-weight: 500;
        `}
        onClick={() => cancleFollow(followerId)}
      >
        {isFollowing ? "팔로우 취소" : "삭제"}
      </div>
    </div>
  );
}
