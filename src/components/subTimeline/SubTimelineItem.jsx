/** @jsxImportSource @emotion/react */

import React, {useEffect, useState} from "react";
import {css} from "@emotion/react";
import {FiLock, FiUnlock} from "react-icons/fi";
import AlertDialog from "../common/AlertDialog";
import dayjs from "dayjs";
import axiosInstance from "../../utils/axiosInstance";

function SubTimelineItem({subTimelineId, startDate, endDate, title, done, isPublic, onClick, showLine}) {
  const [isDone, setIsDone] = useState(done); // 진행중 체크

  // 진행중 (isDone) 연동
  const onClickIsDone = async () => {
    if (isDone) {
      // 체크 해제 연동
      try {
        const response = await axiosInstance.put(`/api/v1/sub-timelines/${subTimelineId}/toggle-done`);
        setIsDone(false);
        console.log("진행중 체크 해제 완료", response);
      } catch (error) {
        console.log("진행중 체크 해제 오류", error);
        console.error("에러 상세:", error.response ? error.response.data : error.message);
      }
    } else {
      // 체크 연동
      try {
        const response = await axiosInstance.put(`/api/v1/sub-timelines/${subTimelineId}/toggle-done`);
        setIsDone(true);
        console.log("진행중 체크 완료", response)
      } catch (error) {
        console.log("진행중 체크 오류", error);
        console.error("에러 상세:", error.response ? error.response.data : error.message);
      }
    }
  }

  // 진행중 (isDone) 상태 연동
  const isDoneStatus =  () => {
    if (done) { // 상위 컴포넌트에서 서브 타임라인 조회할때 알아내서 그냥 props로 가져옴 (연동코드 굳이 또 쓰지 않음)
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

  return (
    <div // 회색 타임라인 박스
      css={css({
        position: "relative",
        width: "310px",
        height: "100px",
        background: "#f8f6f6",
        borderRadius: "50px",
        boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.04)",
        textAlign: "center",
        margin: "0 auto", /* 페이지 중앙에 나타나도록 설정 */
        marginTop: "45px",
        marginBottom: "32px",
        display: "flex",
      })}
    >
      <div // 체크 표시
        onClick={onClickIsDone}
        css={css`
            width: 21px; // 21px
            height: 21px; // 21px
            border-radius: 50%;
            border: 3px solid #829FD7;
            float: left;
            display: inline-block;
            margin-top: 40px;
            margin-left: 30px;
            margin-right: 15px;
            cursor: pointer;
            background-color: ${isDone ? "#829FD7" : "#f8f6f6"}; // 선 때문에 뚫린 원일 때도 배경 색 설정
        `}
      />
      <div
        css={css({
          flex: 1,
          // border: "1px solid #829FD7",
        })}
      >
        <div // 기간
          css={css({
            color: "#666",
            fontSize: "15px",
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "normal",
            textAlign: "left",
            marginTop: "25px",
            // border: "1px solid #829FD7",
          })}
        >
          {dayjs(startDate).format('YYYY.MM.DD')} ~ {endDate ? dayjs(endDate).format('YYYY.MM.DD') : '진행중'}
        </div>
        <div // 서브 타임라인 제목
          onClick={onClick}
          css={css({
            color: "#212121",
            fontSize: "15px",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "normal",
            textAlign: "left",
            marginTop: "10px",
            cursor: "pointer",
            // border: "1px solid #829FD7",
          })}
        >
          {title}
        </div>
      </div>
      <div // 공개 여부 (자물쇠 아이콘)
        css={css({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "10px",
          marginRight: "25px",
          // border: "1px solid black",
        })}
      >
        {isPublic ? <FiUnlock/> : <FiLock/>}
      </div>
      {showLine && (
        <div
          css={css({
            position: "absolute",
            top: "61px", // 아이템 바로 아래에서 시작
            left: "12.7%", // 체크 표시 중앙에 위치
            width: "2px",
            height: "124px", // 다음 아이템과의 간격 맞춤
            backgroundColor: "#E2E2E2",
            zIndex: 1,
          })}
        />
      )}
    </div>
  );
}

export default SubTimelineItem;