/** @jsxImportSource @emotion/react */

import React, {useState} from "react";
import {css} from "@emotion/react";
import {GoPencil} from "react-icons/go";
import {FaRegTrashAlt} from "react-icons/fa";
import dayjs from 'dayjs';

function Education ({degree, institutionName, major, startDate, endDate, onEdit}) {
  return (
    <div
      css={css({
        // position: "relative",
        width: "530px",
        height: "65px", // or 65px
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
          gap: "20px" // 요소 간 간격 설정
        })}
      >
        {/*<div>석사</div>*/}
        <div>{degree}</div>
        {/*<div><b>성신여자대학교</b></div>*/}
        <div><b>{institutionName}</b></div>
        {/*<div>컴퓨터공학과</div>*/}
        <div>{major}</div>
        <div css={css({fontSize: "13px", display: "flex", alignItems: "center"})}>{dayjs(startDate).format('YYYY년 MM월')} ~ {endDate ? dayjs(endDate).format('YYYY년 MM월') : '진행중'}</div>
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

export default Education;