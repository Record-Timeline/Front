/** @jsxImportSource @emotion/react */

import * as React from "react";
import {useState} from "react";
import {css} from "@emotion/react";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";

export default function OthersTimelineItem({memberId, mainTimelineId, startDate, endDate, title, isDone}) {
  const navigate = useNavigate();

  const handleTitleClick = () => {
    navigate(`/otherssub/${memberId}/${mainTimelineId}`, { state: { title } });
  };

  return (
    <div>
      <div
        css={css({
          width: "553px",
          height: "75px",
          background: "#f8f6f6",
          borderRadius: "30px",
          boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.04)",
          textAlign: "center",
          margin: "0 auto", /* 페이지 중앙에 나타나도록 설정 */
          marginBottom: "40px",
          display: "flex",
        })}
      >
        <div // 진행중 여부 (체크 표시)
          done={isDone}
          css={css`
              width: 21px;
              height: 21px;
              border-radius: 50%;
              border: 3px solid #829FD7;
              float: left;
              display: inline-block;
              margin-top: 27px;
              margin-left: 40px;
              margin-right: 15px;
              background-color: ${isDone ? "#829FD7" : "#f8f6f6"}; // 선 때문에 뚫린 원일 때도 배경 색 설정
              position: relative; // 이 요소를 상대 위치로 설정
              z-index: 1 // 선보다 앞에 위치하도록 z-index 설정
          `}
        />
        <div // 기간
          css={css({
            // flex: "1.5",
            width: "200px",
            color: "#666",
            fontSize: "15px",
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "75px",
            //float: left;
            textAlign: "left",
            marginLeft: "10px",
            marginRight: "15px",
            display: "inline-block",
            // border: "1px solid black",
          })}
        >
          {dayjs(startDate).format('YYYY.MM.DD')} ~ {endDate ? dayjs(endDate).format('YYYY.MM.DD') : '진행중'}
        </div>
        <div // 타임라인 제목
          onClick={handleTitleClick} // 제목 클릭시 해당 서브 타임라인으로 이동
          css={css({
            flex: "1",
            fontSize: "15px",
            // fontWeight: "550",
            color: "#212121",
            //float: left;
            textAlign: "left",
            lineHeight: "75px",
            marginLeft: "10px",
            display: "inline-block",
            cursor: "pointer",
            // border: "1px solid black",
          })}
        >
          {title}
        </div>
      </div>
    </div>
  )
}