import React, { useState } from "react";
import recodeTimelineLogo from "../assets/images/recodeTimelineLogo.svg";
import styled from "styled-components";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";
import KaKaoIcon from "../assets/images/kakaoLoginIcon.svg";
export default function Login() {
  const [username, setUsername] = useState(""); // 아이디
  const [password, setPassword] = useState(""); // 비밀번호

  // 아이디 입력
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  // 비밀번호 입력
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  return (
    <LoginWrap>
      <LoginBox>
        <LogoImg src={recodeTimelineLogo} alt="레코드 타임라인" />
        <LoginInput
          placeholder="아이디를 입력하세요"
          onChange={handleUsernameChange}
        ></LoginInput>
        <LoginInput placeholder="비밀번호를 입력하세요"></LoginInput>
        <Button margin="10px 0px 15px 0px" onChange={handlePasswordChange}>
          로그인
        </Button>
        <ButtonWrap>
          <FindButton borderRight="1px solid black" to="/find">
            아이디 찾기
          </FindButton>
          <FindButton to="/find">비밀번호 찾기 </FindButton>
        </ButtonWrap>
        <ButtonWrap>
          <SignupText>아직 회원이 아니신가요?</SignupText>
          <Signup to="/signup"> 회원가입</Signup>
        </ButtonWrap>
        <HorizontalLineBox>
          <EasyLoginText>간편 로그인</EasyLoginText>
        </HorizontalLineBox>
        <Icon src={KaKaoIcon} alt="카카오 로그인" />
      </LoginBox>
    </LoginWrap>
  );
}
const LoginWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh;
  font-size: 18px;
  color: #272727;
`;

const LoginBox = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 600px;
`;

const LogoImg = styled.img`
  width: 270px;
  margin-bottom: 60px;
`;

const LoginInput = styled.input`
  font-size: 18px;
  font-weight: 300;
  border-radius: 20px;
  border: 1.5px solid #949494;
  outline: none;
  width: 350px;
  height: 30px;
  padding: 10px 20px;
  margin-bottom: 12px;
`;

const ButtonWrap = styled.div`
  display: flex;
  margin-top: 30px;
`;

const FindButton = styled(Link)`
  text-decoration: none;
  color: #272727;
  cursor: pointer;
  border-right: ${(props) => props.borderRight};
  padding: 0px 20px;
`;

const SignupText = styled.div`
  color: #949494;
`;

const Signup = styled(Link)`
  font-weight: 800;
  cursor: pointer;
  text-decoration: none;
  color: #272727;
  margin-left: 12px;
`;

const HorizontalLineBox = styled.div`
  margin: 60px 0px 25px 0px;
  width: 350px;
  text-align: center;
  border-bottom: 1px solid black;
  line-height: 0.1em;
  display: flex;
  justify-content: center;
`;

const EasyLoginText = styled.div`
  background-color: white;
  width: fit-content;
  padding: 0px 10px;
  position: absolute;
  z-index: 1;
`;

const Icon = styled.img`
  width: 65px;
  cursor: pointer;
`;
