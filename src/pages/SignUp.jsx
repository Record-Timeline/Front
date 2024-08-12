/** @jsxImportSource @emotion/react */

import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/recodeTimelineLogo.svg";
import { createTheme, styled as withStyles } from "@mui/material/styles";
import EmailStep from "../components/signUp/EmailStep";
import FieldStep from "../components/signUp/FieldStep";
import { css } from "@emotion/react";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
export default function SignUp() {
  const [currentStep, setCurrentStep] = useState(1); // 현재 회원가입 단계 상태

  const [showVerificationInput, setShowVerificationInput] = useState(false); // 인증번호 창 뜨기/안뜨기 상태
  const [confirmVerificationCode, setConfirmVerificationCode] = useState(false); // 인증번호 확인 완료 상태
  const [email, setEmail] = useState(""); // 입력한 이메일
  const [certificationNumber, setCertificationNumber] = useState(""); // 입력한 인증번호
  const [certificationResponse, setCertificationResponse] = useState(""); // 인증번호 확인의 결과 (메시지)
  const [duplicateEmailCheckResponse, setDuplicateEmailCheckResponse] =
    useState(""); // 이메일 중복확인의 결과 (메시지)

  const [duplicateEmailCheckResult, setDuplicateEmailCheckResult] =
    useState(false); // 이메일 중복확인  true or false
  const [certification, setCertification] = useState(false); // 이메일 인증  true or false

  const [password, setPassword] = useState(""); // 입력한 비밀번호 상태
  const [rePassword, setRePassword] = useState(""); // 비밀번호 재입력 상태

  const [passwordError, setPasswordError] = useState(false); // 비밀번호 유효성 상태
  const [rePasswordError, setRePasswordError] = useState(false); // 비밀번호 재입력 유효성 상태

  const [nickname, setNickname] = useState("");
  const [nicknameDuplicateCheckResponse, setNicknameDuplicateCheckResponse] =
    useState(""); // 닉네임 중복확인의 결과 (메시지)
  const [nicknameDuplicateCheckResult, setNicknameDuplicateCheckResult] =
    useState(false); // 닉네임 중복확인  true or false

  const [field, setField] = useState(""); // 선택한 관심분야 (영문 키워드)
  const [fieldCategory, setFieldCategory] = useState(""); // 관심분야 출력

  const [signupError, setSignupError] = useState(""); // 가입하기 버튼 밑 가입 시 에러 표시

  // useNavigate 사용
  const navigate = useNavigate();

  // 회원가입 성공 스낵바 (알림창)
  const [openSignupSnackbar, setOpenSignupSnackbar] = useState(false);
  const handleCloseSignupSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSignupSnackbar(false);
  };

  // 인증번호 발송 성공 스낵바 (알림창)
  const [openCertificationSnackbar, setOpenCertificationSnackbar] = useState(false);
  const handleCloseCertificationSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenCertificationSnackbar(false);
    console.log("닫기")
    console.log()
  };
  // 인증번호 발송 버튼
  const handleSendButtonClick = async () => {

    setShowVerificationInput(true);
    // 이메일 입력 창에 빈 배열만 있을 때
    if (email.length === 0) {
      setDuplicateEmailCheckResponse({ code: "ER", message: "이메일을 입력하세요." });
      return;
    }
    // 이메일 인증번호 발송 연동
    try {
      const response = await axios.post(
        `/api/v1/auth/email-certification`,
        { email: email, context: "SIGNUP" },
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
        setOpenCertificationSnackbar(true)
      }
    } catch (error) {

      setCertificationResponse({code: "ER", message: "인증번호 발송이 정상적으로 이루어지지 않았습니다. 다시 시도해주세요. "});
      console.error(error);
    }
  };

  // 이메일 입력 값 업데이트
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // 닉네임 입력 값 업데이트
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  // 인증번호 확인 버튼
  const handleConfirmVerificationCode = async () => {
    setConfirmVerificationCode(true);
    console.log(email);
    console.log(certificationNumber);
    // 이메일 인증번호 확인 연동
    try {
      const response = await axios.post(
        `/api/v1/auth/check-certification`,
        { email: email, certificationNumber: certificationNumber, context: "SIGNUP" },
        {
          headers: {
            Accept: "*/*",
            "Content-Type": `application/json`,
          },
        }
      );
      console.log(response.data.code);
      console.log(email, "성공");
      setCertificationResponse(response.data);
      // response.data가 "SU"일 때 setDuplicateCheckResult를 true로
      if (response.data.code === "SU") {
        setCertification(true);
      }
    } catch (error) {
      setCertificationResponse({code: "ER", message: "인증번호가 확인되지 않았습니다. 다시 시도해주세요."});
      console.error(error);
    }
  };

  // 인증번호 입력 값 업데이트
  const handleCertificationNumber = (e) => {
    setCertificationNumber(e.target.value);
  };

  // 이메일 중복확인 버튼
  const duplicateEmailCheck = async () => {
    // 이메일이 없는 경우
    if (email.trim() === "") {
      setDuplicateEmailCheckResponse({ code: "ER", message: "이메일을 입력하세요." });
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
      console.log("이메일 중복확인", response);
      // response.data가 "SU"일 때 setDuplicateCheckResult를 true로
      if (response.data.code === "SU") {
        setDuplicateEmailCheckResult(true);
      }
      setDuplicateEmailCheckResponse(response.data);
    } catch (error) {
      setDuplicateEmailCheckResponse({ code: "ER", message: "중복확인을 실패했습니다. 다시 시도해주세요." });
      console.error(error);
    }
  };

  // 닉네임 중복확인 버튼
  const duplicateNicknameCheck = async () => {
    // 닉네임을 입력하지 않은 경우
    if (nickname.trim() === "") {
      setNicknameDuplicateCheckResponse({ code: "ER", message: "닉네임을 입력하세요." });
      return;
    }
    // 중복확인 연동
    try {
      const response = await axios.post(
        `/api/v1/auth/nickname-check`,
        { nickname: nickname },
        {
          headers: {
            Accept: "*/*",
            "Content-Type": `application/json`,
          },
        }
      );
      console.log("닉네임 중복확인", response);
      // response.data가 "SU"일 때 setNicknameDuplicateCheckResult를 true로
      if (response.data.code === "SU") {
        setNicknameDuplicateCheckResult(true);
      }
      setNicknameDuplicateCheckResponse(response.data);
    } catch (error) {
      setNicknameDuplicateCheckResponse({ code: "ER", message: "중복확인을 실패했습니다. 다시 시도해주세요." });
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
  const handleSignup = async () => {

    // 회원가입 연동
    try {
      const response = await axios.post(
        `/api/v1/auth/basic-signup`,
        {
          email: email,
          password: password,
          certificationNumber: certificationNumber,
          nickname: nickname,
          interest: field,
        },
        {
          headers: {
            Accept: "*/*",
            "Content-Type": `application/json`,
          },
        }
      );
      console.log(response);
      console.log({
        email: email,
        password: password,
        certificationNumber: certificationNumber,
        nickname: nickname,
        interest: field,
      });

      // 코드 발송 성공헀을 때
      if (response.data.code === "SU") {
        setOpenSignupSnackbar(true)
      }
      navigate("/signup/complete");
    } catch (error) {
      setSignupError("회원가입이 정상적으로 진행되지 않았습니다. 다시 시도해주세요. ");
      console.error(error);
    }
  };

  //폰트 설정
  const theme = createTheme({
    typography: {
      fontFamily: "Pretendard",
    },
  });

  // 연동을 위해 매칭될 관심 분야 목록
  const categoryMap = {
    1: "Marketing_Promotion",
    2: "Accounting_Tax_Finance",
    3: "GeneralAffairs_LegalAffairs_Affairs",
    4: "IT_Data",
    5: "Design",
    6: "Service",
    7: "Construction_Architecture",
    8: "MedicalCare",
    9: "Education",
    10: "Media_Culture_Sports",
  };

  // 분야
  const handleFieldChange = (event) => {
    const selectedField = event.target.value;
    setField(categoryMap[selectedField] || "");
    setFieldCategory(selectedField);
  };

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
            email={email}
            handleEmailChange={handleEmailChange}
            certificationNumber={certificationNumber}
            handleCertificationNumber={handleCertificationNumber}
            certificationResponse={certificationResponse}
            duplicateEmailCheck={duplicateEmailCheck}
            duplicateEmailCheckResponse={duplicateEmailCheckResponse}
            duplicateEmailCheckResult={duplicateEmailCheckResult}
            certification={certification}
            password={password}
            setPassword={setPassword}
            passwordError={passwordError}
            setPasswordError={setPasswordError}
            rePasswordError={rePasswordError}
            setRePasswordError={setRePasswordError}
            rePassword={rePassword}
            setRePassword={setRePassword}
          />
        )}
        {currentStep === 2 && (
          <FieldStep
            handleSignup={handleSignup}
            handleFieldChange={handleFieldChange}
            field={field}
            duplicateNicknameCheck={duplicateNicknameCheck}
            handleNicknameChange={handleNicknameChange}
            nickname={nickname}
            nicknameDuplicateCheckResponse={nicknameDuplicateCheckResponse}
            nicknameDuplicateCheckResult={nicknameDuplicateCheckResult}
            fieldCategory={fieldCategory}
            duplicateEmailCheckResult={duplicateEmailCheckResult}
            certification={certification}
            passwordError={passwordError}
            rePasswordError={rePasswordError}
            password={password}
            rePassword={rePassword}
            signupError={signupError}
          />
        )}
      </div>
      {/* 회원가입 완료 시 뜨는 스낵바 */}
      <Snackbar open={openSignupSnackbar} autoHideDuration={4000} onClose={handleCloseSignupSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert
          onClose={handleCloseSignupSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          회원가입이 정상적으로 완료되었습니다.
        </Alert>
      </Snackbar>
      {/* 인증번호 전송 완료 시 뜨는 스낵바 */}
      <Snackbar open={openCertificationSnackbar} autoHideDuration={4000} onClose={handleCloseCertificationSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert
          onClose={handleCloseCertificationSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          인증번호가 정상 발송되었습니다. 이메일을 확인해주세요
        </Alert>
      </Snackbar>
    </div>
  );
}
