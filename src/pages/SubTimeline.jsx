/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import { css } from "@emotion/react";
import CreateSubTimelinePost from "../components/subTimeline/CreateSubTimelinePost";
import ReadSubTimelinePost from "../components/subTimeline/ReadSubTimelinePost";
import SubTimelineItem from "../components/subTimeline/SubTimelineItem";
import Button from "../components/common/Button";

export default function SubTimeline() {
    return (
        <div
            css={css({
                position: "relative",
                width: "100%",
                left: "350px",
                top: "0px",
                marginTop: "50px",
                // border: "1px solid #272727",
            })}
        >
            <div // 포스팅 박스 전체
                css={css({
                    width: "1100px",
                    height: "1040px",
                    // height: "100%",
                    borderRadius: "30px",
                    background: "#FFF",
                    margin: "50px 110px",
                    padding: "10px",
                    float: "left",
                    display: "inline-block", // 서브 타임라인과 나란히 두기 위함
                    border: "4px solid #f8f6f6",
                })}
            >
                {/*<CreateSubTimelinePost />*/}
                <ReadSubTimelinePost />
            </div>
            <div // 서브 타임라인 박스
                css={css({
                    marginTop: "120px",
                    marginBottom: "70px",
                    display: "inline-block", // 포스팅과 나란히 두기 위함 (div 두 개 나란히 두기)
                    // border: "1px solid black",
                })}
            >
                <div // 서브 타임라인 제목
                    css={css({
                        width: "380px", // 350px로 고치기
                        textAlign: "center",
                        margin: "0 auto",
                        // overflow: "hidden",
                        // border: "4px solid #f8f6f6",
                    })}
                >
                    <h1>졸업 프로젝트 캡스톤 - 레코드 타임라인</h1>
                </div>
                <SubTimelineItem/>
                <SubTimelineItem/>
                <SubTimelineItem/>
                <Button
                    width="460px"
                    height="95px"
                    margin="45px auto"
                    backgroundColor="#f8f6f6"
                    textColor="#717171"
                    fontSize="35px"
                    border="none"
                    borderRadius="50px"
                >
                    +
                </Button>
            </div>
        </div>
    )
}