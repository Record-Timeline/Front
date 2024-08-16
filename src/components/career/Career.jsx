/** @jsxImportSource @emotion/react */

import React, {useState} from "react";
import {css} from "@emotion/react";
import {GoPencil} from "react-icons/go";
import {FaRegTrashAlt} from "react-icons/fa";
import dayjs from 'dayjs';

function Career ({companyName, startDate, endDate, duty, position, onEdit}) {
  return (
    <div
      css={css({
        // position: "relative",
        width: "530px",
        height: "100px",
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
          marginLeft: "13px"
        })}
      >
        <div><b>{companyName}</b></div>
        {dayjs(startDate).format('YYYY년 MM월')} ~ {endDate ? dayjs(endDate).format('YYYY년 MM월') : '진행중'}
        <div>{duty} / {position}</div>
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

export default Career;