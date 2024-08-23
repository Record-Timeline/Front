/** @jsxImportSource @emotion/react */

import * as React from 'react';
import {useEffect, useState} from "react";
import {css} from "@emotion/react";
import {FaRegTrashAlt} from "react-icons/fa";
import dayjs from 'dayjs';
import DatePickerValue from "../common/DatePickerValue";
import Input from "@mui/material/Input";
import {FaRegCircleCheck} from "react-icons/fa6";

function CertificateInput({index, createCertificate, saveItem, initialData, onDelete, updateCertificate}) {
  const [certificateName, setCertificateName] = useState(null); // 자격증 이름
  const [date, setDate] = useState(null);

  useEffect(() => {
    setCertificateName(initialData.name);
    setDate(initialData.date ? dayjs(initialData.date) : null);
  }, [initialData]);

  const handleSave = async () => {
    // alert dialog 추가해야 함
    const data = {
      certificateName,
      date: date ? dayjs(date).format('YYYY-MM-DD') : null,
    };

    if (initialData.id) {
      await updateCertificate(index, data); // 기존 항목 업데이트 (생성)
    } else {
      createCertificate(data); // 새 항목 생성 (조회)
    }

    saveItem(index, data);
  };

  return (
    <div // 회색 박스
      css={css({
        width: "530px",
        height: "130px",
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
      <div css={css({marginLeft: "13px"})}>
        <div // 자격증 이름
          css={css({
            fontSize: "15px",
            color: "#212121",
            textAlign: "left",
            marginTop: "8px",
            // border: "1px solid black",
          })}
        >
          <Input
            sx={{
              width: '300px', // 전체 TextField의 너비를 설정
            }}
            placeholder="자격증 이름을 입력하세요."
            value={certificateName}
            onChange={(e) => setCertificateName(e.target.value)}
            inputProps={{
              'aria-label': 'title input',
              style: {fontSize: '16px', fontFamily: "Pretendard"}
            }}
          />
        </div>
        <div // 날짜
          css={css({
            color: "#666",
            fontSize: "17px",
            display: "flex", // 필수
            alignItems: "center", // 수직 가운데 정렬
            marginTop: "13px",
            // border: "1px solid black",
          })}
        >
          <DatePickerValue
            views={['year', 'month']}
            label="취득년월"
            format="YYYY년 MM월"
            value={date}
            onChange={setDate}
            css={css({width: "150px",})}
          />
        </div>
      </div>
      <div // 완료하기 버튼 (생성, 수정)
        onClick={handleSave}
        css={css({
          color: "#829FD7",
          display: "flex", // 내부 요소를 정렬하기 위한 flex 설정
          alignItems: "center", // 수직 중앙 정렬
          marginLeft: "140px",
          cursor: "pointer",
        })}
      >
        <FaRegCircleCheck/>
      </div>
      <div // 삭제하기 버튼
        onClick={onDelete}
        css={css({
          color: "#E89494",
          display: "flex", // 내부 요소를 정렬하기 위한 flex 설정
          alignItems: "center", // 수직 중앙 정렬
          marginLeft: "auto", // FaRegTrashAlt을 제일 오른쪽으로 배치
          marginRight: "10px",
          cursor: "pointer",
        })}
      >
        <FaRegTrashAlt/>
      </div>
    </div>
  )
}

export default CertificateInput;