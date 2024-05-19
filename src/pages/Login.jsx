/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import recodeTimelineLogo from "../assets/images/recodeTimelineLogo.svg";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import KaKaoIcon from "../assets/images/kakaoLoginIcon.svg";
import Button from "../components/common/Button";
import { TextField } from "@mui/material/";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState(""); // 이메일
  const [password, setPassword] = useState(""); // 비밀번호

  const [loginError, setLoginError] = useState(false);

  // 이메일 입력
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  // 비밀번호 입력
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // 로그인 성공 스낵바 (알림창)
  const [openLoginSnackbar, setOpenLoginSnackbar] = useState(false);
  const handleCloseLoginSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenLoginSnackbar(false);
  };

  // 로그인
  const login = async () => {
    if (email.trim() === "") {
      setLoginError("이메일을 입력하세요.");
      return;
    }
    if (password.trim() === "") {
      setLoginError("비밀번호를 입력하세요.");
      return;
    }

    // 로그인 연동
    try {
      const response = await axios.post(
        `/api/v1/auth/app-login`,
        { email: email, password: password },
        {
          headers: {
            Accept: "*/*",
            "Content-Type": `application/json`,
          },
        }
      );
      console.log("로그인", response);
      // 로그인 성공
      if (response.data.code === "SU") {
        setOpenLoginSnackbar(true);
        console.log(openLoginSnackbar)
        localStorage.setItem("token", response.data.token); // 로컬스토리지에 token 저장
        navigate("/");
      }
      // 로그인 실패
      else {
        setLoginError(response.data.message + " 다시 시도해주세요.");
      }
      // 에러 시
    } catch (error) {
      setLoginError("로그인에 실패했습니다. 다시 시도해주세요. ");
      console.error(error);
    }
  };

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
        <TextField
          onChange={handleEmailChange}
          required
          fullWidth
          type="email"
          id="email"
          name="email"
          label="이메일"
          value={email}
          InputProps={{
            style: {
              borderRadius: "15px",
              marginBottom: "20px",
            },
          }}
        />
        <TextField
          onChange={handlePasswordChange}
          required
          autoFocus
          fullWidth
          type="password"
          id="password"
          name="password"
          value={password}
          label="비밀번호"
          InputProps={{
            style: {
              borderRadius: "15px",
              marginBottom: "5px",
            },
          }}
        />

        <Button margin="10px 0px 10px 0px" height="45px" onClick={login}>
          로그인
        </Button>
        {loginError && (
          <div
            css={css({
              color: "#f44336",
              fontSize: "15px",
            })}
          >
            {loginError}
          </div>
        )}
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
            이메일 찾기
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
      {/* 로그인 성공 시 뜨는 스낵바 */}
      <Snackbar open={openLoginSnackbar} autoHideDuration={4000} onClose={handleCloseLoginSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert
          onClose={handleCloseLoginSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          인증번호가 정상 발송되었습니다. 이메일을 확인해주세요
        </Alert>
      </Snackbar>
    </div>
  );
}
