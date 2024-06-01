/** @jsxImportSource @emotion/react */

import React, {useEffect, useState} from "react";
import { css } from "@emotion/react";
import axiosInstance from "../utils/axiosInstance";
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';

export default function ModifyProfile() {
  const [nickname, setNickname] = useState("");
const [nicknameDuplicationResponse, setNicknameDuplicationResponse] = useState("");
  const [nicknameDuplicationResult, setNicknameDuplicationResult] = useState(false);

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
  const interestMapping = {
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

// 닉네임 중복확인 버튼
  const duplicateNicknameCheck = async () => {
    // 닉네임을 입력하지 않은 경우
    if (nickname.trim() === "") {
      setNicknameDuplicationResponse({ code: "ER", message: "닉네임을 입력하세요." });
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


  // 추천 레코더 데이터 연동
  const fetchRecorderData = async () => {
    try {
      //const response = await axiosInstance.get(`/api/v1/main/member/${englishInterest}`);
      // setRecorderData(response.data);
      //console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 닉네임 입력 값 업데이트
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
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
            height: '50px',
          fontSize: "18px",
          fontFamily: "Pretendard"

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
                : "#f44336", // 코드가 SU이면 빨간색, 아니면 초록색
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
      <div
        css={css`
            color: #616161;
            font-size: 20px;
            font-weight: 500;
            margin-top: 40px;
        `}
      >
        전화번호
      </div>
    </div>
  );
}
