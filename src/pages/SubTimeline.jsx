/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import { css } from "@emotion/react";
import SubTimelineItem from "../components/subTimeline/SubTimelineItem";
import Button from "../components/common/Button";

export default function SubTimeline() {
    return (
        <div
            css={css({
                marginTop: "70px",
                marginBottom: "70px",
                // padding: "70px",
                // border: "1px solid black",
            })}
        >
            <SubTimelineItem />
            <SubTimelineItem />
            <SubTimelineItem />
            <SubTimelineItem />
            <Button
                width="460px"
                height="95px"
                margin="45px auto"
                backgroundColor="#f8f6f6"
                textColor="#717171"
                fontSize="35px"
                borderRadius= "50px"
            >
                +
            </Button>
        </div>
    )
}