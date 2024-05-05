/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import { css } from "@emotion/react";
import MainTimelineItem from "../components/timeline/MainTimelineItem";
import Button from "../components/common/Button";

export default function MainTimeline() {
    return (
        <div
            css={css({
                margin: "0 auto",
                marginTop: "70px",
                // border: "1px solid black"
            })}
        >
            <div
                css={css({
                    color: "#313131",
                    textAlign: "center",
                    fontFamily: "Pretendard",
                    fontSize: "36px",
                    fontStyle: "normal",
                    fontWeight: "700",
                    lineHeight: "normal",
                    margin: "0 auto",
                })}
            >
                My Timeline
            </div>
            <div
                css={css({
                    color: "#313131",
                    textAlign: "center",
                    fontFamily: "Pretendard",
                    fontSize: "20px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "normal",
                    marginTop: "13px",
                })}
            >
                <h5>내 커리어를 타임라인으로 기록해보세요</h5> {/* 폰트 적용되면 h5 태그 빼기 */}
            </div>
            <section>
                <MainTimelineItem />
                <MainTimelineItem />
                <MainTimelineItem />
                <Button
                    width="760px"
                    height="70px"
                    margin="0 auto"
                    backgroundColor="#f8f6f6"
                    textColor="#717171"
                    fontSize="35px"
                >
                    +
                </Button>
            </section>
        </div>
    );
}
