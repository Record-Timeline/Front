/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import { css } from "@emotion/react";
import styled from 'styled-components';
import { FiLock, FiUnlock } from "react-icons/fi";
import { GoPencil } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";

const MainTimelineItem = styled.div`
    width: 800px;
    height: 94px;
    background: #f8f6f6;
    border-radius: 30px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
    text-align: center;
    margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */
    margin-top: 45px;
    margin-bottom: 32px;
    
    display: flex;
    //flex-direction: column;
`;

const CheckCircle = styled.div`
    width: 22px;
    height: 22px;
    border-radius: 20px;
    border: 3px solid #829FD7;
    float: left;
    display: inline-block;
    margin: 35px;
    margin-left: 45px;
    //align-items: center;
    //justify-content: center;
    //margin-right: 20px;
    cursor: pointer;
    ${props => 
      props.done && 
      css`
        border: 3px solid #829FD7;
        background-color: #829FD7; /* 배경 색상을 테두리와 동일하게 적용 */
    `}
`;

const Text = styled.div`
    flex: 1;
    font-size: 17px;
    //font-weight: 550;
    color: #495057;
    //float: left;
    text-align: left;
    line-height: 94px;
    //margin-right: 30px;
    display: inline-block;
    //border: 1px solid black;
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 25px; // 좌우 마진을 25px로 설정
    //border: 1px solid black;
`;

function MainTimeline({ children }) {
    const [isChecked, setIsChecked] = useState(false);

    return (
            <MainTimelineItem>
                {children}
                <div>
                    <CheckCircle done={isChecked} onClick={() => setIsChecked(!isChecked)}/>
                </div>
                <Text>2024.01.16 ~ 2024.04.02</Text>
                <IconWrapper>
                    <FiLock/>
                </IconWrapper>
                <Text>졸업 프로젝트 - 캡스톤</Text>
                <IconWrapper>
                    <GoPencil style={{marginRight: "12px"}}/>
                    <FaRegTrashAlt style={{color: "829FD7", marginRight: "35px"}}/>
                </IconWrapper>
                {/*<IconWrapper>*/}
                {/*    <FaRegTrashAlt/>*/}
                {/*</IconWrapper>*/}
            </MainTimelineItem>
    );
}

export default MainTimeline;