/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import recodeTimelineLogo from "../assets/images/recodeTimelineLogo.svg";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import KaKaoIcon from "../assets/images/kakaoLoginIcon.svg";
import Button from "../components/common/Button";
import {
  Container,
  CssBaseline,
  FormControl,
  Grid,
  TextField,
} from "@mui/material/";
import {styled as withStyles} from "@mui/material/styles";

export default function Login() {
  const [username, setUsername] = useState(""); // 아이디
  const [password, setPassword] = useState(""); // 비밀번호

  // 아이디 입력
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  // 비밀번호 입력
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // text field 색 바꾸기
  const StyledTextField = withStyles(TextField)({
    "& .MuiInput-underline:after": {
      borderBottomColor: "#829FD7",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        color: "#829FD7",
      },
    },

    position: "relative",
  });


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
      <div
        css={css`
          margin-top: 30px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        `}
      >
        <img
          src={recodeTimelineLogo}
          alt="레코드 타임라인"
          css={css`
            width: 270px;
            margin-bottom: 60px;
          `}
        />
        <StyledTextField
            onChange={handleUsernameChange}
            required
            autoFocus
            fullWidth
            type="id"
            id="id"
            name="id"
            label="아이디"
            InputProps={{
              style: {
                borderRadius: "15px",
                marginBottom: "20px"
              },
            }}
        />
        <StyledTextField
            onChange={handlePasswordChange}
            required
            autoFocus
            fullWidth
            type="password"
            id="password"
            name="password"
            label="비밀번호"
            InputProps={{
              style: {
                borderRadius: "15px",
                marginBottom: "5px"
              },
            }}
        />

        <Button margin="10px 0px 15px 0px" height="45px">로그인</Button>
        <div
          css={css`
            display: flex;
            margin-top: 30px;
          `}
        >
          <Link
            to="/find"
            css={css`
              text-decoration: none;
              color: #272727;
              cursor: pointer;
              border-right: 1px solid black;
              padding: 0px 20px;
            `}
          >
            아이디 찾기
          </Link>
          <Link
            to="/find"
            css={css`
              text-decoration: none;
              color: #272727;
              cursor: pointer;
              padding: 0px 20px;
            `}
          >
            비밀번호 찾기
          </Link>
        </div>
        <div
          css={css`
            display: flex;
            margin-top: 30px;
          `}
        >
          <div
            css={css`
              color: #949494;
            `}
          >
            아직 회원이 아니신가요?
          </div>
          <Link
            to="/signup"
            css={css`
              font-weight: 800;
              cursor: pointer;
              text-decoration: none;
              color: #272727;
              margin-left: 12px;
            `}
          >
            회원가입
          </Link>
        </div>
        <div
          css={css`
            margin: 60px 0px 25px 0px;
            width: 350px;
            text-align: center;
            border-bottom: 1px solid black;
            line-height: 0.1em;
            display: flex;
            justify-content: center;
          `}
        >
          <div
            css={css`
              background-color: white;
              width: fit-content;
              padding: 0px 10px;
              position: absolute;
              z-index: 1;
            `}
          >
            간편 로그인
          </div>
        </div>
        <img
          src={KaKaoIcon}
          alt="카카오 로그인"
          css={css`
            width: 65px;
            cursor: pointer;
          `}
        />
      </div>
    </div>
  );
}
