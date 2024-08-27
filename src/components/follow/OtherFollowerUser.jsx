/** @jsxImportSource @emotion/react */

import React from "react";
import { css } from "@emotion/react";
import Button from "@mui/material/Button";

export default function OtherFollowerUser({
                                       profileImgSrc,
                                       nickName,
                                       interest,
                                       followerId,
                                       toggleFollow, // 팔로우 상태를 토글하는 함수
                                       isFollowing, onClick
                                     }) {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        padding: 30px;
        border-bottom: 1px solid #D8D8D8;
        width: 500px;
          cursor: pointer;
      `}
      onClick={() => onClick(followerId)}
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
      <Button
        variant="text"
        color={isFollowing ? "error" : "primary"}
        onClick={(e) => {
          e.stopPropagation(); // 클릭 이벤트가 상위 div로 전달되지 않도록
          toggleFollow(followerId);
        }}
        css={css`
          margin-left: auto;
          padding: 5px 20px;
          font-size: 17px;
          font-weight: 500;
          font-family: Pretendard;
        `}
      >
        {isFollowing ? "팔로우 취소" : "팔로우"}
      </Button>
    </div>
  );
}
