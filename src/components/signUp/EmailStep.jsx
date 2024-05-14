/** @jsxImportSource @emotion/react */

import {
  createTheme,
  styled as withStyles,
  ThemeProvider,
} from "@mui/material/styles";
import {
  Container,
  CssBaseline,
  FormControl,
  Grid,
  TextField,
} from "@mui/material/";
import Button from "../common/Button";
import { css } from "@emotion/react";
import React, {useCallback, useState} from "react";

const EmailStep = ({
  handleSendButtonClick,
  showVerificationInput,
  handleConfirmVerificationCode,
  confirmVerificationCode,
  handleNextStep, email, handleEmailChange, certificationNumber, handleCertificationNumber, certificationResponse, duplicateCheck, duplicateCheckResponse
}) => {
    const [passwordError, setPasswordError] = useState(false); // 비밀번호 유효성 상태
    // 비밀번호 유효성 검사 함수
    const validatePassword = (password) => {
        // 숫자, 영문자 포함 여부 확인
        const containsNumber = /[0-9]/.test(password);
        const containsLetter = /[a-zA-Z]/.test(password);

        // 비밀번호 길이 확인
        const isLengthValid = password.length >= 8;

        // 비밀번호가 유효하지 않을 경우
        if (!(containsNumber && containsLetter && isLengthValid)) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
    };

    // 비밀번호 입력 시 유효성 검사
    const handlePasswordChange = useCallback((e) => {
        const password = e.target.value;
        validatePassword(password);
    }, []);
    //폰트 설정
  const theme = createTheme({
    typography: {
      fontFamily: "Pretendard",
    },
  });

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
    "&.Mui-error .MuiOutlinedInput-root": {
      // 에러 상태일 때
      borderColor: "#f44336",
    },
    position: "relative",
  });

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
            <div
              css={css({
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              })}
            >
              <Grid
                item
                xs={12}
                sm={9}
                sx={{
                  padding: "16px 0px 0px 13px",
                }}
              >
                <StyledTextField value={email} onChange={handleEmailChange}
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
              <div
                onClick={duplicateCheck}
                css={css({
                  width: "80px",
                  height: "35px",
                  backgroundColor: "#d9d9d9",
                  borderRadius: "15px",
                  color: "#3d3d3d",
                  fontSize: "15px",
                  textAlign: "center",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  cursor: "pointer",
                  position: "absolute",
                  top: "10px",
                  right: "145px",
                })}
              >
                중복확인
              </div>
              <div
                onClick={handleSendButtonClick}
                css={css({
                  backgroundColor: "#829fd7",
                  color: "white",
                  fontSize: "15px",
                  textAlign: "center",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  cursor: "pointer",
                  width: "120px",
                  height: "50px",
                  borderRadius: "15px",
                  marginLeft: "8px",
                  marginTop: "12px",
                })}
              >
                인증번호 발송
              </div>
            </div>
              {duplicateCheckResponse && (
                  <div
                      css={css({
                          fontSize: "15px",
                          color: duplicateCheckResponse.code === "SU" ?  "#0a8425" : "#f44336", // 코드가 SU이면 빨간색, 아니면 초록색
                          margin: "5px 0px 0px 20px",
                      })}
                  >
                      {duplicateCheckResponse.code === "SU" ? "사용 가능한 이메일입니다." : duplicateCheckResponse.message}
                  </div>
              )}
            {showVerificationInput && (
              <div
                css={css({
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                })}
              >
                <Grid
                  item
                  xs={12}
                  sm={9}
                  sx={{
                    padding: "16px 0px 0px 13px",
                  }}
                >
                  <StyledTextField
                    value={certificationNumber} onChange={handleCertificationNumber}
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
                <div
                  onClick={handleConfirmVerificationCode}
                  css={css({
                    backgroundColor: "#829fd7",
                    color: "white",
                    fontSize: "15px",
                    textAlign: "center",
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                    cursor: "pointer",
                    width: "120px",
                    height: "50px",
                    borderRadius: "15px",
                    marginLeft: "8px",
                    marginTop: "12px",
                  })}
                >
                  확인
                </div>
              </div>
            )}
              {confirmVerificationCode && (
                  <div
                      css={css({
                          fontSize: "15px",
                          color: certificationResponse.code === "SU" ? "#0a8425" : "#f44336", // 코드가 SU이면 초록색, 아니면 빨간색
                          margin: "5px 0px 0px 20px",
                      })}
                  >
                      {certificationResponse.code === "SU" ? "인증번호가 일치합니다." : certificationResponse.message}
                  </div>
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

export default EmailStep;
