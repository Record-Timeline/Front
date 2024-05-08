/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import { css } from "@emotion/react";
import { useLocation } from "react-router-dom";
import SearchPostBox from "../components/main/SearchPostBox";
import SearchRecoderBox from "../components/main/SearchRecoderBox"
import testProfileImg from "../assets/images/testProfileImg.png"
import Header from "../components/common/Header"
export default function SearchResult() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchKeyword = queryParams.get("keyword");
  const [selectedTab, setSelectedTab] = useState("posts"); // 검색 결과 글, 레코더 탭 선택
  console.log(searchKeyword);

  const searchResultPostsNum = 390;
  const searchResultRecorderssNum = 3870;

  // 글 검색 결과 더미데이터
  const testSearchDummy = [
    {
      name: "Sara Kim",
      category: "개발자",
      title: "Github로 프로젝트 관리하기",
      commentNum: 2,
      heartNum: 10,
      scrapNum: 192,
      date: "23-02-19",
    },
    {
      name: "나는야개발자",
      category: "IT/개발",
      title: "스프링부트로 만드는 쇼핑몰 프로젝트",
      commentNum: 32,
      heartNum: 304,
      scrapNum: 2,
      date: "24-05-10",
    },
    {
      name: "해피레코더",
      category: "마케터",
      title: "순수 Java로 이루어진 프로젝트",
      commentNum: 2,
      heartNum: 10,
      scrapNum: 192,
      date: "23-02-19",
    },
    {
      name: "김수룡",
      category: "디자이너",
      title: "C++ 핵심 가이드라인 한글화 프로젝트 (C++ Core Guidelines",
      commentNum: 22,
      heartNum: 130,
      scrapNum: 192,
      date: "23-02-19",
    },
  ];

    // 레코더 검색 결과 더미데이터
    const testSearchRecodersDummy = [
      {
        name: "Sara Kim",
        category: "개발자/프로그래밍 ",
        introduce: "리액트, spring 공부 개발 프로젝트 진행중",
        followerNum: 2,
        profileImg: testProfileImg
      },
      {
        name: "나는야개발자",        
        category: "IT/개발",
        introduce: "우아한 형제들 백엔드 개발팀에서 일하고 있습니다. 사이드 프로젝트를 진행중입니다. 문의사항이 있으면 연락주세요. ",
        followerNum: 204,
        profileImg: testProfileImg
      },
      {
        name: "Sara Kim",
        category: "개발자/프로그래밍 ",
        introduce: "리액트, spring 공부 개발 프로젝트 진행중",
        followerNum: 2,
        profileImg: testProfileImg
      },
      {
        name: "나는야개발자",        
        category: "IT/개발",
        introduce: "우아한 형제들 백엔드 개발팀에서 일하고 있습니다. 사이드 프로젝트를 진행중입니다. 문의사항이 있으면 연락주세요. ",
        followerNum: 204,
        profileImg: testProfileImg
      },
      {
        name: "Sara Kim",
        category: "개발자/프로그래밍 ",
        introduce: "리액트, spring 공부 개발 프로젝트 진행중",
        followerNum: 2,
        profileImg: testProfileImg
      },
      {
        name: "나는야개발자",        
        category: "IT/개발",
        introduce: "우아한 형제들 백엔드 개발팀에서 일하고 있습니다. 사이드 프로젝트를 진행중입니다. 문의사항이 있으면 연락주세요. ",
        followerNum: 204,
        profileImg: testProfileImg
      },

    ];

  return (
    <div
      css={css`
        display: flex;
        height: 100vh;
        flex-direction: column;
        margin-left: 25%;
      `}
    >
      <Header />
      <div
        css={css`
          font-size: 30px;
          font-weight: 600;
          margin-bottom: 30px;
        `}
      >
        {searchKeyword}
      </div>

      <div
        css={css`
          display: flex;
          font-size: 20px;
          font-weight: 400;
        `}
      >
        <div
          css={css`
            color: #607fb9;
            width: 100px;
            padding: 5px;
            border-bottom: 4px solid #829fd7;
            cursor: pointer;
            border-bottom: ${selectedTab === "posts"
              ? "4px solid #829fd7"
              : "none"};
            color: ${selectedTab === "posts" ? "#607fb9" : "#737373"};
          `}
          onClick={() => setSelectedTab("posts")}
        >
          글
        </div>
        <div
          css={css`
            color: #737373;
            width: 100px;
            padding: 5px;
            cursor: pointer;
            border-bottom: ${selectedTab === "recorder"
              ? "4px solid #829fd7"
              : "none"};
            color: ${selectedTab === "recorder" ? "#607fb9" : "#737373"};
          `}
          onClick={() => setSelectedTab("recorder")}
        >
          레코더
        </div>
      </div>
      <div
        css={css`
        margin-left: -35%;
          border-bottom: 1px solid #A3A3A3;
        `}
      />
      {/* 글 탭 */}
      {selectedTab === "posts" && (
        <div>
          <div
            css={css`
              color: #717171;
              font-size: 14px;
              font-weight: 400;
              margin-top: 25px;
            `}
          >
            글 검색 결과 {searchResultPostsNum}건
          </div>
          {testSearchDummy.map((post, index) => (
            <SearchPostBox
              key={index}
              nickName={post.name}
              title={post.title}
              category={post.category}
              commentNum={post.commentNum}
              heartNum={post.heartNum}
              scrapNum={post.scrapNum}
              date={post.date}
            />
          ))}
        </div>
      )}
      {/* 레코더 탭 */}
      {selectedTab === "recorder" && (
        <div>
          <div
            css={css`
              color: #717171;
              font-size: 14px;
              font-weight: 400;
              margin-top: 25px;
            `}
          >
            계정 검색 결과 {searchResultRecorderssNum}건
          </div>
          <div
            css={css`
            display: flex;
            flex-wrap: wrap;
            width: 85%;
            gap: 15px;
        `}
          >
          {testSearchRecodersDummy.map((recoder, index) => (
            <SearchRecoderBox
              key={index}
              nickName={recoder.name}
              category={recoder.category}
              introduce = {recoder.introduce}
              followerNum={recoder.followerNum}
              profileImg={recoder.profileImg}
            />
          ))}
          </div>
        </div>
      )}
    </div>
  );
}
