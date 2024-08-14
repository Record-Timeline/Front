/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import {
  Container,
  CssBaseline,
  FormControl,
  Grid,
  TextField,
} from "@mui/material";
import {
  createTheme,
  styled as withStyles,
  ThemeProvider,
} from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { css } from "@emotion/react";

const FieldStep = ({
  handleFieldChange,
  handleSignup,
  field,
  duplicateNicknameCheck,
  handleNicknameChange,
  nickname,
  nicknameDuplicateCheckResponse,
  fieldCategory,
  duplicateEmailCheckResult,
  certification,
  passwordError,
  rePasswordError,
  password,
  rePassword,
  nicknameDuplicateCheckResult, signupError
}) => {
  const [isSignupButtonEnabled, setIsSignupButtonEnabled] = useState(false); // 회원가입 버튼 활성화

  //폰트 설정
  const theme = createTheme({
    typography: {
      fontFamily: "Pretendard",
    },
  });

  // 관심 분야 목록
  const categories = [
    "마케팅/홍보/조사",
    "회계/세무/재무",
    "총무/법무/사무",
    "IT개발/데이터",
    "디자인",
    "서비스",
    "건설/건축",
    "의료",
    "교육",
    "미디어/문화/스포츠",
  ];

  // 가입하기 버튼 활성화/비활성화
  useEffect(() => {
    setIsSignupButtonEnabled(
      duplicateEmailCheckResult &&
        certification &&
        !passwordError &&
        !rePasswordError &&
        password.length > 0 &&
        rePassword.length > 0 &&
        nicknameDuplicateCheckResult &&
        field.length > 0
    );
  }, [
    duplicateEmailCheckResult,
    certification,
    passwordError,
    rePasswordError,
    password,
    rePassword,
    nicknameDuplicateCheckResult,
    field,
  ]);

  return (
    <>
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
              marginLeft: 4,
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
                    padding: "16px 0px 0px 16px",
                  }}
                >
                  <TextField
                    value={nickname}
                    onChange={handleNicknameChange}
                    required
                    fullWidth
                    type="nickname"
                    id="nickname"
                    name="nickname"
                    label="닉네임"
                    InputProps={{
                      style: {
                        borderRadius: "15px",
                        width: "380px",
                      },
                    }}
                  />
                  {nicknameDuplicateCheckResponse && (
                    <div
                      css={css({
                        fontSize: "15px",
                        color:
                          nicknameDuplicateCheckResponse.code === "SU"
                            ? "#0a8425"
                            : "#f44336", // 코드가 SU이면 빨간색, 아니면 초록색
                        margin: "7px 0px 0px 10px",
                      })}
                    >
                      {nicknameDuplicateCheckResponse.code === "SU"
                        ? "사용 가능한 닉네임입니다."
                        : nicknameDuplicateCheckResponse.message}
                    </div>
                  )}
                </Grid>

                <div
                  onClick={duplicateNicknameCheck}
                  css={css({
                    right: "64px",
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
                  })}
                >
                  중복확인
                </div>
              </div>
            </Grid>
            <>
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 380,
                  marginTop: "20px",
                }}
              >
                <InputLabel
                  id="field"
                  sx={{
                    backgroundColor: "white",
                    width: "130px",
                    textAlign: "center",
                  }}
                >
                  관심분야/직종 선택
                </InputLabel>
                <Select
                  labelId="field"
                  id="field"
                  label="field"
                  value={fieldCategory}
                  onChange={handleFieldChange}
                  sx={{
                    borderRadius: "15px",
                  }}
                >
                  <MenuItem value="">
                    <em>관심분야/직종 선택</em>
                  </MenuItem>
                  {[...Array(categories.length)].map((_, index) => (
                    <MenuItem key={index} value={index + 1}>
                      {categories[index]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
            <div
              css={css({
                width: "170px",
                height: "50px",
                margin: "40px 0px 0px 0px",
                fontSize: "18px",
                fontWeight: "500",
                borderRadius: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                textDecoration: "none",
                padding: "10px 20px",
                backgroundColor: isSignupButtonEnabled ? "#829fd7" : "#d9d9d9",
                color: isSignupButtonEnabled ? "white" : "#a1a1a1",
                cursor: isSignupButtonEnabled ? "pointer" : "not-allowed",
              })}
              onClick={isSignupButtonEnabled ? handleSignup : null}
            >
              가입하기
            </div>
            {/* 가입이 정상적으로 완료되지 않았을 경우 에러 메시지 표시*/}
            {signupError && (
              <div
                css={css({
                  color: "#f44336",
                  fontSize: "15px",
                  margin: "20px 0",

                })}
              >
                {signupError}
              </div>
            )}
          </FormControl>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default FieldStep;
