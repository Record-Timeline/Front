/** @jsxImportSource @emotion/react */

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import {css} from "@emotion/react";
import AddIcon from '@mui/icons-material/Add';
import Career from '../career/Career';
import Education from '../career/Education';
import Certificate from "../career/Certificate";
import Language from "../career/Language";
import CareerInput from "../career/CareerInput";
import EducationInput from "../career/EducationInput";

export default function CareerModal() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        sx={{
          borderRadius: '30px', // 둥근 모서리 반경 설정
          border: "2px solid #829FD7",
          '&:hover': {
            border: "2px solid #829FD7",
          }
        }}
        variant="outlined" // 이거 없애면 padding이 없어짐
        onClick={handleClickOpen}>
        내 경력 사항 수정
      </Button>
      <Dialog
        maxWidth={false}
        sx={{
          '& .MuiPaper-root': { // Dialog의 내부 Paper 컴포넌트에 스타일 적용
            width: '650px', // 모달 창의 너비를 설정
            borderRadius: '25px', // 둥근 모서리 반경 설정
            padding: '20px',
          }
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <h3>경력사항</h3>
        </DialogTitle>
        <DialogContent>
          <div
            css={css({
              margin: "0 10px",
              // border: "2px solid #829FD7",
            })}
          >
            <div css={css({display: "flex", alignItems: "center", gap: "1px",})}>
              <h2>경력</h2>
              <IconButton aria-label="delete">
                <AddIcon/>
              </IconButton>
            </div>
            <Career/>
            <CareerInput/>

            <div css={css({display: "flex", alignItems: "center", gap: "1px",})}>
              <h2>학력</h2>
              <IconButton aria-label="delete">
                <AddIcon/>
              </IconButton>
            </div>
            <Education/>
            <EducationInput/>

            <div css={css({display: "flex", alignItems: "center", gap: "1px",})}>
              <h2>자격증</h2>
              <IconButton aria-label="delete">
                <AddIcon/>
              </IconButton>
            </div>
            <Certificate/>
            <Certificate/>

            <div css={css({display: "flex", alignItems: "center", gap: "1px",})}>
              <h2>외국어</h2>
              <IconButton aria-label="delete">
                <AddIcon/>
              </IconButton>
            </div>
            <Language/>
            <Language/>
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}