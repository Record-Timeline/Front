/** @jsxImportSource @emotion/react */

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, Typography, Divider } from '@mui/material';
import {css} from "@emotion/react";
import {GoPencil} from "react-icons/go";
import Career from '../career/Career';
import Education from '../career/Education';

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
            <h2>경력</h2>
            <Career/>
            <Career/>
            <h2>학력</h2>
            <Education/>
            <Education/>
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

function Section({ title, items }) {
  return (
    <div css={css({ marginBottom: '20px' })}>
      <Typography variant="h6" component="div" css={css({ marginBottom: '10px' })}>
        {title} +
      </Typography>
      {items.map((item, index) => (
        <div key={index} css={css({
          background: '#f8f6f6',
          borderRadius: '10px',
          padding: '10px',
          marginBottom: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        })}>
          <div>
            <Typography variant="body1" component="div">
              {item.company || item.school || item.certificate}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {item.period || item.date}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {item.role || item.degree}
            </Typography>
          </div>
          <IconButton>
            <GoPencil />
          </IconButton>
        </div>
      ))}
    </div>
  );
}

function LanguageSection({ title, languages }) {
  return (
    <div css={css({ marginBottom: '20px' })}>
      <Typography variant="h6" component="div" css={css({ marginBottom: '10px' })}>
        {title} +
      </Typography>
      {languages.map((lang, index) => (
        <div key={index} css={css({
          background: '#f8f6f6',
          borderRadius: '10px',
          padding: '10px',
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center'
        })}>
          <Typography variant="body1" component="div" css={css({ flex: 1 })}>
            {lang.language}
          </Typography>
          <Typography variant="body2" component="div" css={css({ margin: '0 10px' })}>
            low
          </Typography>
          <input
            type="range"
            min="1"
            max="5"
            value={lang.level}
            readOnly
            css={css({
              flex: 2,
              margin: '0 10px'
            })}
          />
          <Typography variant="body2" component="div" css={css({ margin: '0 10px' })}>
            high
          </Typography>
        </div>
      ))}
    </div>
  );
}
