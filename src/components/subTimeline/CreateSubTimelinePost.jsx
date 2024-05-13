/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import { css } from "@emotion/react";
import SubTimelineInput from "./SubTimelineInput";
import PostEditor from "../post/PostEditor"
import Button from "../common/Button";

export default function CreateSubTimelinePost({ onCancel, onSubmit }) {
    return (
        <div>
            <SubTimelineInput />
            <PostEditor />
            <div
                css={css({
                    textAlign: "center",
                    marginTop: "75px",
                    marginBottom: "50px",
                    // border: "1px solid #f8f6f6",
                })}
            >
                <Button
                    onClick = {() => onCancel()}
                    width="100px"
                    height="25px"
                    margin="0px 20px"
                    backgroundColor="#FFF"
                    textColor="#646464"
                    fontSize="15px"
                    border="2px solid #959595"
                    borderRadius="50px"
                    display="inline-block"
                    lineHeight="25px"
                >
                    취소하기
                </Button>
                <Button
                    onClick = {() => onSubmit()}
                    width="100px"
                    height="25px"
                    margin="0px 20px"
                    backgroundColor="#FFF"
                    textColor="#7286AD"
                    fontSize="15px"
                    border="2px solid #829FD7"
                    borderRadius="50px"
                    display="inline-block"
                    lineHeight="25px"
                >
                    저장하기
                </Button>
            </div>
        </div>
    )
}