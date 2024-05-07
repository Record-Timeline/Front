/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import { css } from "@emotion/react";
import styled from 'styled-components';
import { FiLock, FiUnlock } from "react-icons/fi";
import { GoPencil } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";
import AlertDialog from "../common/AlertDialog";

// const CheckCircle = styled.div` // 요거 emotion으로 수정해야되는데 조건부 스타일링 때문에 못바꿈
//     width: 22px;
//     height: 22px;
//     border-radius: 20px;
//     border: 3px solid #829FD7;
//     float: left;
//     display: inline-block;
//     margin: 35px;
//     margin-left: 45px;
//     cursor: pointer;
//     ${props =>
//       props.done &&
//       css`
//         border: 3px solid #829FD7;
//         background-color: #829FD7; /* 배경 색상을 테두리와 동일하게 적용 */
//     `}
// `;

function MainTimelineItem() {
    const [isChecked, setIsChecked] = useState(false);

    // const handleDelete = () => {
    //     // eslint-disable-next-line no-restricted-globals
    //     if (confirm("정말로 삭제하시겠습니까?")) {
    //         // 삭제 로직을 수행
    //         console.log("항목이 삭제되었습니다.");
    //     } else {
    //         // 삭제 취소
    //         console.log("삭제가 취소되었습니다.");
    //     }
    // }

    return (
        <div // 회색 타임라인 박스
            css={css({
                width: "1005px",
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
            <div // 체크표시
                done={isChecked}
                onClick={() => setIsChecked(!isChecked)}
                css={css`
                    width: 22px;
                    height: 22px;
                    border-radius: 20px;
                    border: 3px solid #829FD7;
                    float: left;
                    display: inline-block;
                    margin: 35px;
                    margin-left: 45px;
                    cursor: pointer;
                    background-color: ${isChecked ? "#829FD7" : "none"};
                `}
            />
            {/*<CheckCircle // 체크표시*/}
            {/*    done={isChecked}*/}
            {/*    onClick={() => setIsChecked(!isChecked)}*/}
            {/*/>*/}
            <div // 기간
                css={css({
                    // flex: "1.5",
                    width: "420px",
                    color: "#666",
                    fontFamily: "Pretendard",
                    fontSize: "20px",
                    fontStyle: "normal",
                    fontWeight: "500",
                    lineHeight: "94px",
                    //float: left;
                    textAlign: "left", // center로 할 지 고민
                    marginRight: "15px",
                    display: "inline-block",
                    // border: "1px solid black",
                })}
            >
                2024.01.16 ~ 2024.04.02
            </div>
            <div // 공개 여부 (자물쇠 아이콘)
                css={css({
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: "30px",
                    marginRight: "15px",
                    // border: "1px solid black",
                })}
            >
                <FiLock/>
            </div>
            <div // 타임라인 제목
                css={css({
                    flex: "1",
                    fontSize: "17px",
                    //font-weight: 550;
                    color: "#212121",
                    //float: left;
                    textAlign: "left",
                    lineHeight: "94px",
                    marginLeft: "23px",
                    display: "inline-block",
                    // border: "1px solid black",
                })}
            >
                졸업 프로젝트 - 캡스톤
            </div>
            <div // 수정하기 (연필 아이콘)
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
                <GoPencil/>
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
                <AlertDialog icon={<FaRegTrashAlt />} />
            </div>
        </div>
    );
}

export default MainTimelineItem;