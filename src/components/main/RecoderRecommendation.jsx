/** @jsxImportSource @emotion/react */

import React from "react";
import { css } from "@emotion/react";
import ProfileNickName from "./ProfileNickName";
import testProfileImg from "../../assets/images/testProfileImg.png";
export default function RecoderRecommendation() {
  const testNickName = "닉네임!";
  const introduce = "리액트, spring 공부 개발 프로젝트 진행";
  const testfollowers = 203;
  const testRecorderData = [
    {
      name: "Sara Kim",
      introduce: "리액트, spring 공부 개발 프로젝트 진행중",
      followers: 3562,
      timelineList: [
        "리액트 스터디",
        "스프링 스터디",
        "외부 연합 프로그래밍 동아리 3기 활동",
        "은행 체험형 인턴 6개월",
      ],
    },
    {
      name: "해피레코더",
      introduce:
        "긍정적인 마음과 행복은 만병통치약. 항상 밝은 에너지를 가지고 있는 것이 중요합니다! 행복합시다~",
      followers: 156,
      timelineList: [
        "요리대회 우승",
        "스터디",
        "과학기술원 주최 공모전 우수상 수상",
        "성신여자대학교 교내 동아리",
      ],
    },
    {
      name: "나는야개발자",
      introduce: "우아한 형제들 백엔드 개발을 하고 있습니다~",
      followers: 23504,
      timelineList: ["개발자 준비", "스터디"],
    },
    {
      name: "Sara Kim",
      introduce: "리액트, spring 공부 개발 프로젝트 진행중",
      followers: 3562,
      timelineList: [
        "리액트 스터디",
        "스프링 스터디",
        "외부 연합 프로그래밍 동아리 3기 활동",
        "은행 체험형 인턴 6개월",
      ],
    },
    {
      name: "해피레코더",
      introduce:
        "긍정적인 마음과 행복은 만병통치약. 항상 밝은 에너지를 가지고 있는 것이 중요합니다! 행복합시다~",
      followers: 156,
      timelineList: [
        "요리대회 우승",
        "스터디",
        "과학기술원 주최 공모전 우수상 수상",
        "성신여자대학교 교내 동아리",
      ],
    },
  ];
  return (
    <div
      css={css`
        display: flex;
        border-right: 1px solid #ffffff !important;
      `}
    >
      {testRecorderData.map((user, index) => (
        <div
          key={index}
          css={css`
            width: 200px;
            margin: 50px 0px 80px 0px;
            padding: 0px 25px;
            display: flex;
            flex-direction: column;
            align-items: center;
            border-right: ${index < testRecorderData.length - 1
              ? "1px solid #ededed"
              : "none"};
          `}
        >
          <ProfileNickName
            profileImgSrc={testProfileImg}
            nickName={user.name}
          />
          <div
            css={css`
              width: 170px;
              text-align: center;
              font-size: 16px;
              font-weight: 400;
              word-break: keep-all;
            `}
          >
            {user.introduce.length > 25
              ? `${user.introduce.slice(0, 25)}...`
              : user.introduce}
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
            팔로워 {user.followers}명
          </div>

          <div
            css={css`
              display: flex;
              flex-direction: column;
              margin-top: 20px;
            `}
          >
            {user.timelineList.map((item, idx) => (
              <div
                key={idx}
                css={css`
                  display: flex;
                  width: 200px;
                  margin-top: 12px;
                  align-items: center;
                  background: #f5f5f5;
                  border-radius: 30px;
                `}
              >
                <div
                  css={css`
                    border-radius: 20px;
                    border: 3px solid #829fd7;
                    background: #829fd7;
                    width: 9px;
                    height: 9px;
                    margin-left: 20px;
                  `}
                />
                <div
                  css={css`
                    width: 120px;
                    text-align: center;
                    font-size: 15px;
                    font-weight: 400;
                    word-break: keep-all;
                    margin: 14px 10px;
                  `}
                >
                  {item}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
