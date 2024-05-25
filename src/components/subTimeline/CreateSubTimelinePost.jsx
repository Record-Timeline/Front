/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import { css } from "@emotion/react";
import SubTimelineInput from "./SubTimelineInput";
import DatePickerValue from "../common/DatePickerValue";
import CustomizedSelects from "../timeline/CustomizedSelects"
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import PostEditor from "../post/PostEditor"
import Button from "../common/Button";

const ariaLabel = { 'aria-label': 'description' };

export default function CreateSubTimelinePost({ onCancel, onSubmit }) {
  const [isChecked, setIsChecked] = useState(false);

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
                <DatePickerValue label="시작 날짜" css={css({width: "200px",})}/>
                <p css={css({margin: "7px", lineHeight: "40px"})}>~</p> {/* 물결 있는 버전 */}
                {/*<p css={css({margin: "6px", lineHeight: "60px"})} />*/} {/* 물결 없는 버전 */}
                <DatePickerValue label="종료 날짜" css={css({width: "200px",})} actionBar={true}/>
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
                <CustomizedSelects text1={" 공개"} text2={" 비공개"}/> {/* 여기 소희님한테 물어보기 text1, text2 말고 하나로 합치는 방법 */}
              </div>
            </div>
          </div>
          <PostEditor/>
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
            <Button
              onClick={() => onSubmit()}
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
          </div>
        </div>
  )
}