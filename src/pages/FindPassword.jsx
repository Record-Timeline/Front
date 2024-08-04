/** @jsxImportSource @emotion/react */

import React, { useState } from "react";

import { css } from "@emotion/react";

export default function FindPassword() {


  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        height: 100vh;
        font-size: 18px;
        color: #272727;
      `}
    >
비밀번호 찾기
    </div>
  );
}
