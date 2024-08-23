/** @jsxImportSource @emotion/react */

import * as React from 'react';
import {useEffect, useState} from "react";
import {css} from "@emotion/react";
import {GoPencil} from "react-icons/go";
import {FaRegTrashAlt} from "react-icons/fa";
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

function Language ({languageName, proficiency, onEdit}) {
  const [level, setLevel] = useState(null); // 초기값 설정 안해주면 rating이 안됨 (null로라도 해줘야 함)

  const labels = {
    LOW: 'VeryLow',
    LOWER_MEDIUM: 'Low',
    MEDIUM: 'Middle',
    UPPER_MEDIUM: 'Good',
    HIGH: 'VeryHigh',
  };

  const convertIntoNum = (proficiency) => {
    if (proficiency === "HIGH") {
      setLevel(5);
    } else if (proficiency === "UPPER_MEDIUM") {
      setLevel(4);
    } else if (proficiency === "MEDIUM") {
      setLevel(3);
    } else if (proficiency === "LOWER_MEDIUM") {
      setLevel(2);
    } else if (proficiency === "LOW") {
      setLevel(1);
    }
  }

  useEffect(() => {
    convertIntoNum(proficiency)
  }, [])

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
            name="text-feedback"
            value={level}
            readOnly
            precision={1}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          />
          <Box sx={{ ml: 2 }}>{labels[proficiency]}</Box>
        </Box>
      </div>
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
        <GoPencil />
      </div>
    </div>
  )
}

export default Language;