/** @jsxImportSource @emotion/react */

import React from "react";
import { css } from "@emotion/react";
import {useNavigate} from "react-router-dom";
export default function SearchRecoderBox({
  nickName,
  category,
  introduce,
  followerNum,
  profileImg,
  memberId
}) {
  const navigate = useNavigate();
  // 레코더 클릭 시
  const onClickRecorder = (userId) => {
    navigate(`/othersmain/${userId}`);
  };

  return (
    <div
      css={css`
        display: flex;
        width: 350px;
        justify-content: center;
        border: 1px solid #b8b6b6;
        border-radius: 5px;
        margin-top: 10px;
        font-size: 14px;
        padding: 20px;
        color: black;
          cursor: pointer;
      `}
      onClick={() => onClickRecorder(memberId)}

    >
        <div >
        <div           
        css={css`
            font-size: 20px;
            font-weight: 500;
            margin-left: 5px;
          `}>{nickName}</div>
        <div
          css={css`
            margin: 3px 0px 7px 0px;
            text-align: center;
            border-radius: 30px;
            background: #d9d9d9;
            padding: 2px 10px;
            width: fit-content;
          `}
        >
          {category}
        </div>
        <div css={css`
            width: 180px;
            margin-right: 20px;
            font-size: 15px;
        `}>{introduce?.length > 25 ? `${introduce.slice(0, 25)}...` : introduce}</div>
        <div 
        css={css`
        width: 180px;
        font-size: 13px;
        color: #505050;
        margin: 15px 0px 0px 0px;
    `}
        >팔로워 {followerNum}</div>
    </div>
    <img src={profileImg} alt="프로필 이미지"            
        css={css`
            width: 100px;
            height: 100px;
            border-radius: 50%;
            object-fit: cover;
        `}/>
    </div>
  );
}
