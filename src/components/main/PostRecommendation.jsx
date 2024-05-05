/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import { css } from "@emotion/react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function PostRecommendation() {
  const testPostList = [
    {
      title: "개발자를 위한 쉽고 빠른 웹 포트폴리오 만들기",
      category: "개발/IT",
      imgURL: "https://i.ibb.co/w7G1Fbc/7e2cfc67748795dda1f1b33c8cbe6b85.png",
      writer: "Sara Kim",
    },
    {
      title: "스프링 부트로 만드는 쇼핑몰 프로젝트",
      category: "프로그래밍",
      imgURL: "https://i.ibb.co/kH6qSyV/4c82bb4f1034ca4fb45e36087ad6ccc3.png",
      writer: "타임레코더",
    },
    {
      title: "Github로 프로젝트 관리하기",
      category: "프로그래밍",
      imgURL: "https://i.ibb.co/gJg3W2p/4dd84b66748765b42ef0a6f655961b45.png",
      writer: "냐옹이",
    },
    {
      title: "졸업 프로젝트 캡스톤 - 레코드 타임라인",
      category: "개발/IT",
      imgURL: "https://i.ibb.co/w7G1Fbc/7e2cfc67748795dda1f1b33c8cbe6b85.png",
      writer: "노모어피자",
    },
    {
      title: "졸업 프로젝트 캡스톤 - 레코드 타임라인",
      category: "개발/IT",
      imgURL: "https://i.ibb.co/w7G1Fbc/7e2cfc67748795dda1f1b33c8cbe6b85.png",
      writer: "노모어피자",
    },
    {
      title: "졸업 프로젝트 캡스톤 - 레코드 타임라인",
      category: "개발/IT",
      imgURL: "https://i.ibb.co/w7G1Fbc/7e2cfc67748795dda1f1b33c8cbe6b85.png",
      writer: "노모어피자",
    },
    {
      title: "졸업 프로젝트 캡스톤 - 레코드 타임라인",
      category: "개발/IT",
      imgURL: "https://i.ibb.co/w7G1Fbc/7e2cfc67748795dda1f1b33c8cbe6b85.png",
      writer: "노모어피자",
    },
    {
      title: "졸업 프로젝트 캡스톤 - 레코드 타임라인",
      category: "개발/IT",
      imgURL: "https://i.ibb.co/w7G1Fbc/7e2cfc67748795dda1f1b33c8cbe6b85.png",
      writer: "노모어피자",
    },
  ];
  const [page, setPage] = useState(0); // 페이지 번호 상태
  // 다음 페이지로 이동하는 함수
  const nextPage = () => {
    setPage(Math.min(page + 1, Math.ceil(testPostList.length / 4) - 1));
  };

  // 이전 페이지로 이동하는 함수
  const prevPage = () => {
    setPage(Math.max(page - 1, 0));
  };

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        flex-direction: column;
        margin: 30px 0px 50px 40px;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <ChevronLeftIcon
          style={{
            fontSize: "35px",
            color: page === 0 ? "#c4c4c4" : "#696969",
            marginRight: "10px",
            cursor: page === 0 ? "not-allowed" : "pointer",
          }}
          onClick={prevPage}
        />

        <div
          css={css`
            display: flex;
            border-radius: 10px;
            border: 1px solid #c4c4c4;
          `}
        >
          {testPostList.slice(page * 4, page * 4 + 4).map((post, index) => (
            <div
              key={index}
              css={css`
                padding: 25px 30px;
                width: 200px;
                border-right: ${index === 3 ? "none" : "1px solid #c4c4c4"};
              `}
            >
              <div
                css={css`
                  width: 180px;
                  word-break: keep-all;
                `}
              >
                {post.title}
              </div>
              <div
                css={css`
                  border-radius: 30px;
                  background: #d9d9d9;
                  width: fit-content;
                  padding: 5px 10px;
                  font-size: 15px;
                  font-weight: 400;
                  margin: 12px 0px;
                `}
              >
                {post.category}
              </div>
              <img
                src={post.imgURL}
                alt={post.title}
                css={css`
                  width: 100%;
                `}
              />
              <div
                css={css`
                  float: right;
                  font-size: 15px;
                  font-weight: 400;
                  margin-top: 5px;
                `}
              >
                by {post.writer}
              </div>
            </div>
          ))}
        </div>

        <ChevronRightIcon
          style={{
            fontSize: "35px",
            marginLeft: "10px",
            color: page === testPostList.length / 4 - 1 ? "#c4c4c4" : "#696969",
            cursor:
              page === testPostList.length / 4 - 1 ? "not-allowed" : "pointer",
          }}
          onClick={nextPage}
        />
      </div>
      <div
        css={css`
          display: flex;
          margin-top: 20px;
        `}
      >
        {/* 페이지 인덱스 원 */}
        {Array.from({ length: testPostList.length / 4 }).map((_, index) => (
          <div
            key={index}
            css={css`
              background-color: ${page === index ? "#696969" : "#d9d9d9"};
              border-radius: 50%;
              width: 8px;
              height: 8px;
              display: flex;
              margin-right: 5px;
              cursor: pointer;
            `}
            onClick={() => setPage(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}
