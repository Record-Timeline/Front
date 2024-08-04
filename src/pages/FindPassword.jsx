/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import { css } from "@emotion/react";
import Button from "../components/common/Button";
import {

  Grid,
  TextField,
} from "@mui/material/";
import { useNavigate } from "react-router-dom";

export default function FindPassword() {
  const [email, setEmail] = useState(""); // 입력한 이메일
  const navigate = useNavigate(); // useNavigate 훅 사용

  // 이메일 입력 값 업데이트
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // 비밀번호 찾기 버튼 클릭 시
  const handleFindPassword = () => {
    if (email) {
      navigate("/find/certification");
      // 이메일이 입력되지 않았을 때
    } else {
      alert("이메일을 입력해 주세요.");
    }
  };

  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        height: 100vh;
        color: #272727;
        font-size: 35px;
        font-weight: 700;
      `}
    >
      <div
        css={css`
          width: 100%;
          padding: 0px 25% 20px 25%;
        `}
      >
        비밀번호 찾기
      </div>
      <div
        css={css`
          width: 100%;
          height: 1px;
          background: #999999;
        `}
      ></div>
      <div
        css={css`
          color: #505050;
          font-size: 20px;
          font-weight: 400;
          margin-top: 5%;
        `}
      >
        비밀번호를 찾고자 하는 아이디를 입력해주세요
      </div>
      <Grid
        item
        xs={12}
        sm={9}
        sx={{
          fontFamily: "Pretendard",
          margin: "30px 0px 30px 0px",
        }}
      >
        <TextField
          value={email}
          onChange={handleEmailChange}
          fullWidth
          type="email"
          id="email"
          name="email"
          label="이메일"
          InputProps={{
            style: {
              borderRadius: "15px",
              width: "380px",
              fontFamily: "Pretendard",
            },
          }}
        />

      </Grid>

      <div
        css={css`
            border-radius: 20px;
            background: #829FD7;
            color: #FFF;
            padding: 10px 140px;
            font-size: 18px;
            font-weight: 500;
            cursor: pointer;
        `}
        onClick={handleFindPassword}
      >
        비밀번호 찾기
      </div>
    </div>
  );
}
