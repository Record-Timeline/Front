/** @jsxImportSource @emotion/react */

import React, { useState } from "react";

import { css } from "@emotion/react";
import Button from "../components/common/Button"
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import {

  Grid,
  TextField,
} from "@mui/material/";
export default function FindPassword() {
  const [certification, setCertification] = useState(""); // 입력한 이메일
  const email = "sohee5143@naver.com"
  // 인증번호 입력 값 업데이트
  const handleCertificationChange = (e) => {
    setCertification(e.target.value);
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
          padding: 0px 25% 20px 25%;
      `}>비밀번호 찾기
      </div>
      <div css={css`
          width: 100%;
          height: 1px;
          background: #999999;
      `}>
      </div>
      <div css={css`
          color: #707070;
          font-size: 20px;
          font-weight: 400;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 5%;
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
        <div  css={css`
          display: flex;
            align-items: center;
            justify-content: center;
      `}>
        <TextField
          value={certification}
          onChange={handleCertificationChange}
          type="certification"
          id="certification"
          name="certification"
          label="인증번호 입력"
          InputProps={{
            style: {
              borderRadius: "15px",
              width: "350px",
              fontFamily: "Pretendard",
            },
          }}
        />
        <div
          //onClick={emailPasswordConfrim}
          css={css({
            marginLeft: "10px",
            width: '110px',
            height: "56px",
            backgroundColor: "#d9d9d9",
            borderRadius: "20px",
            color: "#595959",
            fontSize: "15px",
            textAlign: "center",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            cursor: "pointer",
            fontWeight: "300"
          })}
        >
          인증번호 발송
        </div>
        </div>
      </Grid>

      <Button width="460px" height="50px" margin="0px 0px 10% 0px">다음</Button>
    </div>
  );
}
