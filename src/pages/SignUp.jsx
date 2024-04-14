import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/images/recodeTimelineLogo.svg";
import { withStyles } from "@material-ui/core/styles";
import { TextField } from "@mui/material/";
import { createTheme } from "@mui/material/styles";
import EmailStep from "../components/signUp/EmailStep";
import FieldStep from "../components/signUp/FieldStep";

export default function SignUp() {
  const [passwordError, setPasswordError] = useState(false); // 비밀번호 유효성 에러 상태
  const [showVerificationInput, setShowVerificationInput] = useState(false); // 인증번호 창 뜨기/안뜨기 상태
  const [confirmVerificationCode, setConfirmVerificationCode] = useState(false); // 인증번호 확인 완료 상태
  const [currentStep, setCurrentStep] = useState(1); // 현재 회원가입 단계 상태
  const [field, setField] = useState("");
  const navigate = useNavigate();

  // 인증번호 발송 버튼
  const handleSendButtonClick = () => {
    setShowVerificationInput(true);
  };

  // 인증번호 확인 버튼
  const handleConfirmVerificationCode = () => {
    setConfirmVerificationCode(true);
  };

  // 단계가 변경될 때마다 단계 색 바꿈
  const getCircleColor = (step) => {
    return currentStep === step ? "#829FD7" : "#ECECEE";
  };

  const numLineStyle = {
    borderBottom: `4px solid ${getCircleColor(1)}`,
  };

  // 다음 버튼 클릭
  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  // 가입하기 버튼 클릭
  const handleSignup = () => {
    navigate("/signup/complete");
  };

  //폰트 설정
  const theme = createTheme({
    typography: {
      fontFamily: "Pretendard",
    },
  });

  // 분야
  const handleFieldChange = (event: SelectChangeEvent) => {
    setField(event.target.value);
  };

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

  // 비밀번호 입력 시 유효성 검사
  const handlePasswordChange = useCallback((e) => {
    const password = e.target.value;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
    const isValidPassword = passwordRegex.test(password);
    setPasswordError(!isValidPassword);
  }, []);

  return (
    <SignUpWrap>
      <StyledLogo src={Logo} alt="레코드 타임라인" />
      <SignUpBox>
        <MainText>회원가입</MainText>
        <SubText>레코드 타임라인의 회원이 되어 함께 성장해요!</SubText>
        <NumBox>
          <StageWrap>
            <NumCircle
              marginLeft="20px"
              style={{ backgroundColor: getCircleColor(1) }}
            >
              1
            </NumCircle>
            <NumLine style={numLineStyle} />
            <NumCircle style={{ backgroundColor: getCircleColor(2) }}>
              2
            </NumCircle>
          </StageWrap>
          {currentStep === 1 && <NumText>이메일/비밀번호 입력</NumText>}
          {currentStep === 2 && (
            <NumText marginLeft="165px">관심분야 설정</NumText>
          )}
        </NumBox>
        {currentStep === 1 && (
          <EmailStep
            handleSendButtonClick={handleSendButtonClick}
            handlePasswordChange={handlePasswordChange}
            passwordError={passwordError}
            showVerificationInput={showVerificationInput}
            handleConfirmVerificationCode={handleConfirmVerificationCode}
            confirmVerificationCode={confirmVerificationCode}
            handleNextStep={handleNextStep}
          />
        )}
        {currentStep === 2 && (
          <FieldStep
            handleSignup={handleSignup}
            handleFieldChange={handleFieldChange}
            field={field}
          />
        )}
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
  width: 260px;
`;

const NumLine = styled.div`
  width: 80px;
  height: 39px;
  position: relative;
`;
const NumText = styled.div`
  font-size: 14px;
  margin-right: auto;
  margin-left: ${(props) => props.marginLeft};
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

const EmailBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
