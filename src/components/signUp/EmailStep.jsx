import React from "react";
import { useState, useCallback } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  FormControl,
  Grid,
  Container,
  TextField,
} from "@mui/material/";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "../common/Button";
import styled from "styled-components";
const EmailAndPasswordStep = ({
  handleSendButtonClick,
  handlePasswordChange,
  passwordError,
  showVerificationInput,
  handleConfirmVerificationCode,
  confirmVerificationCode,
  handleNextStep,
}) => {
  //폰트 설정
  const theme = createTheme({
    typography: {
      fontFamily: "Pretendard",
    },
  });

  // text field 색 바꾸기
  const StyledTextField = withStyles({
    root: {
      "& .MuiInput-underline:after": {
        borderBottomColor: "#829FD7",
      },
      "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
          color: "#829FD7",
        },
      },
      "&.Mui-error .MuiOutlinedInput-root": {
        // 에러 상태일 때
        borderColor: "#f44336",
      },
      position: "relative",
    },
  })(TextField);
  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        sx={{
          margin: "0px 16px 0px 0px",
          maxWidth: "560px",
          width: "560px",
        }}
      >
        <CssBaseline />
        <FormControl
          component="fieldset"
          variant="standard"
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container spacing={2}>
            <EmailBox>
              <Grid
                item
                xs={12}
                sm={9}
                sx={{
                  padding: "16px 0px 0px 13px",
                }}
              >
                <StyledTextField
                  required
                  autoFocus
                  fullWidth
                  type="email"
                  id="email"
                  name="email"
                  label="이메일"
                  InputProps={{
                    style: {
                      borderRadius: "15px",
                      width: "380px",
                    },
                  }}
                />
              </Grid>
              <ConfirmButton>중복확인</ConfirmButton>
              <SendButton onClick={handleSendButtonClick}>
                인증번호 발송
              </SendButton>
            </EmailBox>
            {showVerificationInput && (
              <EmailBox>
                <Grid
                  item
                  xs={12}
                  sm={9}
                  sx={{
                    padding: "16px 0px 0px 13px",
                  }}
                >
                  <StyledTextField
                    required
                    autoFocus
                    fullWidth
                    type="verificationCode"
                    id="verificationCode"
                    name="verificationCode"
                    label="인증번호 입력"
                    InputProps={{
                      style: {
                        borderRadius: "15px",
                        width: "380px",
                      },
                    }}
                  />
                </Grid>
                <SendButton onClick={handleConfirmVerificationCode}>
                  확인
                </SendButton>
              </EmailBox>
            )}
            {confirmVerificationCode && (
              <ConfirmMessage>인증번호가 일치합니다</ConfirmMessage>
            )}
            <Grid item xs={12}>
              <StyledTextField
                required
                fullWidth
                type="password"
                id="password"
                name="password"
                label="비밀번호 (숫자+영문 8자리 이상)"
                InputProps={{
                  style: {
                    borderRadius: "15px",
                    width: "510px",
                  },
                }}
                onChange={handlePasswordChange}
                error={passwordError}
                helperText={
                  passwordError
                    ? "숫자와 영문자를 포함한 8자리 이상의 비밀번호를 입력하세요."
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                required
                fullWidth
                type="password"
                id="rePassword"
                name="rePassword"
                label="비밀번호 재입력"
                InputProps={{
                  style: {
                    borderRadius: "15px",
                    width: "510px",
                  },
                }}
              />
            </Grid>
          </Grid>
          <Button
            width="170px"
            height="50px"
            margin="40px 0px 0px 0px"
            onClick={handleNextStep}
          >
            다음
          </Button>
        </FormControl>
      </Container>
    </ThemeProvider>
  );
};

export default EmailAndPasswordStep;

const EmailBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ConfirmButton = styled.div`
  width: 80px;
  height: 35px;
  background-color: #d9d9d9;
  border-radius: 15px;
  color: #3d3d3d;
  font-size: 15px;
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: ${(props) => props.right || "145px"};
`;
const ConfirmMessage = styled.div`
  font-size: 15px;
  color: #0a8425;
  margin: 5px 0px 0px 20px;
`;
const SendButton = styled.div`
  background-color: #829fd7;
  color: white;
  font-size: 15px;
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
  cursor: pointer;
  width: 120px;
  height: 50px;
  border-radius: 15px;
  margin-left: 8px;
  margin-top: 12px;
`;
