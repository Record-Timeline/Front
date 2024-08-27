/** @jsxImportSource @emotion/react */

import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import ProfileInfo from "./ProfileInfo";
import {useNavigate} from "react-router-dom";


export default function RecoderRecommendation({ recorderData }) {
  const navigate = useNavigate();
  // 레코더 클릭 시
  const onClickRecorder = (userId) => {
    navigate(`/othersmain/${userId}`);
  };

  return (
    <div
      css={css`
        display: flex;
        border-right: 1px solid #ffffff !important;
      `}
    >
      {recorderData && recorderData.length > 0 ? (
        recorderData.map((user, index) => (
          <div
            key={index}
            css={css`
                cursor: pointer;
              margin: 50px 0px 80px 0px;
              width: 200px;
              padding: 0px 15px;
              display: flex;
              flex-direction: column;
              align-items: center;
              border-right: ${index < recorderData.length - 1
              ? "1px solid #ededed"
              : "none"};
            `}
            onClick={() => onClickRecorder(user.id)}
          >
            <ProfileInfo
              profileImgSrc={user.profileImageUrl}
              nickName={user.nickname}
              introduce={user.introduction}
              followers={user.followerCount}
            />
            <div
              css={css`
                display: flex;
                flex-direction: column;
                margin-top: 20px;
              `}
            >
              {user.mainTimeline && user.mainTimeline.length > 0 ? (
                user.mainTimeline.map((timeline, idx) => (
                  !timeline.private && ( // timeline.private이 false일 때만 표시
                    <div
                      key={idx}
                      css={css`
          display: flex;
          width: 170px;
          margin-top: 12px;
          align-items: center;
          background: #f5f5f5;
          border-radius: 30px;
        `}
                    >
                      <div
                        css={css`
            border-radius: 20px;
            border: 2px solid #829fd7;
            background: ${timeline.done ?  '#829fd7' : 'transparent'}; // timeline.done에 따라 배경색 설정
            width: 9px;
            height: 9px;
            margin-left: 20px;
          `}
                      />
                      <div
                        css={css`
            width: 110px;
            text-align: center;
            font-size: 15px;
            font-weight: 400;
            margin: 10px 20px 10px 10px;
          `}
                      >
                        {timeline.title}
                      </div>
                    </div>
                  )
                ))
              ) : (
                <div
                  css={css`
                    font-size: 14px;
                    color: #999;
                    text-align: center;
                    margin-top: 10px;
                  `}
                >
                  타임라인이 없습니다.
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
              font-size: 19px;
            height: 100px;
            width: 100%;
            color: #999;
          `}
        >
          추천 레코더가 없습니다.
        </div>
      )}
    </div>
  );
}