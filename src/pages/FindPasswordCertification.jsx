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
import axiosInstance from "../utils/axiosInstance"; // axiosInstance 임포트

export default function FindPasswordCertification() {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const dispatch = useDispatch(); // Redux dispatch 사용
  const openFindSnackbar = useSelector(state => state.openFindSnackbar);
  const [certification, setCertification] = useState(""); // 입력한 인증번호
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태
  const [successMessage, setSuccessMessage] = useState(""); // 성공 메시지 상태
  const [isVerified, setIsVerified] = useState(false); // 인증 성공 여부 상태
  const email = useSelector(state => state.email);  // Redux에서 이메일 가져오기

  // 인증번호 입력 값 업데이트
  const handleCertificationChange = (e) => {
    setCertification(e.target.value);
  };

  // 인증번호 확인 버튼 클릭 시
  const emailPasswordConfirm = async () => {
    try {
      const response = await axiosInstance.post('/api/v1/password/verify-certification', {
        email: email,
        certificationNumber: certification,
      });

      if (response.data.code === "200") {
        // 인증 성공 시
        setSuccessMessage("인증이 성공적으로 완료되었습니다.");
        setIsVerified(true); // "다음" 버튼 활성화
        setErrorMessage(""); // 에러 메시지 초기화
      } else {
        // 인증 실패 시
        setErrorMessage(response.data.message);
        setIsVerified(false); // "다음" 버튼 비활성화
        setSuccessMessage(""); // 성공 메시지 초기화
      }
    } catch (error) {
      // 에러 발생 시
      setErrorMessage(error.response?.data?.message || "오류가 발생했습니다.");
      setIsVerified(false); // "다음" 버튼 비활성화
      setSuccessMessage(""); // 성공 메시지 초기화
    }
  };

  // 다음 버튼 클릭 시
  const handleNextButton = () => {
    if (isVerified) {
      navigate("/find/change");
    } else {
      alert("인증이 완료되지 않았습니다.");
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
          width: 450px;
          color: #707070;
          font-size: 20px;
          font-weight: 400;
          display: flex;
          align-items: center;
          margin-top: 5%;
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
          align-items: center;
          justify-content: center;
        `}>
          <TextField
            value={certification}
            onChange={handleCertificationChange}
            type="text"
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
            onClick={emailPasswordConfirm}
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
            인증번호 확인
          </div>
        </div>
        {/* 에러 메시지 또는 성공 메시지 표시 */}
        {errorMessage && (
          <div css={css({
            color: "#e1483a",
            fontSize: "15px",
            marginTop: "10px",
            marginLeft:"5px",
            fontWeight: 200,
          })}>
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div css={css({
            color: "#4caf50",
            fontSize: "15px",
            marginTop: "10px",
            marginLeft:"5px",
            fontWeight: 200,
          })}>
            {successMessage}
          </div>
        )}
      </Grid>

      <div
        css={css`
          width: 470px;
          text-align: center;
          border-radius: 20px;
          background: ${isVerified ? "#829FD7" : "#d9d9d9"};  // 인증 성공 여부에 따라 색상 변경
          color: #FFF;
          padding: 12px 0px;
          font-size: 18px;
          font-weight: 500;
          cursor: ${isVerified ? "pointer" : "not-allowed"};  // 인증 성공 여부에 따라 커서 변경
          margin-bottom: 10%;
        `}
        onClick={handleNextButton}
      >
        다음
      </div>
      {/* 인증번호 발송 스낵바 */}
      <Snackbar open={openFindSnackbar} autoHideDuration={4000} onClose={handleCloseFindSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleCloseFindSnackbar} severity="success" variant="filled">
          인증번호가 발송되었습니다. 이메일을 확인하세요.
        </Alert>
      </Snackbar>
    </div>
  );
}
