/** @jsxImportSource @emotion/react */

import React, {useState, useEffect} from "react";
import {css} from "@emotion/react";
import SubTimelineInput from "./SubTimelineInput";
import DatePickerValue from "../common/DatePickerValue";
import CustomizedSelects from "../timeline/CustomizedSelects"
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import PostEditor from "../post/PostEditor"
import Button from "../common/Button";
import AlertDialog from "../common/AlertDialog";
import dayjs from "dayjs";

const ariaLabel = {'aria-label': 'description'};

export default function CreateSubTimelinePost({post, onCancel, onSubmit}) {
  const [isChecked, setIsChecked] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [title, setTitle] = useState("");
  const [isPublic, setIsPublic] = useState(false); // 공개 여부 관리
  const [content, setContent] = useState(null); // 글 내용을 저장하는 상태
  const [alertOpen, setAlertOpen] = useState(false);

  // 수정 모드, 기존 정보 유지 (useEffect)
  useEffect(() => {
    if (post) {
      setStartDate(post.startDate);
      setEndDate(post.endDate);
      setTitle(post.title);
      setIsPublic(post.isPublic);
      setContent(post.content || ""); // 기존 글 내용도 설정
    }
  }, [post]);

  // 작성한 서브 타임라인 저장
  const handleSave = () => {
    if (!startDate || !title || !content) {
      setAlertOpen(true);
    } else {
      const newSubItem = {
        startDate: dayjs(startDate).format("YYYY-MM-DD"),
        endDate: endDate ? dayjs(endDate).format("YYYY-MM-DD") : null,
        title,
        isPublic,
        content, // 글 내용을 함께 저장
      };
      onSubmit(newSubItem);

      // 서브 타임라인 포스트 오류 해결되면 실제로도 시간 잘 저장되는지 테스트 해보고 잘 되면 아래 3줄 지우기
      console.log(newSubItem);
      console.log(newSubItem.startDate);
      console.log(newSubItem.endDate);
    }
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <div>
      {/*SubTimelineInput*/}
      <div // 회색 타임라인 박스
        css={css({
          width: "680px",
          height: "130px",
          background: "#f8f6f6",
          borderRadius: "30px",
          boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.04)",
          textAlign: "center",
          margin: "0 auto", /* 페이지 중앙에 나타나도록 설정 */
          marginTop: "20px",
          marginBottom: "32px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around", /* 공간을 고르게 분배 */
        })}
      >
        <div
          css={css({
            display: "flex",
            marginTop: "14px",
            // border: "1px solid black",
          })}
        >
          <div // 체크표시
            done={isChecked}
            onClick={() => setIsChecked(!isChecked)}
            css={css`
                width: 21px;
                height: 21px;
                border-radius: 50%;
                border: 3px solid #829FD7;
                float: left;
                display: inline-block;
                margin-top: 18px;
                margin-left: 33px;
                margin-right: 20px;
                cursor: pointer;
                background-color: ${isChecked ? "#829FD7" : "#f8f6f6"}; // 선 때문에 뚫린 원일 때도 배경 색 설정
            `}
          />
          <div // 기간
            css={css({
              // flex: "1",
              color: "#666",
              textAlign: "left",
              display: "flex",
              // border: "1px solid black",
            })}
          >
            <DatePickerValue
              label="시작 날짜"
              value={startDate} // 초기값 설정
              onChange={(date) => setStartDate(date)}
              css={css({width: "200px",})}
            />
            <p css={css({margin: "7px", lineHeight: "40px"})}>~</p> {/* 물결 있는 버전 */}
            <DatePickerValue
              label="종료 날짜"
              value={endDate} // 초기값 설정
              onChange={(date) => setEndDate(date)}
              actionBar={true}
              css={css({width: "200px",})}
            />
          </div>
        </div>
        <div
          css={css({
            display: "flex",
            // border: "1px solid black",
          })}
        >
          <div // 타임라인 제목
            css={css({
              // flex: "1",
              fontSize: "17px",
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
                  width: "475px",
                  // marginTop: "30px",
                  marginLeft: "75px",
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
                  ariaLabel,
                  style: {fontSize: '16px', fontFamily: "Pretendard"}
                }}/>
            </Box>
          </div>
          <div // 공개 여부 (자물쇠 아이콘)
            css={css({
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // border: "1px solid black",
            })}
          >
            {/*<SelectAutoWidth />*/}
            <CustomizedSelects
              onChange={(value) => setIsPublic(value === " 공개")}
              text1={" 공개"}
              text2={" 비공개"}
              value={isPublic ? "공개" : "비공개"} // 초기값 설정
            /> {/* 여기 소희님한테 물어보기 text1, text2 말고 하나로 합치는 방법 */}
          </div>
        </div>
      </div>
      {/*<PostEditor />*/}
      <PostEditor
        placeholder={"서브 타임라인에 기록될 내용을 입력해주세요."}
        setHtmlContent={setContent} // 글 내용을 관리하는 상태 추가
        htmlContent={content}/>
      <div
        css={css({
          textAlign: "center",
          marginTop: "78px",
          marginBottom: "50px",
          // border: "1px solid #f8f6f6",
        })}
      >
        <Button
          onClick={() => onCancel()}
          width="120px"
          height="40px"
          margin="0px 15px"
          backgroundColor="#FFF"
          textColor="#646464"
          fontSize="15px"
          border="2px solid #959595"
          borderRadius="50px"
          display="inline-block"
          lineHeight="18px"
        >
          취소하기
        </Button>
        <AlertDialog
          icon={
            <Button
              onClick={() => handleSave()}
              width="120px"
              height="40px"
              margin="0px 15px"
              backgroundColor="#FFF"
              textColor="#7286AD"
              fontSize="15px"
              border="2px solid #829FD7"
              borderRadius="50px"
              display="inline-block"
              lineHeight="18px"
            >
              저장하기
            </Button>
          }
          onConfirm={handleAlertClose}
          dialogTitle={"입력 오류"}
          dialogContent={"'시작 날짜'와 '제목'과 '내용'을 모두 입력해주세요."}
          confirmText={null}
          cancelText={"확인"}
          open={alertOpen}
        />
      </div>
    </div>
  )
}