/** @jsxImportSource @emotion/react */

import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import axiosInstance from "../utils/axiosInstance";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlineButton from "../components/common/OutlineButton";
import PasswordChangeModal from "../components/profile/PasswordChangeModal";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function ModifyProfile() {
  const [nickname, setNickname] = useState("");
  const [nicknameDuplicationResponse, setNicknameDuplicationResponse] = useState("");
  const [nicknameDuplicationResult, setNicknameDuplicationResult] = useState(false);
  const [field, setField] = useState("");
  const [email, setEmail] = useState("")
  const [myProfile, setMyProfile] = useState("")
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isSameNickname, setIsSameNickname] = useState(false);
  const [openPasswordSnackbar, setOpenPasswordSnackbar] = useState(false);

  const interestFields = [
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
  const categoryMap = {
    "Marketing_Promotion": "마케팅/홍보/조사",
    "Accounting_Tax_Finance": "회계/세무/재무",
    "GeneralAffairs_LegalAffairs_Affairs": "총무/법무/사무",
    "IT_Data": "IT개발/데이터",
    "Design": "디자인",
    "Service": "서비스",
    "Construction_Architecture": "건설/건축",
    "MedicalCare": "의료",
    "Education": "교육",
    "Media_Culture_Sports": "미디어/문화/스포츠",
  };

  const reverseCategoryMap = {
    "마케팅/홍보/조사": "Marketing_Promotion",
    "회계/세무/재무": "Accounting_Tax_Finance",
    "총무/법무/사무": "GeneralAffairs_LegalAffairs_Affairs",
    "IT개발/데이터": "IT_Data",
    "디자인": "Design",
    "서비스": "Service",
    "건설/건축": "Construction_Architecture",
    "의료": "MedicalCare",
    "교육": "Education",
    "미디어/문화/스포츠": "Media_Culture_Sports",
  };

// 스낵바 닫기
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleClosePasswordSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenPasswordSnackbar(false);
  };

  // 닉네임 중복확인 버튼
  const duplicateNicknameCheck = async () => {
    // 닉네임을 입력하지 않은 경우
    if (nickname.trim() === "") {
      setNicknameDuplicationResponse({ code: "ER", message: "닉네임을 입력하세요." });
      return;
    }
    // 현재 닉네임을 중복확인 할 경우
    if (myProfile.nickname == nickname) {
      setNicknameDuplicationResponse({ code: "ER", message: "현재 닉네임과 같습니다." });
      setNicknameDuplicationResult(true); // 중복확인 결과를 true로 수정
      setIsSameNickname(true)
      return;
    }

    // 중복확인 연동
    try {
      const response = await axiosInstance.post(
        `/api/v1/auth/nickname-check`,
        { nickname: nickname },
        {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("닉네임 중복확인", response);
      // response.data가 "SU"일 때 setNicknameDuplicationResult를 true로
      if (response.data.code === "SU") {
        setNicknameDuplicationResult(true);
      }
      setNicknameDuplicationResponse(response.data);
    } catch (error) {
      setNicknameDuplicationResponse({ code: "ER", message: "중복확인을 실패했습니다. 다시 시도해주세요." });
      console.error(error);
    }
  };

// 변경하기 버튼
  const onClickInfoChange = async () => {
    // 닉네임이 기존 닉네임과 같은 경우, interest만 변경 
    if (isSameNickname && nicknameDuplicationResult) {
      try {
        const response = await axiosInstance.put(
          `/api/v1/update-memberInfo`,
          { newInterest: reverseCategoryMap[field]},
          {
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
            },
          }
        );
        console.log("분야 변경하기",reverseCategoryMap[field], response);
        setOpenSnackbar(true);
      } catch (error) {
        console.error("닉네임 변경", error);
      }
    }
    // 닉네임 중복확인 결과가 true인 경우
    else if (nicknameDuplicationResult) {
      try {
        const response = await axiosInstance.put(
          `/api/v1/update-memberInfo`,
          { newNickname: nickname, newInterest: reverseCategoryMap[field]},
          {
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
            },
          }
        );
        console.log("회원정보 변경하기",reverseCategoryMap[field], response);
        setOpenSnackbar(true);
      } catch (error) {
        console.error("닉네임 변경", error);
      }
    } else {
      alert("닉네임 중복확인이 완료되지 않았습니다.")
    }
  };

  // 현재 닉네임, 관심분야 불러오기
  const fetchProfileData = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/my-profile");
      setNickname(response.data.nickname); // 현재 닉네임 설정
      setField(categoryMap[response.data.interest]); // 현재 관심분야 설정
      setEmail(response.data.email);
      setMyProfile(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  // 닉네임 입력 값 업데이트
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  // 분야 업데이트
  const handleFieldChange = (event) => {
    setField(event.target.value || "");
  };

  return (
    <div
      css={css`
          display: flex;
          height: 100vh;
          flex-direction: column;
          padding: 80px 500px;
      `}
    >
      <div
        css={css`
            color: #313131;
            font-size: 36px;
            font-weight: 700;
        `}
      >
        회원 정보 수정
      </div>
      <div
        css={css`
            color: #616161;
            font-size: 20px;
            font-weight: 500;
            margin-top: 40px;
        `}
      >
        닉네임
      </div>
      <Input
        value={nickname}
        onChange={handleNicknameChange}
        id="nickname"
        label="nickname"
        variant="outlined"
        sx={{
          height: "50px",
          fontSize: "18px",
          fontFamily: "Pretendard",
        }}
        startAdornment={
          <div
            onClick={duplicateNicknameCheck}
            css={css({
              right: "20px",
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
            })}
          >
            중복확인
          </div>
        }
      />
      {nicknameDuplicationResponse && (
        <div
          css={css({
            fontSize: "15px",
            color:
              nicknameDuplicationResponse.code === "SU"
                ? "#0a8425"
                : "#f44336", // 코드가 SU이면 초록색, 아니면 빨간색
            margin: "8px 0px 0px 0px",
          })}
        >
          {nicknameDuplicationResponse.code === "SU"
            ? "사용 가능한 닉네임입니다."
            : nicknameDuplicationResponse.message}
        </div>
      )}
      <div
        css={css`
            color: #616161;
            font-size: 20px;
            font-weight: 500;
            margin-top: 40px;
        `}
      >
        아이디(이메일)
      </div>
      <div css={css`
          color: #1F1F1F;
          font-size: 22px;
          margin-top: 10px;
          font-weight: 400;
     `}>{email}</div>

      <div
        css={css`
            color: #616161;
            font-size: 20px;
            font-weight: 500;
            margin-top: 40px;
        `}
      >
        관심 분야
      </div>
      <FormControl
        sx={{
          minWidth: 380,
          marginTop: "15px",
        }}
      >
        <Select
          value={field}
          onChange={handleFieldChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          sx={{
            borderRadius: "15px",
            fontFamily: "Pretendard",
            width: "300px"
          }}
        >
          <MenuItem value="">
            <em>관심분야/직종 선택</em>
          </MenuItem>
          {interestFields.map((field, index) => (
            <MenuItem key={index} value={field}>
              {field}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div
        css={css`
            display: flex;
            margin-top: 40px;
            color: #616161;
            font-size: 20px;
            font-weight: 500;
        `}
      >
        비밀번호
        <PasswordChangeModal  setOpenPasswordSnackbar={setOpenPasswordSnackbar} />
      </div>
      <div css={css`
            display: flex;
          justify-content: center;
          margin-top: auto;
          
        `}>
      <OutlineButton margin="0px 0px 0px 5px" padding="12px 40px" fontSize="16px">
        취소하기
      </OutlineButton>
        <OutlineButton color="#607FB9"
                       border="1px #607FB9 solid"
                       padding="12px 40px"
                       fontSize="16px"
                       margin="0px 0px 0px 15px"
        onClick={onClickInfoChange}
        >
          변경하기
        </OutlineButton>
      </div>
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          회원정보가 성공적으로 수정되었습니다
        </Alert>
      </Snackbar>
      <Snackbar open={openPasswordSnackbar} autoHideDuration={3000} onClose={handleClosePasswordSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert
          onClose={handleClosePasswordSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          비밀번호가 변경되었습니다.
        </Alert>
      </Snackbar>
    </div>
  );
}
