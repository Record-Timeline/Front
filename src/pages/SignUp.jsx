/** @jsxImportSource @emotion/react */

import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/recodeTimelineLogo.svg";
import { createTheme, styled as withStyles } from "@mui/material/styles";
import { TextField } from "@mui/material/";
import EmailStep from "../components/signUp/EmailStep";
import FieldStep from "../components/signUp/FieldStep";
import { css } from "@emotion/react";
import axios from "axios";

export default function SignUp() {
    const [showVerificationInput, setShowVerificationInput] = useState(false); // 인증번호 창 뜨기/안뜨기 상태
    const [confirmVerificationCode, setConfirmVerificationCode] = useState(false); // 인증번호 확인 완료 상태
    const [currentStep, setCurrentStep] = useState(1); // 현재 회원가입 단계 상태
    const [email, setEmail] = useState(""); // 입력한 이메일
    const [certificationNumber, setCertificationNumber] = useState(""); // 입력한 인증번호
    const [certificationResponse, setCertificationResponse] = useState(""); // 인증번호 확인의 결과 (메시지)
    const [duplicateCheckResponse, setDuplicateCheckResponse] = useState(""); // 중복확인의 결과 (메시지)

    const [duplicateCheckResult, setDuplicateCheckResult] = useState(false); // 중복확인  true or false
    const [certification, setCertification] = useState(false); // 이메일 인증  true or false

    const [field, setField] = useState("");

    // useNavigate 사용
    const navigate = useNavigate();

    // 인증번호 발송 버튼
    const handleSendButtonClick = async () => {
        setShowVerificationInput(true);
        // 이메일 입력 창에 빈 배열만 있을 때
        if (email.length === 0) {
            alert("인증번호를 입력하세요.");
            return;
        }
        // 이메일 인증번호 발송 연동 
        try {
            const response = await axios.post(
                `/api/v1/auth/email-certification`,
                { email: email },
                {
                    headers: {
                        Accept: "*/*",
                        "Content-Type": `application/json`,
                    },
                }
            );
            console.log(response);
            console.log(email, "성공");

            // 코드 발송 성공헀을 때
            if (response.data.code === "SU") {
                alert("인증번호가 발송되었습니다. 이메일을 확인해주세요 :)");
            }
        } catch (error) {
            console.error(error);
        }
    };


  // 이메일 입력 값 업데이트
  const handleEmailChange = (e) => {
      setEmail(e.target.value);
  };

  // 인증번호 확인 버튼
  const handleConfirmVerificationCode = async () => {
    setConfirmVerificationCode(true);
    console.log(email)
    console.log(certificationNumber)
      // 이메일 인증번호 확인 연동
      try {
          const response = await axios.post(
              `/api/v1/auth/check-certification`,
              { email:  email,  certificationNumber: certificationNumber},
              {
                  headers: {
                      Accept: "*/*",
                      "Content-Type": `application/json`,
                  },
              }
          );
          console.log(response.data.code)
          console.log(email, "성공");
          setCertificationResponse(response.data)
          // response.data가 "SU"일 때 setDuplicateCheckResult를 true로
          if (response.data.code === "SU") {
              setCertification(true);
          }
      } catch (error) {
          console.error(error);
      }
  };

    // 인증번호 입력 값 업데이트
    const handleCertificationNumber = (e) => {
        setCertificationNumber(e.target.value);
    };

    // 중복확인 버튼
    const duplicateCheck = async () => {
        // 이메일이 없는 경우
        if (email.trim() === "") {
            alert("이메일을 입력하세요.");
            return;
        }

        // 중복확인 연동
        try {
            const response = await axios.post(
                `/api/v1/auth/email-check`,
                { email: email },
                {
                    headers: {
                        Accept: "*/*",
                        "Content-Type": `application/json`,
                    },
                }
            );
            console.log("중복확인", response);
            // response.data가 "SU"일 때 setDuplicateCheckResult를 true로
            if (response.data.code === "SU") {
                setDuplicateCheckResult(true);
            }
            setDuplicateCheckResponse(response.data)
        } catch (error) {
            console.error(error);
        }
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
    navigate("/signupcomplete");
  };

  //폰트 설정
  const theme = createTheme({
    typography: {
      fontFamily: "Pretendard",
    },
  });

  // 분야
  const handleFieldChange = (event) => {
    setField(event.target.value);
  };

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
    <div
      css={css({
        height: "100vh",
        fontSize: "18px",
        color: "#272727",
      })}
    >
      <img
        css={css({
          width: "200px",
          margin: "30px 0px 0px 35px",
        })}
        src={Logo}
        alt="레코드 타임라인"
      />
      <div
        css={css({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "80%",
        })}
      >
        <div
          css={css({
            fontWeight: "700",
            fontSize: "40px",
          })}
        >
          회원가입
        </div>
        <div
          css={css({
            fontSize: "22px",
            marginTop: "5px",
          })}
        >
          레코드 타임라인의 회원이 되어 함께 성장해요!
        </div>
        <div
          css={css({
            width: "260px",
          })}
        >
          <div
            css={css({
              display: "flex",
              marginTop: "35px",
            })}
          >
            <div
              css={css({
                backgroundColor: "#829fd7",
                color: "white",
                fontSize: "25px",
                fontWeight: "600",
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                textAlign: "center",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                marginBottom: "10px",
                marginLeft: "20px",
              })}
              style={{ backgroundColor: getCircleColor(1) }}
            >
              1
            </div>
            <div
              css={css({
                width: "80px",
                height: "39px",
                position: "relative",
              })}
              style={numLineStyle}
            />
            <div
              css={css({
                backgroundColor: "#829fd7",
                color: "white",
                fontSize: "25px",
                fontWeight: "600",
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                textAlign: "center",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                marginBottom: "10px",
              })}
              style={{ backgroundColor: getCircleColor(2) }}
            >
              2
            </div>
          </div>
          {currentStep === 1 && (
            <div
              css={css({
                fontSize: "14px",
                marginRight: "auto",
              })}
            >
              이메일/비밀번호 입력
            </div>
          )}
          {currentStep === 2 && (
            <div
              css={css({
                marginLeft: "165px",
                fontSize: "14px",
                marginRight: "auto",
              })}
            >
              관심분야 설정
            </div>
          )}
        </div>
        {currentStep === 1 && (
          <EmailStep
            handleSendButtonClick={handleSendButtonClick}
            showVerificationInput={showVerificationInput}
            handleConfirmVerificationCode={handleConfirmVerificationCode}
            confirmVerificationCode={confirmVerificationCode}
            handleNextStep={handleNextStep}
            email = {email}
            handleEmailChange ={handleEmailChange}
            certificationNumber={certificationNumber}
            handleCertificationNumber = {handleCertificationNumber}
            certificationResponse = {certificationResponse}
            duplicateCheck = {duplicateCheck}
            duplicateCheckResponse={duplicateCheckResponse}
          />
        )}
        {currentStep === 2 && (
          <FieldStep
            handleSignup={handleSignup}
            handleFieldChange={handleFieldChange}
            field={field}
          />
        )}
      </div>
    </div>
  );
}
