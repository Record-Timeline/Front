/** @jsxImportSource @emotion/react */

import React, { useState } from "react";

import { css } from "@emotion/react";
import { useDispatch, useSelector } from 'react-redux';

import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import {
  Grid,
  TextField,
} from "@mui/material/";
import {useNavigate} from "react-router-dom";
import { setOpenFindSnackbar } from '../actions/actions';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function FindPasswordCertification() {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const dispatch = useDispatch(); // Redux dispatch 사용
  const openFindSnackbar = useSelector(state => state.openFindSnackbar);
  const [certification, setCertification] = useState(""); // 입력한 인증번호
  const email = "sohee5143@naver.com"
  // 인증번호 입력 값 업데이트
  const handleCertificationChange = (e) => {
    setCertification(e.target.value);
  };

  // 다음 버튼 클릭 시
  const handleNextButton = () => {
    if (certification) {
      navigate("/find/change");
      // 인증번호가 입력되지 않았을 때
    } else {
      alert("인증번호를 입력해 주세요.");
    }
  };

  // 인증번호 발송 스낵바
  const handleCloseFindSnackbar = () => {
    dispatch(setOpenFindSnackbar(false)); // 스낵바 닫기
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
          label="인증번호"
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

      <div         css={css`
          width: 470px;
          text-align: center;
          border-radius: 20px;
          background: #829FD7;
          color: #FFF;
          padding: 12px 0px;
          font-size: 18px;
          font-weight: 500;
          cursor: pointer;
          margin-bottom: 10%;
      `} onClick={handleNextButton}>다음</div>
      {/* 인증번호 발생 스낵바 */}
      <Snackbar open={openFindSnackbar} autoHideDuration={4000} onClose={handleCloseFindSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleCloseFindSnackbar} severity="success" variant="filled">
          인증번호가 발송되었습니다. 이메일을 확인하세요.
        </Alert>
      </Snackbar>
    </div>
  );
}
