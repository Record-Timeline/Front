/** @jsxImportSource @emotion/react */

import * as React from 'react'
import {useState, useEffect} from "react";
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
import AlertDialog from "../common/AlertDialog";
import axiosInstance from "../../utils/axiosInstance";

const label = {inputProps: {'aria-label': 'Checkbox demo'}};

export default function ReadSubTimelinePost({item, onDelete, onEdit}) {
  const [isChecked, setIsChecked] = useState(false); // 타임라인 체크 circle 상태
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [like, setLike] = useState(item.likeCount); // 좋아요 수
  const [bookmark, setBookmark] = useState(item.bookmarkCount) // 북마크 수

  // 좋아요 및 북마크 상태 연동
  const bookmarkAndLikeStatus = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/sub-timelines/${item.id}/like-bookmark`);
      console.log("좋아요/북마크 상태 체크", response.data);
      if (response.data.liked) { // 좋아요 여부 상태 체크
        setIsLiked(true);
      }
      if (response.data.bookmarked) { // 북마크 여부 상태 체크
        setIsBookmarked(true);
      }
    } catch (error) {
      console.log("좋아요/북마크 상태 체크 오류", error);
      console.error("에러 상세:", error.response ? error.response.data : error.message);
    }
  }

  useEffect(() => {
    bookmarkAndLikeStatus();
  }, [])

  const onClickLike = async () => {
    if (isLiked) {
      // 좋아요 취소 연동
      try {
        const response = await axiosInstance.post(
          `/api/v1/likes/toggle`,
          {
            subTimelineId: item.id
          }
        );
        // setLike(like - 1); // 좋아요 해제 시 좋아요 수 감소
        setLike(response.data.likeCount); // 좋아요 수 갱신
        console.log("좋아요 취소 완료", response);
      } catch (error) {
        console.log("좋아요 취소 오류", error);
        console.error("에러 상세:", error.response ? error.response.data : error.message);
      }
    } else {
      // 좋아요 연동
      try {
        const response = await axiosInstance.post(
          `/api/v1/likes/toggle`,
          {
            subTimelineId: item.id
          }
        );
        // setLike(like + 1); // 좋아요 누를 시 좋아요 수 증가
        setLike(response.data.likeCount); // 좋아요 누를 시 좋아요 수 증가 (좋아요 수 갱신)
        console.log("좋아요 완료", response)
      } catch (error) {
        console.log("좋아요 연동 오류", error);
        console.error("에러 상세:", error.response ? error.response.data : error.message);
      }
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
        // setBookmark(bookmark - 1); // 북마크 해제 시 북마크 수 감소
        setBookmark(response.data.bookmarkCount) // 북마크 수 갱신
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
        // setBookmark(bookmark + 1) // 북마크 누를 시 북마크 수 증가
        setBookmark(response.data.bookmarkCount) // 북마크 누를 시 북마크 수 증가 (북마크 수 갱신)
        console.log("북마크 완료", response);
      } catch (error) {
        console.log("북마크 연동 오류", error);
        console.error("에러 상세:", error.response ? error.response.data : error.message);
      }
    }
    setIsBookmarked(!isBookmarked); // 북마크 상태 토글
  }

  return (
    <div>
      <div css={css({marginBottom: "20px"})}>
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
            done={isChecked}
            onClick={() => setIsChecked(!isChecked)}
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
                cursor: pointer;
                background-color: ${isChecked ? "#829FD7" : "#f8f6f6"}; // 선 때문에 뚫린 원일 때도 배경 색 설정
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
          <div // 공개 여부 (자물쇠 아이콘) (이 버전 vs 아래 버전 논의)
            css={css({
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "10px",
              marginRight: "40px",
              // border: "1px solid black",
            })}
          >
            {item.isPublic ? <FiUnlock/> : <FiLock/>} {/* 비공개면 FiLock, 공개면 FiUnlock : 삼항 연산자*/}
          </div>
        </div>
        <div // 텍스트 나오는 박스
          css={css({
            width: "680px",
            height: "570px",
            background: "#f8f6f6",
            borderRadius: "30px",
            boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.04)",
            textAlign: "left",
            margin: "0 auto", /* 페이지 중앙에 나타나도록 설정 */
          })}
        >
          <div // 내용
            css={css({
              height: "550px",
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
            // border: "1px solid #000",
          })}
        >
          <Checkbox
            checked={isLiked} // 좋아요 버튼 눌렀(었)는지 여부 (상태 체크, 눌렀다면 누른 상태를 유지하기 위함)
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
            checked={isBookmarked} // 북마크 버튼 눌렀(었)는지 여부 (상태 체크, 눌렀다면 누른 상태를 유지하기 위함)
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
        <div // 수정, 삭제 버튼 감싸는 div
          css={css({
            textAlign: "center",
            // marginTop: "20px",
            marginBottom: "50px",
            // border: "1px solid black",
          })}
        >
          <AlertDialog
            icon={
              <Button
                width="120px"
                height="40px"
                margin="0px 15px"
                backgroundColor="#FFF"
                textColor="#F19797"
                fontSize="15px"
                border="2px solid #FFBDBD"
                borderRadius="50px"
                display="inline-block"
                lineHeight="18px"
              >
                삭제하기
              </Button>
            }
            onConfirm={() => onDelete(item)}
            dialogTitle="정말로 삭제하시겠습니까?"
            dialogContent="해당 서브 타임라인에 작성한 글도 함께 삭제됩니다."
            confirmText="삭제"
            cancelText="취소"
            />
          <Button
            onClick={() => onEdit(item)}
            width="120px"
            height="40px"
            margin="0px 15px"
            backgroundColor="#FFF"
            textColor="#7286AD"
            fontSize="15px"
            border="2px solid #829FD7"
            borderRadius="50px"
            display="inline-block"
            lineHeight="18px"
          >
            수정하기
          </Button>
        </div>
      </div>
    </div>
  );
}
