/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import { css } from "@emotion/react";
import Header from "../components/common/Header";
import RecoderRecommendation from "../components/main/RecoderRecommendation";
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
          width: 53%;
        `}
      >
        <div
          css={css`
            font-size: 20px;
            font-weight: 500;
            margin-top: 30px;
          `}
        >
          관심 분야 / 직종
        </div>
        <div
          css={css`
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 10px;
            margin: 20px 0px 50px 0px;
          `}
        >
          {interestFields.map((interest, index) => (
            <button
              key={index}
              css={css`
                font-size: 16px;
                padding: 17px 5px;
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
      </div>
    </div>
  );
}
