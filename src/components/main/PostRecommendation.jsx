/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import { css } from "@emotion/react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'; // Import the useSelector hook

export default function PostRecommendation({ postData }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(0); // 페이지 번호 상태
  const myMemberId = useSelector(state => state.memberId);

  // content에서 이미지 추출하는 함수
  const extractImage = (content) => {
    const imgTagMatch = content.match(/<img[^>]+src="([^">]+)"/);
    return imgTagMatch ? imgTagMatch[1] : null;
  };

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

  if (!postData || postData.length === 0) {
    return (
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
        추천 게시물이 없습니다.
      </div>
    );
  }

  // 다음 페이지로 이동하는 함수
  const nextPage = () => {
    setPage(Math.min(page + 1, Math.ceil(postData.length / 4) - 1));
  };

  // 이전 페이지로 이동하는 함수
  const prevPage = () => {
    setPage(Math.max(page - 1, 0));
  };

  // 게시물 클릭 시 페이지 이동
  const onClickPost = (memberId, maintimelineId, subtimelineId) => {
    if (memberId === myMemberId) {
      navigate(`/subtimeline/${maintimelineId}?subtimelineId=${subtimelineId}`);
    } else {
      navigate(`/otherssub/${memberId}/${maintimelineId}?subtimelineId=${subtimelineId}`);
    }
  };

  return (
    <div
      css={css`
          display: flex;
          align-items: center;
          flex-direction: column;
          margin: 30px 60px 50px -70px;
          
      `}
    >
      <div
        css={css`
            display: flex;
            align-items: center;
            width: 90%;
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
          {postData.slice(page * 4, page * 4 + 4).map((post, index) => (
            <div
              key={index}
              css={css`
                  width: 220px;
                  padding: 20px 25px;
                  border-right: ${index === 3 ? "none" : "1px solid #c4c4c4"};
                  position: relative;
                  cursor: pointer;
              `}
              onClick={() => onClickPost(post.authorId, post.mainTimelineId, post.id)}
            >
              <div
                css={css`
                    width: 170px;
                    word-break: keep-all;
                    font-size: 19px;
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
                    margin: 12px 0px 25px 0px;
                `}
              >
                {interestMapping[post.authorInterest]}
              </div>
              {extractImage(post.content) && (
                <img
                  src={extractImage(post.content)}
                  alt={post.title}
                  css={css`
                      width: 100%;
                      margin-bottom: 20px;
                  `}
                />
              )}
              <div
                css={css`
                    font-size: 16px;
                    font-weight: 400;
                    position: absolute;
                    bottom: 15px;
                    right: 20px;
                   
                `}
              >by {post.authorNickname}</div>
            </div>
          ))}
        </div>

        <ChevronRightIcon
          style={{
            fontSize: "35px",
            marginLeft: "10px",
            color: page === Math.ceil(postData.length / 4) - 1 ? "#c4c4c4" : "#696969",
            cursor:
              page === Math.ceil(postData.length / 4) - 1 ? "not-allowed" : "pointer",
          }}
          onClick={nextPage}
        />
      </div>
      <div
        css={css`
            display: flex;
            margin-top: 20px;
            justify-content: center;
            margin-left: 60px;
        `}
      >
        {/* 페이지 인덱스 원 */}
        {Array.from({ length: Math.ceil(postData.length / 4) }).map((_, index) => (
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