/** @jsxImportSource @emotion/react */

import React, { useState, useEffect } from "react";
import {css} from "@emotion/react";
import {FiLock, FiUnlock} from "react-icons/fi";
import {FaRegTrashAlt} from "react-icons/fa";
import AlertDialog from "../common/AlertDialog";
import DatePickerValue from "../common/DatePickerValue";
import CustomizedSelects from "./CustomizedSelects"
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import {FaRegCircleCheck} from "react-icons/fa6";
import dayjs from 'dayjs';
import axios from "axios";

function MainTimelineInput({ index, saveItem, initialData, onDelete, createMainTimeline }) {
  const [isChecked, setIsChecked] = useState(false);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    setTitle(initialData.title || "");
    setStartDate(initialData.startDate ? dayjs(initialData.startDate) : null);
    setEndDate(initialData.endDate ? dayjs(initialData.endDate) : null);
  }, [initialData]);

  const handleSave = async () => {
    if (!startDate || !title) {
      setAlertOpen(true);
    } else {
      const data = { startDate, endDate, title };
      await createMainTimeline(data);
      saveItem(index, data);
    }
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <div // 회색 타임라인 박스
      css={css({
        width: "810px", // 800px
        height: "85px",
        background: "#f8f6f6",
        borderRadius: "30px",
        boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.04)",
        textAlign: "center",
        margin: "0 auto", /* 페이지 중앙에 나타나도록 설정 */
        marginTop: "45px",
        marginBottom: "32px",
        display: "flex",
      })}
    >
      <div
        css={css({
          marginLeft: "40px",
        })}
      >
        <div // 체크표시
          done={isChecked}
          onClick={() => setIsChecked(!isChecked)}
          css={css`
              width: 22px;
              height: 22px;
              border-radius: 50%;
              border: 3px solid #829FD7;
              float: left;
              display: inline-block;
              //margin: 35px;
              margin-top: 31px;
              cursor: pointer;
              background-color: ${isChecked ? "#829FD7" : "none"};
          `}
        />
      </div>
      <div // 기간
        css={css({
          // flex: "1",
          color: "#666",
          fontSize: "17px",
          marginTop: "3px",
          marginLeft: "20px",
          display: "flex", // 필수
          alignItems: "center", // 수직 가운데 정렬
          // border: "1px solid black",
        })}
      >
        <DatePickerValue
          label="시작 날짜"
          value={startDate}
          onChange={setStartDate}
          css={css({width: "150px",})}
        />
        <p css={css({margin: "7px", lineHeight: "55px"})}>~</p>
        <DatePickerValue
          label="종료 날짜"
          value={endDate}
          onChange={setEndDate}
          actionBar={true}
          css={css({width: "150px",})}
        />
      </div>
      <div // 공개 여부 (자물쇠 아이콘)
        css={css({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // margin: "0 25px", // 좌우 마진을 25px로 설정
          // border: "1px solid black",
        })}
      >
        {/*<SelectAutoWidth />*/}
        <CustomizedSelects/>
      </div>
      <div // 타임라인 제목
        css={css({
          // flex: "1",
          fontSize: "16px",
          color: "#212121",
          textAlign: "left",
          display: "inline-block",
          // border: "1px solid black",
        })}
      >
        <Box
          component="form"
          sx={{
            '& > :not(style)': {
              m: 1,
              width: "230px",
              marginTop: "26px"
            },
          }}
          noValidate
          autoComplete="off"
        >
          <Input
            placeholder="제목을 입력하세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            inputProps={{
              'aria-label': 'title input',
              style: {fontSize: '16px', fontFamily: "Pretendard"}
            }}
          />
        </Box>
      </div>
      <div // 저장 버튼 (체크 아이콘)
        onClick={handleSave}
        css={css({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // margin: "0 25px", // 좌우 마진을 25px로 설정
          cursor: "pointer",
          // border: "1px solid black",
        })}
      >
        <AlertDialog
          icon={<FaRegCircleCheck/>}
          onConfirm={handleAlertClose}
          dialogTitle={"입력 오류"}
          dialogContent={"'시작 날짜'와 '제목'을 모두 입력해주세요."}
          confirmText={null}
          cancelText={"확인"}
          open={alertOpen}
        />
      </div>
      <div // 삭제하기 (쓰레기통 아이콘)
        css={css({
          color: "#829FD7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // margin: "0 25px", // 좌우 마진을 25px로 설정
          marginRight: "45px",
          cursor: "pointer",
          // border: "1px solid black",
        })}
      >
        {/*<FaRegTrashAlt/>*/}
        <AlertDialog
          icon={<FaRegTrashAlt/>}
          onConfirm={onDelete}
          dialogTitle={"정말로 삭제하시겠습니까?"}
          dialogContent={"메인 타임라인을 삭제하면 해당 타임라인 안에 들어있는 서브 타임라인들도 모두 삭제됩니다."}
          confirmText={"삭제"}
          cancelText={"취소"}
        />
      </div>
    </div>
  );
}

export default MainTimelineInput;
