import React, { useState, useCallback } from "react";
import styled from "styled-components";
import Logo from "../assets/images/recodeTimelineLogo.svg";
import { withStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  TextField,
  FormControl,
  Grid,
  Box,
  Container,
} from "@mui/material/";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "../components/common/Button";
export default function SignUp() {
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
          borderColor: "#829FD7",
          color: "#829FD7",
        },
      },
      "&.Mui-error .MuiOutlinedInput-root": {
        // 에러 상태일 때
        borderColor: "#f44336",
      },
    },
  })(TextField);

  return (
    <SignUpWrap>
      <StyledLogo src={Logo} alt="레코드 타임라인" />
      <SignUpBox>
        <MainText>회원가입</MainText>
        <SubText>레코드 타임라인의 회원이 되어 함께 성장해요!</SubText>
        <NumBox>
          <StageWrap>
            <NumCircle marginLeft="20px">1</NumCircle>
            <NumLine />
            <NumCircle>2</NumCircle> <NumLine />
            <NumCircle>3</NumCircle> <NumLine />
            <NumCircle marginRight="20px">4</NumCircle>
          </StageWrap>
          <NumText>아이디/비밀번호 입력</NumText>
        </NumBox>
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
              }}
            >
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
                  <Grid item xs={12}>
                    <StyledTextField
                      required
                      autoFocus
                      fullWidth
                      type="email"
                      id="email"
                      name="email"
                      label="아이디"
                      InputProps={{
                        style: {
                          borderRadius: "15px",
                        },
                      }}
                    />
                  </Grid>
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
                        },
                      }}
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
                        },
                      }}
                    />
                  </Grid>
                </Grid>
                <Button width="396px" height="50px" margin="30px 0px 0px 0px">
                  다음
                </Button>
              </FormControl>
            </Box>
          </Container>
        </ThemeProvider>
      </SignUpBox>
    </SignUpWrap>
  );
}
const SignUpWrap = styled.div`
  height: 100vh;
  font-size: 18px;
  color: #272727;
`;

const StyledLogo = styled.img`
  width: 200px;
  margin: 30px 0px 0px 35px;
`;

const SignUpBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 80%;
`;
const MainText = styled.div`
  font-weight: 700;
  font-size: 40px;
`;

const SubText = styled.div`
  font-size: 22px;
  margin-top: 5px;
  font-weight: ${(props) => props.fontWeight};
`;

const StageWrap = styled.div`
  display: flex;
  margin-top: 35px;
`;

const NumCircle = styled.div`
  background-color: #829fd7;
  color: white;
  font-size: 25px;
  font-weight: 600;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;

  margin-left: ${(props) => props.marginLeft};
  margin-right: ${(props) => props.marginRight};
`;
const NumBox = styled.div`
  width: 560px;
`;

const NumLine = styled.div`
  border-bottom: 4px solid #829fd7;
  width: 80px;
  height: 39px;
  position: relative;
`;
const NumText = styled.div`
  font-size: 14px;
  margin-right: auto;
`;
