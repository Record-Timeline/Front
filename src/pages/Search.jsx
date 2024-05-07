/** @jsxImportSource @emotion/react */

import React from "react";
import { css } from "@emotion/react";
import SearchIcon from "@mui/icons-material/Search";
import ProfileInfo from "../components/main/ProfileInfo";
import testProfileImg from "../assets/images/testProfileImg.png";

export default function Search() {
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
    },
    {
      name: "나는야개발자",
      introduce: "우아한 형제들 백엔드 개발을 하고 있습니다~",
      followers: 23504,
    },
    {
      name: "Sara Kim",
      introduce: "리액트, spring 공부 개발 프로젝트 진행중",
      followers: 3562,
    },
    {
      name: "해피레코더",
      introduce:
        "긍정적인 마음과 행복은 만병통치약. 항상 밝은 에너지를 가지고 있는 것이 중요합니다! 행복합시다~",
      followers: 156,
    },
  ];
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        flex-direction: column;
        padding-left: 5%;
      `}
    >
      <div
        css={css`
          width: 800px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        `}
      >
        <div
          css={css`
            border-bottom: 1px solid black;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 70px;
          `}
        >
          <input
            css={css`
              color: #273b4a;
              font-size: 31px;
              font-weight: 400;
              outline: none;
              border: none;
              width: 700px;
              padding: 10px 20px;
              &::placeholder {
                color: #cecece;
              }
            `}
            placeholder="검색어를 입력해주세요"
          ></input>
          <SearchIcon
            style={{
              fontSize: "34px",
              cursor: "pointer",
              color: "#525252",
            }}
          />
        </div>
        <div
          css={css`
            color: #6b6b6b;
            font-size: 24px;
            font-weight: 400;
            margin-top: 70px;

            > span {
              color: #6089b9;
              font-weight: 600;
            }
          `}
        >
          관심 분야 / 직종이 비슷한 레코더들의 <span>타임라인</span>을
          둘러보세요.
        </div>
        <div
          css={css`
            display: flex;
          `}
        >
          {testRecorderData.map((user, index) => (
            <div
              key={index}
              css={css`
                margin: 50px 0px 80px 0px;
                padding: 0px 15px;
                display: flex;
                flex-direction: column;
                align-items: center;
              `}
            >
              <ProfileInfo
                profileImgSrc={testProfileImg}
                nickName={user.name}
                introduce={user.introduce}
                followers={user.followers}
              />
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  margin-top: 20px;
                `}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
