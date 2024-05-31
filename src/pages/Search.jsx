/** @jsxImportSource @emotion/react */

import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import SearchIcon from "@mui/icons-material/Search";
import ProfileInfo from "../components/main/ProfileInfo";
import testProfileImg from "../assets/images/testProfileImg.png";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import {CircularProgress} from "@mui/material";
export default function Search() {
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색어 상태
  const navigate = useNavigate();
  const [interest, setInterest] = useState(null); // 연동에 사용할 영문 관심분야
  const [recorderData, setRecorderData] = useState(null);

  // default 관심 분야 가져오기
  const fetchInterest = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/my-profile");
      setInterest(response.data.interest);
    } catch (error) {
      console.error(error);
    }
  };

  // 추천 레코더 데이터 연동
  const fetchRecorderData = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/main/member/${interest}`);
      setRecorderData(response.data);
      console.log("추천 레코더", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInterest();
  }, []);

  // 관심분야를 불러온 후, 사용자의 관심 분야에 따른 RecordData를 가져옴
  useEffect(() => {
    if (interest) {
      fetchRecorderData();
    }
  }, [interest]);

  // 검색 아이콘
  const handleSearch = () => {
    navigate(`/search/result?keyword=${searchKeyword}`);
  };

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
              width: 680px;
              padding: 10px 20px;
              &::placeholder {
                color: #cecece;
              }
            `}
            placeholder="검색어를 입력해주세요"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          ></input>
          <SearchIcon
            style={{
              fontSize: "34px",
              cursor: "pointer",
              color: "#525252",
            }}
            onClick={handleSearch}
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
          {recorderData ? (
            recorderData.map((user, index) => (
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
                  profileImgSrc={user.profileImageUrl || testProfileImg}
                  nickName={user.nickname}
                  introduce={user.introduction}
                  followers={user.followers || 300}
                />
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                    margin-top: 20px;
                  `}
                ></div>
              </div>
            ))
          ) : (
            <div
              css={css`
                  color: #829FD7;
                  margin-top: 40px;
              `}
            >
            <CircularProgress  color="inherit"/>
            </div>
            )}
        </div>
      </div>
    </div>
  );
}
