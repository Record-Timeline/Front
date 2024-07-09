/** @jsxImportSource @emotion/react */

import React, {useState} from "react";
import {css} from "@emotion/react";
import {FiLock, FiUnlock} from "react-icons/fi";
import {GoPencil} from "react-icons/go";
import {FaRegTrashAlt} from "react-icons/fa";
import AlertDialog from "../common/AlertDialog";
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

function MainTimelineItem({mainTimelineId, startDate, endDate, title, onEdit, onDelete, }) {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleTitleClick = () => {
    // navigate(`/subtimeline/${mainTimelineId}`, { state: { title } });
    navigate(`/subtimeline/${mainTimelineId}`);
  };

  return (
    <div // 회색 타임라인 박스
      css={css({
        width: "810px",
        height: "85px",
        background: "#f8f6f6",
        borderRadius: "30px",
        boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.04)",
        textAlign: "center",
        margin: "0 auto", /* 페이지 중앙에 나타나도록 설정 */
        marginTop: "45px",
        marginBottom: "32px",
        display: "flex",
      })}
    >
      <div // 체크표시
        done={isChecked}
        onClick={() => setIsChecked(!isChecked)}
        css={css`
            width: 22px;
            height: 22px;
            border-radius: 20px;
            border: 3px solid #829FD7;
            float: left;
            display: inline-block;
            //margin: 35px;
            margin-top: 31px;
            margin-left: 40px;
            cursor: pointer;
            background-color: ${isChecked ? "#829FD7" : "none"};
        `}
      />
      <div // 기간
        css={css({
          // flex: "1.5",
          width: "230px",
          color: "#666",
          fontFamily: "Pretendard",
          fontSize: "16px",
          fontStyle: "normal",
          fontWeight: "500",
          lineHeight: "85px",
          //float: left;
          textAlign: "left", // center로 할 지 고민
          marginRight: "15px",
          marginLeft: "40px",
          display: "inline-block",
          // border: "1px solid black",
        })}
      >
        {dayjs(startDate).format('YYYY.MM.DD')} ~ {endDate ? dayjs(endDate).format('YYYY.MM.DD') : '진행중'}
      </div>
      <div // 공개 여부 (자물쇠 아이콘)
        css={css({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "30px",
          marginRight: "15px",
          // border: "1px solid black",
        })}
      >
        <FiUnlock/>
      </div>
      <div // 타임라인 제목
        onClick={handleTitleClick} // 제목 클릭시 해당 서브 타임라인으로 이동
        css={css({
          flex: "1",
          fontSize: "16px",
          //font-weight: 550;
          color: "#212121",
          //float: left;
          textAlign: "left",
          lineHeight: "85px",
          marginLeft: "20px",
          display: "inline-block",
          cursor: "pointer",
          // border: "1px solid black",
        })}
      >
        {title}
      </div>
      <div // 수정하기 (연필 아이콘)
        onClick={onEdit}
        css={css({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // margin: "0 25px", // 좌우 마진을 25px로 설정
          marginLeft: "10px",
          marginRight: "5px",
          cursor: "pointer",
          // border: "1px solid black",
        })}
      >
        <GoPencil/>
      </div>
      <div // 삭제하기 (쓰레기통 아이콘)
        css={css({
          color: "#829FD7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // margin: "0 25px", // 좌우 마진을 25px로 설정
          marginRight: "29px",
          cursor: "pointer",
          // border: "1px solid black",
        })}
      >
        {/*<FaRegTrashAlt/>*/}
        <AlertDialog
          icon={<FaRegTrashAlt/>}
          onConfirm={onDelete}
          dialogTitle={"정말로 삭제하시겠습니까?"}
          dialogContent={"메인 타임라인을 삭제하면 해당 타임라인 안에 들어있는 서브 타임라인들도 모두 삭제됩니다."}
          confirmText={"삭제"}
          cancelText={"취소"}
        />
      </div>
    </div>
  );
}

export default MainTimelineItem;