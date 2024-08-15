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
          // color: '#7286AD', // 텍스트 색상
          '&:hover': {
            border: "2px solid #829FD7",
          }
        }}
        variant="outlined" // 이거 없애면 padding이 없어짐
        onClick={handleClickOpen}>
        내 경력 사항 수정
      </Button>
      <Dialog
        sx={{
          '& .MuiPaper-root': { // Dialog의 내부 Paper 컴포넌트에 스타일 적용
            width: '600px', // 모달 창의 너비를 설정
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
          {/*{"경력사항"}*/}
          <h2>경력사항</h2>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {/*<h2>경력</h2>*/}
            {/*<div>*/}
            {/*  hjkhkjhjkhjkhkjhjkbjk*/}
            {/*</div>*/}
            {/*<h2>학력</h2>*/}
            {/*<h2>자격증</h2>*/}
            {/*<h2>외국어</h2>*/}
            <Section title="경력" items={[
              { company: '삼성전자', period: '2022년 1월 ~ 현재', role: '개발 / 사원' },
              { company: '배달의 민족', period: '2020년 7월 ~ 2021년 12월', role: 'Computer engineering / 인턴' },
            ]} />
            <Section title="학력" items={[
              { school: '연세대학교', period: '18-03-02 ~ 22-02-10', degree: '대학원' },
              { school: '성신여자대학교 컴퓨터공학과', period: '18-03-02 ~ 22-02-10', degree: '학부' },
            ]} />
            <Section title="자격증" items={[
              { certificate: '정보처리기사', date: '20-04-09' },
              { certificate: 'SQLD', date: '20-06-01' },
            ]} />
            <LanguageSection title="외국어" languages={[
              { language: '영어', level: 3 },
              { language: '프랑스어', level: 2 },
            ]} />
          </DialogContentText>
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
