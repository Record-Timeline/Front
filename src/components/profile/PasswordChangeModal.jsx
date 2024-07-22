/** @jsxImportSource @emotion/react */

import * as React from "react";
import OutlineButton from "../common/OutlineButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { css } from "@emotion/react";
import Input from "@mui/material/Input";
import axiosInstance from "../../utils/axiosInstance";
import { useState, useCallback } from "react";

export default function PasswordChangeModal({ setOpenPasswordSnackbar }) {
  const [open, setOpen] = useState(false);
  const [nowPassword, setNowPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nowPasswordError, setNowPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [passwordError, setPasswordError] = useState("");


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // 기존 비밀번호 입력값 업데이트
  const handleNowPasswordChange = (e) => {
    setNowPassword(e.target.value);
  };

  // 비밀번호 유효성 검사 함수
  const validatePassword = (password) => {
    // 숫자, 영문자 포함 여부 확인
    const containsNumber = /[0-9]/.test(password);
    const containsLetter = /[a-zA-Z]/.test(password);

    // 비밀번호 길이 확인
    const isLengthValid = password.length >= 8;

    // 비밀번호가 유효하지 않을 경우
    if (!(containsNumber && containsLetter && isLengthValid)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  // 새로운 비밀번호 입력값 업데이트 및 유효성 검사
  const handleNewPasswordChange = (e) => {
    const newPassword = e.target.value;
    setNewPassword(newPassword);
    validatePassword(newPassword);
    setPasswordMatchError(newPassword !== confirmPassword);
  };

  // 새로운 비밀번호 확인 입력값 업데이트
  const handleConfirmPasswordChange = useCallback(
    (e) => {
      const rePassword = e.target.value;
      setConfirmPassword(rePassword);
      setPasswordMatchError(rePassword !== newPassword);
    },
    [newPassword]
  );

  const handleChangePassword = async () => {
    // 비밀번호를 입력하지 않은 경우 에러 메시지
    if (nowPassword.trim() === "") {
      setNowPasswordError("비밀번호를 입력하세요.");
      return;
    }
    // 새로운 비밀번호를 입력하지 않은 경우 에러 메시지
    if (newPassword.trim() === "") {
      setNewPasswordError("비밀번호를 입력하세요.");
      return;
    }
    // 새로운 비밀번호 확인을 입력하지 않은 경우 에러 메시지
    if (confirmPassword.trim() === "") {
      setPasswordMatchError("새로운 비밀번호를 입력하세요.");
      return;
    }
    // 비밀번호가 유효하지 않은 경우 에러 메시지
    if (passwordError) {
      setNewPasswordError("비밀번호는 숫자와 영문자를 포함하여 최소 8자 이상이어야 합니다.");
      return;
    }
    // 비밀번호가 일치하지 않는 경우 에러 메시지
    if (newPassword !== confirmPassword) {
      setPasswordMatchError("새로운 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const updateResponse = await axiosInstance.put(
        `/api/v1/update-password`,
        { oldPassword: nowPassword, newPassword: newPassword },
        {
          headers: {
            Accept: "*/*",
            "Content-Type": `application/json`,
          },
        }
      );
      console.log("비밀번호 변경", updateResponse);
      if (updateResponse.data.code === "SU") {
        console.log("비밀번호 변경 성공");
        setOpenPasswordSnackbar(true)
        handleClose();
        // 값들 초기화
        setNowPassword("")
        setNewPassword("")
        setConfirmPassword("")
        setNowPasswordError("")
        setNewPasswordError("")
        setPasswordMatchError("")
        setPasswordError("")

      } else {
        console.error("비밀번호 변경 실패", updateResponse.data);
        if (updateResponse.data.code === "PM") {
          setNowPasswordError(updateResponse.data.message)
        }
      }
    } catch (error) {
      console.error("비밀번호 변경 에러", error);
    }
  };

  return (
    <React.Fragment>
      <div
        onClick={handleClickOpen}
        css={css({
          padding: "0px 15px",
          marginLeft: "25px",
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
        })}
      >
        인증하고 비밀번호 변경하기
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="md"
        PaperProps={{
          sx: {
            padding: "50px 60px",
            height: "75%",
          },
        }}
      >
        <div>
          <div
            css={css`
                color: #313131;
                font-size: 32px;
                font-weight: 700;
            `}
          >
            비밀번호 변경
          </div>
          <div
            css={css`
                color: #616161;
                font-size: 18px;
                font-weight: 400;
            `}
          >
            기존 비밀번호를 입력 후 비밀번호를 변경할 수 있습니다.
          </div>
          <div
            css={css`
                color: #616161;
                font-size: 16px;
                font-weight: 500;
                margin-top: 50px;
            `}
          >
            기존 비밀번호 입력
          </div>
          <Input
            value={nowPassword}
            onChange={handleNowPasswordChange}
            id="nowPassword"
            label="nowPassword"
            variant="nowPassword"
            sx={{
              width: "400px",
              height: "50px",
              fontSize: "16px",
              fontFamily: "Pretendard",
            }}
          />
          {nowPasswordError && (
            <div
              css={css({
                color: "#f44336",
                fontSize: "15px",
                marginTop: "10px"
              })}
            >
              {nowPasswordError}
            </div>
          )}
          <div
            css={css`
                color: #616161;
                font-size: 16px;
                font-weight: 500;
                margin-top: 20px;
            `}
          >
            새로운 비밀번호 입력
          </div>
          <Input
            value={newPassword}
            onChange={handleNewPasswordChange}
            id="newPassword"
            label="newPassword"
            variant="newPassword"
            sx={{
              height: "50px",
              fontSize: "16px",
              fontFamily: "Pretendard",
              width: "400px",
            }}
          />
          {newPasswordError && (
            <div
              css={css({
                color: "#f44336",
                fontSize: "15px",
                marginTop: "10px",
              })}
            >
              비밀번호는 숫자와 영문자를 포함하여 최소 8자 이상이어야 합니다.
            </div>
          )}
          <div
            css={css`
                color: #616161;
                font-size: 16px;
                font-weight: 500;
                margin-top: 20px;
            `}
          >
            새로운 비밀번호 확인
          </div>
          <Input
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            id="confirmPassword"
            label="confirmPassword"
            variant="confirmPassword"
            sx={{
              height: "50px",
              fontSize: "16px",
              fontFamily: "Pretendard",
              width: "400px",
            }}
          />
          {passwordMatchError && (
            <div
              css={css({
                color: "#f44336",
                fontSize: "15px",
                marginTop: "10px",
              })}
            >
              새로운 비밀번호와 확인 비밀번호가 일치하지 않습니다.
            </div>
          )}
          <DialogActions
            sx={{ display: "flex", margin: "0px -60px",justifyContent: "center", width: "100%", bottom: "20px", position: "absolute", alignItems: "center" }}
          >
            <OutlineButton onClick={handleClose} padding="8px 35px" fontSize="16px">
              취소하기
            </OutlineButton>
            <OutlineButton
              onClick={handleChangePassword}
              margin="0px 0px 0px 5px"
              padding="8px 35px"
              fontSize="16px"
              color="#607FB9"
              border="1px #607FB9 solid"
            >
              변경하기
            </OutlineButton>
          </DialogActions>
        </div>
      </Dialog>

    </React.Fragment>
  );
}
