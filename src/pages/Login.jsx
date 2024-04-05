import React from "react";
import recodeTimelineLogo from "../assets/images/recodeTimelineLogo.svg"
import styled from "styled-components";

export default function Login() {
  return (
    <LoginWrap>
      <LoginBox>
    <LogoImg src={recodeTimelineLogo} alt="레코드 타임라인" /> 
    <LoginInput placeholder="이메일을 입력하세요"></LoginInput>
    <LoginInput placeholder="비밀번호를 입력하세요"></LoginInput>
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
`;

const LoginBox = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
  align-items: center;
  width: 600px;
`;

const LogoImg = styled.img`
  width: 200px;
  margin-bottom: 60px;

`

const LoginInput = styled.input`
font-size: 15px;
font-weight: 300;
border-radius: 20px;
border: 1.5px solid #949494;
outline: none;
width: 240px;
height: 25px;
padding: 10px 20px;
margin-bottom: 12px;
`