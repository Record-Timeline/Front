/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import { css } from "@emotion/react";
import Header from "../components/common/Header";
import RecoderRecommendation from "../components/main/RecoderRecommendation";
import PostRecommendation from "../components/main/PostRecommendation";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useSelector, useDispatch } from 'react-redux';
import {setOpenLoginSnackbar} from "../actions/actions";
export default function Main() {
  const interestFields = [
    "마케팅/홍보/조사",
    "회계/세무/재무",
    "총무/법무/사무",
    "IT개발/데이터",
    "디자인",
    "서비스",
    "건설/건축",
    "의료",
    "교육",
    "미디어/문화/스포츠",
  ];
  const [hoveredInterest, setHoveredInterest] = useState(null);
  const [selectedInterest, setSelectedInterest] = useState(null);

  const handleClick = (interest) => {
    setSelectedInterest(interest);
    console.log(interest);
  };
  const dispatch = useDispatch();
  const openLoginSnackbar = useSelector(state => state.openLoginSnackbar);


  const handleCloseLoginSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setOpenLoginSnackbar(false)); // 스낵바 false로 (redux 상태 업데이트)
  };

  return (
    <div
      css={css`
        display: flex;
        width: 100%;
        height: 100vh;
        flex-direction: column;
        align-items: center;
      `}
    >
      <Header />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          width: 100%;
          overflow-y: auto;
          max-height: calc(100vh - 80px);
          align-items: center;
        `}
      >
        <div
          css={css`
            margin: 0px 0px 0px 280px;
          `}
        >
          <div
            css={css`
              font-size: 20px;
              font-weight: 500;
              margin-top: 70px;
            `}
          >
            관심 분야 / 직종
          </div>
          <div
            css={css`
              width: 950px;
              display: grid;
              grid-template-columns: repeat(5, 1fr);
              gap: 10px;
              margin: 20px 0px 80px 0px;
            `}
          >
            {interestFields.map((interest, index) => (
              <button
                key={index}
                css={css`
                  font-size: 15px;
                  padding: 17px 0px;
                  cursor: pointer;
                  background-color: ${selectedInterest === interest
                    ? "#2c2c2c"
                    : hoveredInterest === interest
                    ? "white"
                    : "white"};

                  color: ${selectedInterest === interest
                    ? "white"
                    : hoveredInterest === interest
                    ? "black"
                    : "black"};
                  border: ${selectedInterest === interest
                    ? "none"
                    : hoveredInterest === interest
                    ? "1px solid #636363"
                    : "1px solid #bdbdbd"};
                  border-radius: 10px;
                  transition: background-color 0.3s, color 0.3s;
                `}
                onClick={() => handleClick(interest)}
                onMouseEnter={() => setHoveredInterest(interest)}
                onMouseLeave={() => setHoveredInterest(null)}
              >
                {interest}
              </button>
            ))}
          </div>
          <div
            css={css`
              font-size: 20px;
              font-weight: 500;
            `}
          >
            추천 레코더
            <RecoderRecommendation />
          </div>
          <div
            css={css`
              font-size: 20px;
              font-weight: 500;
              display: flex;
              flex-direction: column;
            `}
          >
            추천 게시물
            <PostRecommendation />
          </div>
        </div>
      </div>
      {/* 로그인 성공 시 뜨는 스낵바 */}
      <Snackbar open={openLoginSnackbar} autoHideDuration={3000} onClose={handleCloseLoginSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert
          onClose={handleCloseLoginSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          로그인이 완료되었습니다. 환영합니다 :)
        </Alert>
      </Snackbar>
    </div>
  );
}
