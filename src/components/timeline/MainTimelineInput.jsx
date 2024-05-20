/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import { css } from "@emotion/react";
import styled from 'styled-components';
import { FiLock, FiUnlock } from "react-icons/fi";
import { GoPencil } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";
import AlertDialog from "../common/AlertDialog";
import DatePickerValue from "../common/DatePickerValue";
import SelectAutoWidth from "./SelectAutoWidth";
import CustomizedSelects from "./CustomizedSelects"
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import { FaRegCircleCheck } from "react-icons/fa6";

const ariaLabel = { 'aria-label': 'description' };

function MainTimelineInput() {
    const [isChecked, setIsChecked] = useState(false);
    const [title, setTitle] = useState("");
    const [start, setStart] = useState("");
    const [finish, setFinish] = useState("");

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const onChangeStart = (e) => {
        setStart(e.target.value);
    }

    const onChangeFinish = (e) => {
        setFinish(e.target.value);
    }

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
                <DatePickerValue label="시작 날짜" css={css({ width: "150px", })} />
                <p css={css({margin: "7px", lineHeight: "55px"})}>~</p> {/* 물결 있는 버전 */}
                {/*<p css={css({margin: "6px", lineHeight: "60px"})} />*/} {/* 물결 없는 버전 */}
                <DatePickerValue label="종료 날짜" css={css({ width: "150px", })}/>
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
                        inputProps={{
                            ariaLabel,
                            style: { fontSize: '16px', fontFamily: "Pretendard" }
                        }}
                    />
                </Box>
            </div>
            <div // 수정완료 (체크 아이콘)
                css={css({
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    // margin: "0 25px", // 좌우 마진을 25px로 설정
                    marginLeft: "10px",
                    marginRight: "5px",
                    cursor: "pointer",
                    // border: "1px solid black",
                })}
            >
                <FaRegCircleCheck/>
            </div>
            <div // 삭제하기 (쓰레기통 아이콘)
                // onClick={handleDelete}
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
                <AlertDialog icon={<FaRegTrashAlt/>}/>
            </div>
        </div>
    );
}

export default MainTimelineInput;