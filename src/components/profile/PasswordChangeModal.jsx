/** @jsxImportSource @emotion/react */

import * as React from "react";
import OutlineButton from "../common/OutlineButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { css } from "@emotion/react";
import Input from "@mui/material/Input";
import Button from "../common/Button"
export default function PasswordChangeModal(props) {
  const [open, setOpen] = React.useState(false);
  const [nowPassword, setNowPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // 기존 비빌번호 입력값 업데이트
  const handleNowPasswordChange = (e) => {
    setNowPassword(e.target.value);
  };

  // 새로운 비빌번호 입력값 업데이트
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  // 새로운 비빌번호 확인 입력값 업데이트
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // 이메일 전송하기
  const emailPasswordConfrim = (e) => {
  };

  return (
    <React.Fragment>
      <OutlineButton
        onClick={handleClickOpen}
        color="#607FB9"
        border="1px #607FB9 solid"
        padding="12px 40px"
        fontSize="16px"
        margin="0px 0px 0px 15px"
      >
        변경하기
      </OutlineButton>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="md"
        PaperProps={{
          sx: {
            padding: '50px 60px',
            height: "65%"
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
            회원정보에 입력한 이메일으로 인증한 후에 비밀번호를 변경할 수 있습니다.
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
              width: '400px',
              height: "50px",
              fontSize: "16px",
              fontFamily: "Pretendard",
            }}
            startAdornment={
              <div
                onClick={emailPasswordConfrim}
                css={css({
                  right: "5px",
                  width: '100px',
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
                인증번호 발송
              </div>}
          />

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
              width: '400px',
            }}
          />
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
              width: '400px',
            }}
          />
          <DialogActions sx={{display: 'flex', justifyContent: "center", marginTop: "65px"}}>
            <OutlineButton onClick={handleClose} padding="8px 35px" fontSize="16px">
              취소하기
            </OutlineButton>
            <OutlineButton onClick={handleClose} margin="0px 0px 0px 5px" padding="8px 35px" fontSize="16px"
                           color="#607FB9"
                           border="1px #607FB9 solid">변경하기</OutlineButton>
          </DialogActions>
        </div>
      </Dialog>
    </React.Fragment>
  );
}
