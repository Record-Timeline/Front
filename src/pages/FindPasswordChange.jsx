/** @jsxImportSource @emotion/react */

import React, { useState, useEffect, useCallback } from "react";
import { css } from "@emotion/react";
import Button from "../components/common/Button";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Grid, TextField } from "@mui/material/";
import { useSelector } from "react-redux";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function FindPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState(""); // 입력한 비밀번호
  const [passwordCheck, setPasswordCheck] = useState(""); // 입력한 비밀번호 확인
  const [passwordError, setPasswordError] = useState(false); // 비밀번호 유효성 검사 에러 상태
  const [passwordCheckError, setPasswordCheckError] = useState(false); // 비밀번호 확인 에러 상태
  const [isChangeButtonEnabled, setIsChangeButtonEnabled] = useState(false); // 비밀번호 변경 버튼 활성화 상태

  const email = useSelector((state) => state.email); // Redux에서 이메일 가져오기

  // 비밀번호 유효성 검사 함수
  const validatePassword = (password) => {
    const containsNumber = /[0-9]/.test(password);
    const containsLetter = /[a-zA-Z]/.test(password);
    const isLengthValid = password.length >= 8;

    if (!(containsNumber && containsLetter && isLengthValid)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  // 비밀번호 입력 시 유효성 검사
  const handlePasswordChange = useCallback((e) => {
    const password = e.target.value;
    setPassword(password);
    validatePassword(password);
  }, []);

  // 비밀번호 확인 입력 시 유효성 검사
  const handlePasswordCheckChange = useCallback(
    (e) => {
      const passwordCheck = e.target.value;
      setPasswordCheck(passwordCheck);
      setPasswordCheckError(passwordCheck !== password);
    },
    [password]
  );

  // 비밀번호 변경 버튼 활성화 상태 업데이트
  useEffect(() => {
    setIsChangeButtonEnabled(
      !passwordError &&
      !passwordCheckError &&
      password.length > 0 &&
      passwordCheck.length > 0
    );
  }, [passwordError, passwordCheckError, password, passwordCheck]);

  // 비밀번호 변경 요청 함수
  const handleFindPassword = async () => {
    if (isChangeButtonEnabled) {
      try {
        const response = await axios.post("/api/v1/password/reset", {
          email,
          newPassword: password,
        });

        if (response.status === 200) {
          navigate("/find/complete")
        }
      } catch (error) {
        alert("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
        console.error(error);
      }
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
          padding: 0px 15% 20px 25%;
        `}
      >
        비밀번호 재설정
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
          white-space: pre-line;
          color: #272727;
          text-align: center;
          font-size: 20px;
          font-weight: 400;
          line-height: 150%;
          margin-top: 30px;
        `}
      >
        비밀번호를 변경해주세요. {"\n"}
        다른 아이디나 사이트에서 사용한 적 없는 안전한 비밀번호로 변경해주세요.
      </div>
      <div
        css={css`
          width: 440px;
          color: #707070;
          font-size: 20px;
          font-weight: 400;
          display: flex;
          align-items: center;
          margin-top: 20px;
        `}
      >
        <PersonOutlineOutlinedIcon /> {email}
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
        <div
          css={css`
            display: flex;
            justify-content: center;
            flex-direction: column;
          `}
        >
          <div css={css`
              margin-bottom: 10px;
          `}>
          <TextField
            value={password}
            onChange={handlePasswordChange}
            type="password"
            id="password"
            name="password"
            label="비밀번호"
            InputProps={{
              style: {
                borderRadius: "15px",
                width: "450px",
                fontFamily: "Pretendard",
                marginBottom: "5px",
              },
            }}
            error={passwordError}
            helperText={
              passwordError
                ? "숫자와 영문자를 포함한 8자리 이상의 비밀번호를 입력하세요."
                : ""
            }
          />
          </div>
          <TextField
            value={passwordCheck}
            onChange={handlePasswordCheckChange}
            type="password"
            id="passwordCheck"
            name="passwordCheck"
            label="비밀번호 확인"
            InputProps={{
              style: {
                borderRadius: "15px",
                width: "450px",
                fontFamily: "Pretendard",
              },
            }}
            error={passwordCheckError}
            helperText={
              passwordCheckError ? "비밀번호가 일치하지 않습니다." : ""
            }
          />
        </div>
      </Grid>

      <div
        css={css`
          border-radius: 20px;
          background: ${isChangeButtonEnabled ? "#829FD7" : "#d9d9d9"};
          color: #FFF;
          padding: 12px 175px;
          font-size: 18px;
          font-weight: 500;
          cursor: ${isChangeButtonEnabled ? "pointer" : "not-allowed"};
          margin-bottom: 2%;
        `}
        onClick={handleFindPassword}
      >
        비밀번호 변경
      </div>
    </div>
  );
}
