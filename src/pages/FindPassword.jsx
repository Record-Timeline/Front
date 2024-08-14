/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import { css } from "@emotion/react";
import { useDispatch } from 'react-redux';
import {

  Grid,
  TextField,
} from "@mui/material/";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { setEmail, setOpenFindSnackbar } from '../actions/actions';

export default function FindPassword() {
  const [email, setEmailInput] = useState(""); // 로컬 상태에서 이메일 관리
  const navigate = useNavigate(); // useNavigate 훅 사용
  const dispatch = useDispatch(); // Redux dispatch 사용
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError]= useState("")

  // 이메일 입력 값 업데이트
  const handleEmailChange = (e) => {
    setEmailInput(e.target.value);
  };

  // 비밀번호 찾기 버튼 클릭 시
  const handleFindPassword = async () => {
    setError("")
    if (email) {
      try {
        const response = await axiosInstance.post(
          `/api/v1/password/reset-email`,
          {
            email: email,
          }
        );

        if (response.data.code === "200") {
          console.log("비밀번호 찾기 ", email, ": " , response.data);
          dispatch(setEmail(email));
          dispatch(setOpenFindSnackbar(true)); // 스낵바를 열도록 상태 변경
          navigate("/find/certification");
        }
        else {
          console.log(response.data.message)
          setError(response.data.message)
        }


      } catch (error) {
        console.log("비밀번호 찾기 에러 ", error);
        setError(error.response?.data?.message || "오류가 발생했습니다. 다시 시도해주세요.");
      }

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
          padding: 0px 15% 20px 25%;
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
        비밀번호를 찾고자 하는 아이디(이메일)를 입력해주세요
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
        {error && (
          <div
            css={css({
              color: "#e1483a",
              fontSize: "15px",
              margin: "10px 0px 0px 5px",
              fontWeight: "200"
            })}
          >
            {error}
          </div>
        )}
      </Grid>

      <div
        css={css`
            border-radius: 20px;
            background: #829FD7;
            color: #FFF;
            padding: 12px 140px;
            font-size: 18px;
            font-weight: 500;
            cursor: pointer;
            margin-bottom: 10%;
        `}
        onClick={handleFindPassword}
      >
        비밀번호 찾기
      </div>

    </div>
  );
}
