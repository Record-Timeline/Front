/** @jsxImportSource @emotion/react */

import React, {useEffect, useState} from "react";
import {css} from "@emotion/react";
import {FaRegTrashAlt} from "react-icons/fa";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Checkbox from "@mui/material/Checkbox";
import dayjs from "dayjs";
import {useSelector} from "react-redux";
import axiosInstance from "../../utils/axiosInstance";

const label = {inputProps: {'aria-label': 'Checkbox demo'}};

export default function SubCommentDisplay({subComment, setSubCommentCount, deleteSubComment}) {
  const myNickname = useSelector(state => state.nickname); // 리덕스: 내 닉네임

  const [isCommentLiked, setIsCommentLiked] = useState(false); // 대댓글 좋아요 상태
  const [commentLike, setCommentLike] = useState(7); // 대댓글 좋아요 수

  // 대댓글 좋아요 상태 연동
  const commentLikeStatus = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/replies/${subComment.data.id}/like/status`);
      console.log("대댓글 좋아요 상태 체크", response.data);
      if (response.data) {
        setIsCommentLiked(true);
      } else {
        setIsCommentLiked(false);
      }
    } catch (error) {
      console.log("대댓글 좋아요 상태 체크 오류", error);
      console.error("에러 상세:", error.response ? error.response.data : error.message);
    }
  }

  useEffect(() => {
    commentLikeStatus();
  }, [])

  if(!subComment?.data) {
    console.log("Sub Comment data is missing or undefined");
    return null; // 데이터가 없을 경우 렌더링하지 않음
  }

  const { nickname, content, createdDate } = subComment.data

  // 대댓글 좋아요 토글
  const onClickCommentLike = async () => {
    if (isCommentLiked) {
      // 좋아요 취소 연동
      try {
        const response = await axiosInstance.post(`/api/v1/replies/${subComment.data.id}/like`)
        setCommentLike(response.data.likeCount); // 좋아요 수 갱신
        console.log("대댓글 좋아요 취소 완료", response)
      } catch (error) {
        console.log("대댓글 좋아용 취소 오류", error);
        console.error("에러 상세:", error.response ? error.response.data : error.message);
      }
    } else {
      // 좋아요 연동
      try {
        const response = await axiosInstance.post(`/api/v1/replies/${subComment.data.id}/like`)
        setCommentLike(response.data.likeCount); // 좋아요 수 갱신
        console.log("대댓글 좋아요 완료", response)
      } catch (error) {
        console.log("대댓글 좋아용 오류", error);
        console.error("에러 상세:", error.response ? error.response.data : error.message);
      };
    }
    setIsCommentLiked(!isCommentLiked); // 좋아요 상태 토글
  }

  return (
    <div // 댓글
      css={css({
        padding: "13px 0px 0 30px",
        // marginLeft: "10px",
        backgroundColor: "rgba(245,246,248,0.72)"
        // border: "1px solid black",
      })}
    >
      <div
        css={css({
          display: "flex",
          alignItems: "center",
        })}
      >
        <div // 닉네임 + 작성일시
          css={css({
            display: "flex",
            alignItems: "center",
            gap: "15px",
            // border: "1px solid red",
          })}
        >
          <b>{subComment.data.nickname || "익명"}</b>
          <div css={css({fontSize: "13px", color: "#A5A5A5"})}>
            {dayjs(subComment.data.createdDate).format('YY-MM-DD HH:mm')}
          </div>
        </div>
        <div css={css({display: "flex", alignItems: "center", fontSize: "15px"})}>
          <Checkbox
            checked={isCommentLiked} // 좋아요 버튼 눌렀(었)는지 여부 (상태 체크, 눌렀다면 누른 상태를 유지하기 위함)
            onClick={onClickCommentLike}
            {...label}
            icon={<ThumbUpOffAltIcon fontSize="small"/>}
            checkedIcon={<ThumbUpAltIcon fontSize="small"/>}
            css={css({
              display: "flex",
              marginLeft: "8px",
              "&.Mui-checked": {
                color: "#81ace4"
              },
            })}
          />
          {commentLike}
        </div>
        {subComment.data.nickname === myNickname && (
          <FaRegTrashAlt
            onClick={deleteSubComment}
            css={css({
              fontSize: "13px",
              color: "#E89494",
              cursor: "pointer",
              marginLeft: "15px",
              marginRight: "5px",
            })}
          />
        )}
      </div>
      <div // 대댓글 내용
        css={css({
          marginTop: "3px",
          // border: "1px solid red",
        })}
      >
        {subComment.data.content}
      </div>
      <hr css={css({marginTop: "20px", border: "1px solid #E9E9E9"})}/>
    </div>
  )
}