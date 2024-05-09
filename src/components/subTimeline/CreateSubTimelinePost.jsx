/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import { css } from "@emotion/react";
import SubTimelineInput from "./SubTimelineInput";
import PostEditor from "../post/PostEditor"
import SubTimelineItem from "./SubTimelineItem";
import Button from "../common/Button";

export default function CreateSubTimelinePost() {
    return (
        <div>
            <SubTimelineInput />
            <PostEditor />
            <div
                css={css({
                    textAlign: "center",
                })}
            >
                <Button
                    width="155px"
                    height="53px"
                    margin="90px 20px"
                    backgroundColor="#FFF"
                    textColor="#646464"
                    fontSize="20px"
                    border="2px solid #959595"
                    borderRadius="50px"
                    display="inline-block"
                    lineHeight="53px"
                >
                    취소하기
                </Button>
                <Button
                    width="155px"
                    height="53px"
                    margin="90px 20px"
                    backgroundColor="#FFF"
                    textColor="#7286AD"
                    fontSize="20px"
                    borderRadius="50px"
                    display="inline-block"
                    lineHeight="53px"
                >
                    저장하기
                </Button>
            </div>
        </div>
    )
}