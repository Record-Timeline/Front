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

const CheckCircle = styled.div` // 요거 emotion으로 수정해야되는데 조건부 스타일링 때문에 못바꿈
    width: 22px;
    height: 22px;
    border-radius: 20px;
    border: 3px solid #829FD7;
    float: left;
    display: inline-block;
    margin-top: 36px;
    margin-left: 45px;
    margin-right: 23px;
    cursor: pointer;
    ${props =>
    props.done &&
    css`
        border: 3px solid #829FD7;
        background-color: #829FD7; /* 배경 색상을 테두리와 동일하게 적용 */
    `}
`;

function MainTimelineInput() {
    const [isChecked, setIsChecked] = useState(false);
    const [title, setTitle] = useState("");
    const [start, setStart] = useState("");
    const [finish, setFinish] = useState("");
    const [isPublic, setIsPublic] = useState(true);

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const onChangeStart = (e) => {
        setStart(e.target.value);
    }

    const onChangeFinish = (e) => {
        setFinish(e.target.value);
    }

    const onChangeIsPublic = (e) => {
        setIsPublic(e.target.value);
    }

    return (
        <div // 회색 타임라인 박스
            css={css({
                width: "1005px", // 800px
                height: "94px",
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
            <CheckCircle // 체크표시
                done={isChecked}
                onClick={() => setIsChecked(!isChecked)}
            />
            <div // 기간
                css={css({
                    // flex: "1",
                    color: "#666",
                    // width: "450px",
                    padding: "10px",
                    fontSize: "17px",
                    //float: left;
                    textAlign: "left",
                    marginRight: "10px",
                    display: "flex",
                    // border: "1px solid black",
                })}
            >
                <DatePickerValue label="시작 날짜"/>
                <p css={css({margin: "7px", lineHeight: "60px"})}>~</p> {/* 물결 있는 버전 */}
                {/*<p css={css({margin: "6px", lineHeight: "60px"})} />*/} {/* 물결 없는 버전 */}
                <DatePickerValue label="종료 날짜"/>
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
                            width: "250px",
                            marginTop: "30px"
                        },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Input placeholder="제목을 입력하세요." inputProps={ariaLabel}/>
                </Box>
            </div>
            <div // 수정완료 (체크 아이콘)
                css={css({
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    // margin: "0 25px", // 좌우 마진을 25px로 설정
                    marginLeft: "25px",
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