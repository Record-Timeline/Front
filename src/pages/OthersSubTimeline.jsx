/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import { css } from "@emotion/react";
import Profile from "../components/common/Profile";
import OthersSubTimelinePost from "../components/othersTimeline/OthersSubTimelinePost";
import OthersSubTimelineItem from "../components/othersTimeline/OthersSubTimelineItem";
import SubTimelineItem from "../components/subTimeline/SubTimelineItem";

export default function OthersSubTimeline() {
    const [isDone, setIsDone] = useState(false);

    return (
        <div
            css={css({
               marginBottom: "150px",
            })}
        >
            <Profile />
            <div // 포스팅 박스 전체
                css={css({
                    width: "760px",
                    height: "720px",
                    // height: "100%",
                    borderRadius: "30px",
                    background: "#FFF",
                    margin: "0px 0px 0px 355px",
                    padding: "10px",
                    float: "left",
                    display: "inline-block", // 서브 타임라인과 나란히 두기 위함
                    border: "3px solid #f8f6f6",
                })}
            >
                <OthersSubTimelinePost isDone={true}/>
            </div>
            <div // 서브 타임라인 박스
                css={css({
                    marginTop: "50px",
                    marginBottom: "70px",
                    marginLeft: "45px",
                    display: "inline-block", // 포스팅과 나란히 두기 위함 (div 두 개 나란히 두기)
                    // border: "1px solid black",
                })}
            >
                <div // 서브 타임라인 제목
                    css={css({
                        width: "280px",
                        textAlign: "center",
                        margin: "0 auto", // 가운데 정렬을 하기 위함
                        // overflow: "hidden",
                        // border: "4px solid #f8f6f6",
                    })}
                >
                    <h1>졸업 프로젝트 캡스톤 - 레코드 타임라인</h1>
                </div>
                <OthersSubTimelineItem/>
                <OthersSubTimelineItem/>
                <OthersSubTimelineItem/>
            </div>
        </div>
    )
}