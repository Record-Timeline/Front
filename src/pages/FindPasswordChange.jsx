/** @jsxImportSource @emotion/react */

import React, { useState } from "react";

import { css } from "@emotion/react";
import Button from "../components/common/Button"
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import {

  Grid,
  TextField,
} from "@mui/material/";
import {useSelector} from "react-redux";
export default function FindPassword() {
  const [password, setPassword] = useState(""); // 입력한 비밀번호
  const [passwordCheck, setPasswordCheck] = useState(""); // 입력한 비밀번호 확인

  const email = useSelector(state => state.email);  // Redux에서 이메일 가져오기

  // 비밀번호 입력 값 업데이트
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // 비밀번호 입력 확인 값 업데이트
  const handlePasswordCheck = (e) => {
    setPasswordCheck(e.target.value);
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
      <div css={css`
          width: 100%;
          padding: 0px 15% 20px 25%;
      `}>비밀번호 재설정
      </div>
      <div css={css`
          width: 100%;
          height: 1px;
          background: #999999;
      `}>
      </div>
      <div css={css`
          white-space: pre-line;
          color: #272727;
          text-align: center;
          font-size: 20px;
          font-weight: 400;
          line-height: normal;
          margin-top: 30px;
      `}>비밀번호를 변경해주세요. {"\n"}
        다른 아이디나 사이트에서 사용한 적 없는 안전한 비밀번호로 변경해주세요. </div>
      <div css={css`
          color: #707070;
          font-size: 20px;
          font-weight: 400;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 10px;
          margin-right: 220px;
      `}><PersonOutlineOutlinedIcon/> {email}
      </div>
      <Grid
        item
        xs={12}
        sm={9}
        sx={{
          fontFamily: "Pretendard",
          margin: "30px 0px 30px 0px"
        }}
      >
        <div css={css`
            display: flex;
            justify-content: center;
            flex-direction: column;
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
                marginBottom: "10px"
              },
            }}
          />

          <TextField
            value={passwordCheck}
            onChange={handlePasswordCheck}
            type="passwordCheck"
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
          />
        </div>
      </Grid>

      <div
        css={css`
            border-radius: 20px;
            background: #829FD7;
            color: #FFF;
            padding: 12px 175px;
            font-size: 18px;
            font-weight: 500;
            cursor: pointer;
            margin-bottom: 2%;
        `}
        //onClick={handleFindPassword}
      >
        비밀번호 변경
      </div>
    </div>
  );
}
