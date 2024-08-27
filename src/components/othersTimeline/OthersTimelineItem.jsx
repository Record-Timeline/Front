/** @jsxImportSource @emotion/react */

import * as React from "react";
import {useEffect, useState} from "react";
import {css} from "@emotion/react";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";

export default function OthersTimelineItem({memberId, mainTimelineId, startDate, endDate, title, done, showLine}) {
  const navigate = useNavigate();
  const [isDone, setIsDone] = useState(done); // 진행중 체크

  // 진행중 (isDone) 상태 연동
  const isDoneStatus =  () => {
    if (done) { // 상위 컴포넌트에서 메인 타임라인 조회할때 알아내서 그냥 props로 가져옴 (연동코드 굳이 또 쓰지 않음)
      setIsDone(true)
      console.log(isDone)
    } else {
      setIsDone(false)
      console.log(isDone)
    }
  }

  useEffect(() => {
    isDoneStatus()
  }, []);

  const handleTitleClick = () => {
    navigate(`/otherssub/${memberId}/${mainTimelineId}`);
  };

  return (
    <div
      css={css({
        position: "relative",
        width: "553px",
        margin: "0 auto",
        marginBottom: "40px",
      })}
    >
      <div
        css={css({
          position: "relative",
          height: "75px",
          background: "#f8f6f6",
          borderRadius: "30px",
          boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.04)",
          display: "flex",
          alignItems: "center",
        })}
      >
        <div // 진행중 여부 (체크 표시)
          css={css`
              width: 21px;
              height: 21px;
              border-radius: 50%;
              border: 3px solid #829FD7;
              margin-left: 40px;
              margin-right: 15px;
              background-color: ${isDone ? "#829FD7" : "#f8f6f6"}; // 선 때문에 뚫린 원일 때도 배경 색 설정
              position: relative; // 이 요소를 상대 위치로 설정
              z-index: 6;
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
            color: "#212121",
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
      {showLine && (
        <div
          css={css({
            position: "absolute",
            top: "48px", // 아이템 바로 아래에서 시작
            left: "9%", // 체크 표시 중앙에 위치
            width: "2px",
            height: "95px", // 다음 아이템과의 간격 맞춤
            backgroundColor: "#E2E2E2",
            zIndex: 5
          })}
        />
      )}
    </div>
  );
}