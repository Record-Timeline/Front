/** @jsxImportSource @emotion/react */

import React from "react";
import { css } from "@emotion/react";
import { useLocation } from "react-router-dom";
import SearchPostBox from "../components/main/SearchPostBox";
export default function SearchResult() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchKeyword = queryParams.get("keyword");
  console.log(searchKeyword);

  const searchResultNum = 390;
  // 검색 결과 더미데이터
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

  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        height: 100vh;
        flex-direction: column;
        padding-left: 5%;
      `}
    >
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
          `}
        >
          글
        </div>
        <div
          css={css`
            color: #737373;
            width: 100px;
            padding: 5px;
            cursor: pointer;
          `}
        >
          레코더
        </div>
      </div>
      <div
        css={css`
          color: #717171;
          font-size: 14px;
          font-weight: 400;
          margin-top: 25px;
        `}
      >
        글 검색 결과 {searchResultNum}건
      </div>
      {testSearchDummy.map((post, index) => (
        <SearchPostBox
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
  );
}
