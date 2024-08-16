/** @jsxImportSource @emotion/react */

import * as React from 'react';
import {useState} from "react";
import {css} from "@emotion/react";
import {GoPencil} from "react-icons/go";
import {FaRegTrashAlt} from "react-icons/fa";
import dayjs from 'dayjs';
import DatePickerValue from "../common/DatePickerValue";
import Input from "@mui/material/Input";
import {FaRegCircleCheck} from "react-icons/fa6";

function CareerInput() {
  const [companyName, setCompanyName] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [duty, setDuty] = useState(null); // 직무
  const [position, setPosition] = useState(null); // 직책

  return (
    <div // 회색 박스
      css={css({
        width: "530px",
        height: "240px",
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
      <div css={css({marginLeft: "13px"})}>
        <div // 회사이름
          css={css({
            fontSize: "15px",
            color: "#212121",
            textAlign: "left",
            display: "inline-block",
            // border: "1px solid black",
          })}
        >
          <Input
            placeholder="회사 이름을 입력하세요."
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            inputProps={{
              'aria-label': 'title input',
              style: {fontSize: '16px', fontFamily: "Pretendard"}
            }}
          />
        </div>
        <div // 기간
          css={css({
            color: "#666",
            fontSize: "17px",
            display: "flex", // 필수
            alignItems: "center", // 수직 가운데 정렬
            marginTop: "7px",
            // border: "1px solid black",
          })}
        >
          <DatePickerValue
            views={['year', 'month']}
            label="시작년월"
            format="YYYY년 MM월"
            value={startDate}
            onChange={setStartDate}
            css={css({width: "150px",})}
          />
          <p css={css({margin: "7px", lineHeight: "55px"})}>~</p>
          <DatePickerValue
            views={['year', 'month']}
            label="종료년월"
            format="YYYY년 MM월"
            value={endDate}
            onChange={setEndDate}
            actionBar={true}
            css={css({width: "150px",})}
          />
        </div>
        <div // 직무
          css={css({
            width: "250px",
            fontSize: "15px",
            color: "#212121",
            textAlign: "left",
            // border: "1px solid black",
          })}
        >
          <Input
            sx={{
              width: '370px', // 전체 TextField의 너비를 설정
            }}
            placeholder="직무 이름  ex) 개발, 마케팅, Computer Engineering"
            value={duty}
            onChange={(e) => setDuty(e.target.value)}
            inputProps={{
              'aria-label': 'title input',
              style: {fontSize: '16px', fontFamily: "Pretendard"}
            }}
          />
        </div>
        <div // 직책
          css={css({
            fontSize: "15px",
            color: "#212121",
            textAlign: "left",
            marginTop: "18px",
            // border: "1px solid black",
          })}
        >
          <Input
            sx={{
              width: '370px', // 전체 TextField의 너비를 설정
            }}
            placeholder="직책 이름  ex) 팀장, 선임, 과장"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            inputProps={{
              'aria-label': 'title input',
              style: {fontSize: '16px', fontFamily: "Pretendard"}
            }}
          />
        </div>
      </div>
      <div // 완료하기 버튼 (생성, 수정)
        css={css({
          color: "#829FD7",
          display: "flex", // 내부 요소를 정렬하기 위한 flex 설정
          alignItems: "center", // 수직 중앙 정렬
          marginLeft: "70px", // GoPencil을 제일 오른쪽으로 배치
          cursor: "pointer",
        })}
      >
        <FaRegCircleCheck/>
      </div>
      <div // 삭제하기 버튼
        css={css({
          color: "#E89494",
          display: "flex", // 내부 요소를 정렬하기 위한 flex 설정
          alignItems: "center", // 수직 중앙 정렬
          marginLeft: "auto", // GoPencil을 제일 오른쪽으로 배치
          marginRight: "10px",
          cursor: "pointer",
        })}
      >
        <FaRegTrashAlt/>
      </div>
    </div>
  )
}

export default CareerInput;