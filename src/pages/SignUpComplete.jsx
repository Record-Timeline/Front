import React from "react";
import styled from "styled-components";
import Logo from "../assets/images/recodeTimelineLogo.svg";
import Button from "../components/common/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
export default function SignUp() {
  const nickName = "레타";
  return (
    <SignUpWrap>
      <StyledLogo src={Logo} alt="레코드 타임라인" />
      <SignUpBox>
        <CheckCircleIcon style={{ fontSize: "60px" }} />
        <WelcomeTextWrap>
          <NickNameText>{nickName}</NickNameText>님 환영합니다!
        </WelcomeTextWrap>
        레코드 타임라인 회원가입이 완료되었습니다.
        <WelcomeTextWrap margin="40px 0px 0px 0px">
          <Button
            width="90px"
            backgroundColor="#A4A3A3"
            margin="0px 15px 0px 0px"
            to="/"
          >
            메인으로
          </Button>
          <Button width="90px" to="/login">
            로그인
          </Button>
        </WelcomeTextWrap>
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
  font-size: 32px;
  white-space: pre-wrap;
`;

const WelcomeTextWrap = styled.div`
  display: flex;
  font-weight: 600;
  margin: ${(props) => props.margin || "40px 0px 10px 0px"};
  font-size: 35px;
`;

const NickNameText = styled.div`
  color: #829fd7;
`;
