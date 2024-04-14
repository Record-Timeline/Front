import React from "react";
import { useState } from "react";
import {
  Container,
  CssBaseline,
  FormControl,
  Grid,
  TextField,
} from "@mui/material";

import styled from "styled-components";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "../common/Button";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const FieldStep = ({ handleFieldChange, handleSignup, field }) => {
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

  // 관심 분야 목록
  const categories = [
    "기획/전략",
    "마케팅/홍보/조사",
    "회계/세무/재무",
    "인사/노무/HRD",
    "총무/법무/사무",
    "IT/개발/데이터",
    "디자인",
    "영업/판매/무역",
    "고객/상담/TM",
    "구매/자재/물류",
    "상품/기획/MD",
    "운전/운송/배송",
    "서비스",
    "생산",
    "건설/건축",
    "의료",
    "연구/R&D",
    "교육",
    "미디어/문화/스포츠",
    "금융/보험",
    "공공/복지",
  ];

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
              <EmailBox>
                <Grid
                  item
                  xs={12}
                  sm={9}
                  sx={{
                    padding: "16px 0px 0px 16px",
                  }}
                >
                  <StyledTextField
                    required
                    autoFocus
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
                </Grid>
                <ConfirmButton right="64px">중복확인</ConfirmButton>
              </EmailBox>
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
                  value={field}
                  onChange={handleFieldChange}
                  sx={{
                    borderRadius: "15px",
                  }}
                >
                  <MenuItem value="">
                    <em>관심분야/직종 선택</em>
                  </MenuItem>
                  {[...Array(21)].map((_, index) => (
                    <MenuItem key={index} value={index + 1}>
                      {categories[index]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
            <Button
              width="170px"
              height="50px"
              margin="40px 0px 0px 0px"
              onClick={handleSignup}
            >
              가입하기
            </Button>
          </FormControl>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default FieldStep;

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
