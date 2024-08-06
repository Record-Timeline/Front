/** @jsxImportSource @emotion/react */

import * as React from 'react'
import {useState} from "react";
import {css} from "@emotion/react";
import Button from "../common/Button";
import {FiLock, FiUnlock} from "react-icons/fi";
import CustomizedSelects from "../timeline/CustomizedSelects";
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import dayjs from "dayjs";
import axiosInstance from "../../utils/axiosInstance";

const label = {inputProps: {'aria-label': 'Checkbox demo'}};

export default function OthersSubTimelinePost({item, isDone}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [like, setLike] = useState(204); // 좋아요 수 임의로 설정
  const [bookmark, setBookmark] = useState(53) // 북마크 수 임의로 설정

  const onClickLike = () => {
    if (isLiked) {
      setLike(like - 1); // 좋아요 해제 시 좋아요 수 감소
    } else {
      setLike(like + 1); // 좋아요 누를 시 좋아요 수 증가
    }
    setIsLiked(!isLiked); // 좋아요 상태 토글
  }

  const onClickBookmark = async () => {
    if (isBookmarked) {
      // 북마크 취소 연동
      try {
        const response = await axiosInstance.post(
          `/api/v1/bookmarks/toggle`,
          {
            subTimelineId: item.id
          }
        );
        setBookmark(bookmark - 1); // 북마크 해제 시 북마크 수 감소
        console.log("북마크 취소 완료", response);
      } catch (error) {
        console.log("북마크 취소 오류", error);
        console.error("에러 상세:", error.response ? error.response.data : error.message);
      }
    } else {
      // 북마크 연동
      try {
        const response = await axiosInstance.post(
          `/api/v1/bookmarks/toggle`,
          {
            subTimelineId: item.id
          }
        );
        setBookmark(bookmark + 1) // 북마크 누를 시 북마크 수 증가
        console.log("북마크 완료", response)
      } catch (error) {
        console.log("북마크 연동 오류", error);
        console.error("에러 상세:", error.response ? error.response.data : error.message);
      }
    }
    setIsBookmarked(!isBookmarked); // 북마크 상태 토글
  }

  return (
    <div>
      <div // SubTimelineItem2 (상단에 뜨는 아이템) (회색 박스)
        css={css({
          width: "680px",
          height: "65px",
          background: "#f8f6f6",
          borderRadius: "30px",
          boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.04)",
          textAlign: "center",
          margin: "0 auto", /* 페이지 중앙에 나타나도록 설정 */
          marginTop: "20px",
          marginBottom: "32px",
          display: "flex",
        })}
      >
        <div // 체크표시
          done={isDone}
          css={css`
              width: 21px;
              height: 21px;
              border-radius: 50%;
              border: 3px solid #829FD7;
              float: left;
              display: inline-block;
              margin-top: 22px;
              margin-left: 35px;
              margin-right: 15px;
              background-color: ${isDone ? "#829FD7" : "#f8f6f6"};
          `}
        />
        <div // 기간
          css={css({
            // flex: "1.5",
            width: "200px",
            color: "#666",
            fontSize: "15px",
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "65px",
            //float: left;
            textAlign: "left",
            marginLeft: "10px",
            display: "inline-block",
            // border: "1px solid black",
          })}
        >
          {dayjs(item.startDate).format('YYYY.MM.DD')} ~ {item.endDate ? dayjs(item.endDate).format('YYYY.MM.DD') : '진행중'}
        </div>
        <div // 타임라인 제목
          css={css({
            flex: "1",
            fontSize: "15px",
            //font-weight: 550;
            color: "#212121",
            //float: left;
            textAlign: "left",
            lineHeight: "65px",
            display: "inline-block",
            // border: "1px solid black",
          })}
        >
          {item.title}
        </div>
      </div>
      <div // 텍스트 나오는 박스
        css={css({
          width: "680px",
          height: "600px",
          background: "#f8f6f6",
          borderRadius: "30px",
          boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.04)",
          textAlign: "left",
          margin: "0 auto", /* 페이지 중앙에 나타나도록 설정 */
        })}
      >
        <div
          css={css({
            height: "580px",
            fontSize: "15px",
            color: "#525252",
            padding: "50px",
            overflowY: "scroll",
          })}
          dangerouslySetInnerHTML={{ __html: item.content }} // 저장된 글 내용을 표시
        />
      </div>
      <div // 좋아요, 북마크 감싸는 div
        css={css({
          width: "700px",
          textAlign: "right",
          margin: "0 auto",
          marginTop: "20px",
          // border: "1px solid #f8f6f6",
        })}
      >
        <Checkbox
          like={isLiked} // 좋아요 버튼 눌렀는지 여부
          onClick={onClickLike}
          {...label}
          icon={<FavoriteBorder/>}
          checkedIcon={<Favorite/>}
          css={css({
            display: "inline-block",
            "&.Mui-checked": {
              color: "#A9BDE5",
            },
          })}
        />
        <p css={css({display: "inline-block",})}>{like}</p>
        <Checkbox
          bookmark={isBookmarked} // 북마크 버튼 눌렀는지 여부
          onClick={onClickBookmark}
          {...label}
          icon={<BookmarkBorderIcon/>}
          checkedIcon={<BookmarkIcon/>}
          css={css({
            display: "inline-block",
            "&.Mui-checked": {
              color: "#F7DB79",
            },
          })}
        />
        <p css={css({display: "inline-block", marginRight: "20px"})}>{bookmark}</p>
      </div>
    </div>
  )
}
