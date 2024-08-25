/** @jsxImportSource @emotion/react */

import * as React from 'react';
import {useEffect, useState} from "react";
import {css} from "@emotion/react";
import {GoPencil} from "react-icons/go";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import {useSelector} from "react-redux";

function Language({memberId, languageName, proficiency, onEdit}) {
  const myMemberId = useSelector(state => state.memberId); // 리덕스: 내 멤버 아이디
  const [level, setLevel] = useState(null); // 초기값 설정 안해주면 rating이 안됨 (null로라도 해줘야 함)

  const labels = {
    1: 'VeryLow',
    2: 'Low',
    3: 'Middle',
    4: 'Good',
    5: 'VeryHigh',
  };

  return (
    <div
      css={css({
        // position: "relative",
        width: "530px",
        height: "70px", // or 65px
        background: "#f8f6f6",
        borderRadius: "30px",
        boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.04)",
        margin: "0 auto", // 페이지 중앙에 나타나도록 설정
        marginTop: "15px",
        marginBottom: "20px",
        display: "flex", // 내부 요소를 정렬하기 위한 flex 설정
        alignItems: "center", // 수직 중앙 정렬
        padding: "13px"
      })}
    >
      <div
        css={css({
          display: "flex", // 수평 정렬
          marginLeft: "13px",
          // gap: "20px" // 요소 간 간격 설정
        })}
      >
        <div><b>{languageName}</b></div>
        <Box
          sx={{
            width: 200,
            display: 'flex',
            alignItems: 'center',
            marginLeft: '30px',
          }}
        >
          <Rating
            key={proficiency} // key에 proficiency 값을 사용하여 컴포넌트 강제 리렌더링 (생성, 수정 후 rating 반영 바로 안되는 문제 해결 ㅡㅡ)
            name="text-feedback"
            value={proficiency}
            readOnly
            precision={1}
            emptyIcon={<StarIcon style={{opacity: 0.55}} fontSize="inherit"/>}
          />
          <Box sx={{ml: 2}}>{labels[proficiency]}</Box>
        </Box>
      </div>
      {/*수정 버튼 조건부 렌더링*/}
      {memberId === myMemberId && (
        <div // 수정하기 버튼
          onClick={onEdit}
          css={css({
            display: "flex", // 내부 요소를 정렬하기 위한 flex 설정
            alignItems: "center", // 수직 중앙 정렬
            marginLeft: "auto", // GoPencil을 제일 오른쪽으로 배치
            marginRight: "10px",
            cursor: "pointer",
          })}
        >
          <GoPencil/>
        </div>
      )}
    </div>
  )
}

export default Language;