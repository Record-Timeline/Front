/** @jsxImportSource @emotion/react */

import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { useLocation } from "react-router-dom";
import SearchPostBox from "../components/main/SearchPostBox";
import SearchRecoderBox from "../components/main/SearchRecoderBox";
import testProfileImg from "../assets/images/testProfileImg.png";
import Header from "../components/common/Header";
import axiosInstance from "../utils/axiosInstance";
import { CircularProgress } from "@mui/material";

export default function SearchResult() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchKeyword = queryParams.get("keyword");
  const [selectedTab, setSelectedTab] = useState("posts"); // 검색 결과 글, 레코더 탭 선택
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchResultPostsNum = searchResult?.subTimelines?.length || 0;
  const searchResultRecordersNum = searchResult?.members?.length || 0;

  const interestMapping = {
    "Marketing_Promotion": "마케팅/홍보/조사",
    "Accounting_Tax_Finance": "회계/세무/재무",
    "GeneralAffairs_LegalAffairs_Affairs": "총무/법무/사무",
    "IT_Data": "IT개발/데이터",
    "Design": "디자인",
    "Service": "서비스",
    "Construction_Architecture": "건설/건축",
    "MedicalCare": "의료",
    "Education": "교육",
    "Media_Culture_Sports": "미디어/문화/스포츠",
  };

  // 검색 결과
  const fetchSearchResults = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/api/v1/search/keyword`, {
        params: { keyword: searchKeyword },
      });
      setSearchResult(response.data);
      console.log("검색 결과", response.data);
    } catch (error) {
      setError("검색 결과를 불러오지 못헀습니다.");
      console.error("검색 결과 연동", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchKeyword) {
      fetchSearchResults();
    }
  }, [searchKeyword]);

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
              width: 100px;
              padding: 5px;
              cursor: pointer;
              border-bottom: ${selectedTab === "posts" ? "4px solid #829fd7" : "none"};
              color: ${selectedTab === "posts" ? "#607fb9" : "#737373"};
          `}
          onClick={() => setSelectedTab("posts")}
        >
          글
        </div>
        <div
          css={css`
              width: 100px;
              padding: 5px;
              cursor: pointer;
              border-bottom: ${selectedTab === "recorder" ? "4px solid #829fd7" : "none"};
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
      <div
        css={css`
          flex: 1;
          overflow: auto;
        `}
      >
        {/* 로딩중일 때 */}
        {loading ? (
          <div
            css={css`
              color: #829FD7;
              margin-top: 40px;
              display: flex;
              justify-content: center;
            `}
          >
            <CircularProgress color="inherit" />
          </div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <>
            {selectedTab === "posts" && (
              <div
                css={css`
                  padding-bottom: 50px;
                `}
              >
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
                {searchResultPostsNum === 0 && (
                  <div
                    css={css`
                      color: #393939;
                      font-size: 17px;
                      font-weight: 400;
                      margin-top: 20px;
                    `}
                  >
                    글 검색 결과가 없습니다.
                  </div>
                )}
                {searchResult?.subTimelines?.map((post, index) => (
                  <SearchPostBox
                    key={index}
                    nickName={post.authorNickname}
                    title={post.title}
                    category={interestMapping[post.authorInterest]}
                    commentNum={20}
                    heartNum={15}
                    scrapNum={30}
                    startDate={post.startDate}
                    endDate={post.endDate}
                    maintimelineId={post.mainTimelineId}
                    memeberId={post.authorId}
                  />
                ))}
              </div>
            )}
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
                  계정 검색 결과 {searchResultRecordersNum}건
                </div>
                {searchResultRecordersNum === 0 && (
                  <div
                    css={css`
                      color: #393939;
                      font-size: 17px;
                      font-weight: 400;
                      margin-top: 20px;
                    `}
                  >
                    레코더 검색 결과가 없습니다.
                  </div>
                )}
                <div
                  css={css`
                    display: flex;
                    flex-wrap: wrap;
                    width: 85%;
                    gap: 15px;
                  `}
                >
                  {searchResult?.members?.map((recoder, index) => (
                    <SearchRecoderBox
                      key={index}
                      nickName={recoder.nickname}
                      category={interestMapping[recoder.interest]}
                      introduce={recoder.introduction}
                      followerNum={20}
                      profileImg={recoder.profileImageUrl || testProfileImg}
                      memberId={recoder.memberId}

                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
