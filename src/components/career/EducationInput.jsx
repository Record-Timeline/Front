/** @jsxImportSource @emotion/react */

import * as React from 'react';
import {useEffect, useState} from "react";
import {css} from "@emotion/react";
import {FaRegTrashAlt} from "react-icons/fa";
import dayjs from 'dayjs';
import DatePickerValue from "../common/DatePickerValue";
import Input from "@mui/material/Input";
import {FaRegCircleCheck} from "react-icons/fa6";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function EducationInput({index, initialData, saveItem, createEducation, updateEducation, onDelete }) {
  const [degree, setDegree] = useState(""); // 학위 (초기값 null로 설정하면 오류남, " "로 설정해도 오류 남)
  const [institutionName, setInstitutionName] = useState(null); // 학교이름
  const [major, setMajor] = useState(null); // 전공
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    setDegree(initialData.degree);
    setStartDate(initialData.startDate ? dayjs(initialData.startDate) : null);
    setEndDate(initialData.endDate ? dayjs(initialData.endDate) : null);
    setInstitutionName(initialData.institutionName);
    setMajor(initialData.major);
  }, [initialData]);

  // 학위 Select Box
  const handleChange = (event) => {
    setDegree(event.target.value);
  };

  const handleSave = async () => {
    // alert dialog 추가해야 함
    const data = {
      degree,
      startDate: dayjs(startDate).format("YYYY-MM-DD"),
      endDate: endDate ? dayjs(endDate).format("YYYY-MM-DD") : null,
      institutionName,
      major
    };

    if (initialData.id) {
      await updateEducation(index, data); // 기존 항목 업데이트 (생성)
    } else {
      createEducation(data); // 새 항목 생성 (조회)
    }

    saveItem(index, data);
  };

  return (
    <div // 회색 박스
      css={css({
        width: "530px",
        height: "250px",
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
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120, marginLeft: "0px" }} size="small">
          <InputLabel id="demo-simple-select-standard-label">학위</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={degree || ""} // (초기값 null로 설정하면 오류남, " "로 설정해도 오류 남)
            onChange={handleChange}
            label="학위"
          >
            <MenuItem value={"학사"}>학사</MenuItem> {/* 학위 종류 추가, 전문학사 */}
            <MenuItem value={"석사"}>석사</MenuItem>
            <MenuItem value={"박사"}>박사</MenuItem>
            <MenuItem value={"명예박사"}>명예박사</MenuItem>
          </Select>
        </FormControl>
        <div // 학교/기관 이름
          css={css({
            fontSize: "15px",
            color: "#212121",
            textAlign: "left",
            marginTop: "8px",
            // border: "1px solid black",
          })}
        >
          <Input
            sx={{
              width: '300px', // 전체 TextField의 너비를 설정
            }}
            placeholder="학교/기관 이름을 입력하세요."
            value={institutionName}
            onChange={(e) => setInstitutionName(e.target.value)}
            inputProps={{
              'aria-label': 'title input',
              style: {fontSize: '16px', fontFamily: "Pretendard"}
            }}
          />
        </div>
        <div // 전공
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
              width: '300px', // 전체 TextField의 너비를 설정
            }}
            placeholder="전공을 입력하세요."
            value={major}
            onChange={(e) => setMajor(e.target.value)}
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
            label="입학년월"
            format="YYYY년 MM월"
            value={startDate}
            onChange={setStartDate}
            css={css({width: "150px",})}
          />
          <p css={css({margin: "7px", lineHeight: "55px"})}>~</p>
          <DatePickerValue
            views={['year', 'month']}
            label="졸업년월"
            format="YYYY년 MM월"
            value={endDate}
            onChange={setEndDate}
            actionBar={true}
            css={css({width: "150px",})}
          />
        </div>
      </div>
      <div // 완료하기 버튼 (생성, 수정)
        onClick={handleSave}
        css={css({
          color: "#829FD7",
          display: "flex", // 내부 요소를 정렬하기 위한 flex 설정
          alignItems: "center", // 수직 중앙 정렬
          marginLeft: "115px",
          cursor: "pointer",
        })}
      >
        <FaRegCircleCheck/>
      </div>
      <div // 삭제하기 버튼
        onClick={onDelete}
        css={css({
          color: "#E89494",
          display: "flex", // 내부 요소를 정렬하기 위한 flex 설정
          alignItems: "center", // 수직 중앙 정렬
          marginLeft: "auto", // FaRegTrashAlt을 제일 오른쪽으로 배치
          marginRight: "10px",
          cursor: "pointer",
        })}
      >
        <FaRegTrashAlt/>
      </div>
    </div>
  )
}

export default EducationInput;