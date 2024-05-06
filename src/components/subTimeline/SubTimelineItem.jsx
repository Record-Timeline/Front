/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import { css } from "@emotion/react";
import styled from 'styled-components';
import { FiLock, FiUnlock } from "react-icons/fi";
import { GoPencil } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";
import AlertDialog from "../common/AlertDialog";

const CheckCircle = styled.div` // 요거 emotion으로 수정해야되는데 조건부 스타일링 때문에 못바꿈
    width: 22px;
    height: 22px;
    border-radius: 20px;
    border: 3px solid #829FD7;
    float: left;
    display: inline-block;
    margin-top: 50px;
    margin-left: 45px;
    margin-right: 35px;
    cursor: pointer;
    ${props =>
    props.done &&
    css`
        border: 3px solid #829FD7;
        background-color: #829FD7; /* 배경 색상을 테두리와 동일하게 적용 */
    `}
`;

function MainTimelineItem() {
    const [isChecked, setIsChecked] = useState(false);

    return (

        <div // 회색 타임라인 박스
            css={css({
                width: "500px",
                height: "125px",
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
            <CheckCircle // 체크 표시
                done={isChecked}
                onClick={() => setIsChecked(!isChecked)}
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
                        fontSize: "20px",
                        fontStyle: "normal",
                        fontWeight: "500",
                        lineHeight: "normal",
                        textAlign: "left",
                        marginTop: "30px",
                        // border: "1px solid #829FD7",
                    })}
                >
                    2024-03-04 ~ 2024-10-26 {/* 시작 날짜, 종료 날짜 받아올 것 */}
                </div>
                <div // 서브 타임라인 제목
                    css={css({
                        color: "#212121",
                        fontFamily: "Pretendard",
                        fontSize: "20px",
                        fontStyle: "normal",
                        fontWeight: "600",
                        lineHeight: "normal",
                        textAlign: "left",
                        marginTop: "10px",
                        // border: "1px solid #829FD7",
                    })}
                >
                    메인 타임라인 UI 설계 및 구현 {/* 제목 받아올 것 */}
                </div>
            </div>
            <div // 공개 여부 (자물쇠 아이콘)
                css={css({
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: "10px",
                    marginRight: "40px",
                    // border: "1px solid black",
                })}
            >
                <FiLock/> {/* 비공개면 FiLock, 공개면 FiUnlock : 삼항 연산자*/}
            </div>
        </div>
    );
}

export default MainTimelineItem;