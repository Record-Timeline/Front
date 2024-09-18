/** @jsxImportSource @emotion/react */

import * as React from 'react';
import {useEffect, useState} from "react";
import {css} from "@emotion/react";
import {FaRegTrashAlt} from "react-icons/fa";
import Input from "@mui/material/Input";
import {FaRegCircleCheck} from "react-icons/fa6";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import AlertDialog from "../common/AlertDialog";

function LanguageInput({ index, saveItem, initialData, createLanguage, updateLanguage, onDelete}) {
  const [languageName, setLanguageName] = useState(null); // 자격증 이름
  const [level, setLevel] = useState(3);
  const [hover, setHover] = useState(-1);
  const [alertOpen, setAlertOpen] = useState(false);

  function getLabelText(value) {
    return `${level} Star${level !== 1 ? 's' : ''}, ${labels[level]}`;
  }

  const labels = {
    1: 'VeryLow',
    2: 'Low',
    3: 'Middle',
    4: 'Good',
    5: 'VeryHigh',
  };

  useEffect(() => {
    setLanguageName(initialData.languageName);
    setLevel(initialData.proficiency);
  }, [initialData]);

  const handleSave = async () => {
    // 언어명, rating(레벨) 비어 있으면 alert dialog를 띄움
    if (!languageName || !level) {
      setAlertOpen(true); // AlertDialog를 열도록 상태 업데이트
      return;
    }
    const data = {
      languageName,
      level,
    };

    if (initialData.id) {
      await updateLanguage(index, data); // 기존 항목 업데이트 (생성)
    } else {
      createLanguage(data); // 새 항목 생성 (조회)
    }

    saveItem(index, data);
  };

  return (
    <div // 회색 박스
      css={css({
        width: "530px",
        height: "80px",
        background: "#f8f6f6",
        borderRadius: "30px",
        boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.04)",
        margin: "0 auto", // 페이지 중앙에 나타나도록 설정
        marginTop: "15px",
        marginBottom: "20px",
        display: "flex", // 내부 요소를 정렬하기 위한 flex 설정
        alignItems: "center", // 수직 중앙 정렬
        padding: "13px"
      })}
    >
      <div css={css({marginLeft: "13px", display: "flex", gap: "15px"})}>
        <div // 자격증 이름
          css={css({
            fontSize: "15px",
            color: "#212121",
            textAlign: "left",
            // display: "flex",
            // border: "1px solid black",
          })}
        >
          <Input
            sx={{
              width: '210px', // 전체 TextField의 너비를 설정
            }}
            placeholder="구사 가능한 언어를 입력하세요*"
            value={languageName}
            onChange={(e) => setLanguageName(e.target.value)}
            inputProps={{
              'aria-label': 'title input',
              style: {fontSize: '16px', fontFamily: "Pretendard"}
            }}
          />
        </div>
        <Box
          sx={{
            width: 200,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Rating
            name="hover-feedback"
            value={level}
            precision={1}
            getLabelText={getLabelText}
            onChange={(event, newLevel) => {
              setLevel(newLevel);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          />
          {level !== null && (
            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : level]}</Box>
          )}
        </Box>
      </div>
      <div // 완료하기 버튼 (생성, 수정)
        onClick={handleSave}
        css={css({
          color: "#829FD7",
          display: "flex", // 내부 요소를 정렬하기 위한 flex 설정
          alignItems: "center", // 수직 중앙 정렬
          marginLeft: "15px",
          cursor: "pointer",
        })}
      >
        {/*<FaRegCircleCheck/>*/}
        <AlertDialog
          icon={<FaRegCircleCheck />}
          // onConfirm={handleAlertClose}
          dialogTitle={"입력 오류"}
          dialogContent={"'언어', '레벨' 은 필수 입력 사항 입니다."}
          confirmText={null}
          cancelText={"확인"}
          // open={alertOpen} // open 상태 제어
          // onClose={handleAlertClose} // 닫기 핸들러
        />
      </div>
      <div // 삭제하기 버튼
        css={css({
          display: "flex", // 내부 요소를 정렬하기 위한 flex 설정
          alignItems: "center", // 수직 중앙 정렬
          marginLeft: "auto", // FaRegTrashAlt을 제일 오른쪽으로 배치
          marginRight: "10px",
          cursor: "pointer",
        })}
      >
        <AlertDialog
          icon={<FaRegTrashAlt style={{ color: "#E89494", fontSize: "16px", marginLeft: "1px" }} />}
          onConfirm={onDelete}
          dialogTitle={"정말로 삭제하시겠습니까?"}
          dialogContent={"해당 언어가 삭제됩니다."}
          confirmText={"삭제"}
          cancelText={"취소"}
        />
      </div>
    </div>
  )
}

export default LanguageInput;