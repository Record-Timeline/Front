/** @jsxImportSource @emotion/react */

import React, {useState} from "react";
import {css} from "@emotion/react";
import styled from 'styled-components';
import {FiLock, FiUnlock} from "react-icons/fi";
import {GoPencil} from "react-icons/go";
import {FaRegTrashAlt} from "react-icons/fa";
import AlertDialog from "../common/AlertDialog";
import dayjs from "dayjs";

function OthersSubTimelineItem({startDate, endDate, title, isPublic, onClick, isDone}) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div // 회색 타임라인 박스
      css={css({
        width: "300px",
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
        done={isDone}
        css={css`
            width: 21px;
            height: 21px;
            border-radius: 50%;
            border: 3px solid #829FD7;
            float: left;
            display: inline-block;
            margin-top: 40px;
            margin-left: 30px;
            margin-right: 15px;
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
            fontFamily: "Pretendard",
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
            fontFamily: "Pretendard",
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
      {/*<div // 공개 여부 (자물쇠 아이콘)*/}
      {/*    css={css({*/}
      {/*        display: "flex",*/}
      {/*        alignItems: "center",*/}
      {/*        justifyContent: "center",*/}
      {/*        marginLeft: "10px",*/}
      {/*        marginRight: "40px",*/}
      {/*        // border: "1px solid black",*/}
      {/*    })}*/}
      {/*>*/}
      {/*    <FiLock/> /!* 비공개면 FiLock, 공개면 FiUnlock : 삼항 연산자*!/*/}
      {/*</div>*/}
    </div>
  );
}

export default OthersSubTimelineItem;