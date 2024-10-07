/** @jsxImportSource @emotion/react */

import React, {useEffect, useState} from "react";
import {css} from "@emotion/react";
import {FaRegTrashAlt} from "react-icons/fa";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Checkbox from "@mui/material/Checkbox";
import SubCommentDisplay from './SubCommentDisplay';
import SubCommentInput from "./SubCommentInput";

const label = {inputProps: {'aria-label': 'Checkbox demo'}};

export default function CommentDisplay({comment, commentCount, deleteComment}) {
  const [isCommentLiked, setIsCommentLiked] = useState(false); // 댓글 좋아요 상태
  const [commentLike, setCommentLike] = useState(10); // 댓글 좋아요 수

  // 대댓글 상태 관리
  const [subComments, setSubComments] = useState([]);
  const [subCommentCount, setSubCommentCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // 대댓글 입력창 open 함수
  const openSubCommentInput = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }

  // 대댓글 추가(저장)하는 함수
  const addSubComment = (newSubComment) => {
    setSubComments((prevSubComments) => [...prevSubComments, newSubComment]);
    setSubCommentCount((prevSubCount) => prevSubCount + 1);
    setIsOpen(false);
    console.log("대댓글", subComments);
  }

  // 대댓글 삭제 함수
  const deleteSubComment = (targetIndex) => {
    setSubComments(subComments.filter((_, index) => index !== targetIndex));
    setSubCommentCount((prevCount) => prevCount - 1);
  }

  // 댓글 좋아요 토글
  const onClickCommentLike = () => {
    if (isCommentLiked) { // 좋아요 취소
      setIsCommentLiked(false);
      setCommentLike(commentLike - 1);
    } else { // 좋아요 완료
      setIsCommentLiked(true);
      setCommentLike(commentLike + 1);
    }
  }

  return (
    <div // 댓글
      css={css({
        padding: "13px 20px 0 20px",
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
          <b>{comment.nickname}</b>
          <div css={css({fontSize: "13px", color: "#A5A5A5"})}>{comment.currentDate}</div>
          <div
            onClick={openSubCommentInput}
            css={css({
              display: "flex",
              justifyContent: "center",
              width: "fit-content",
              fontSize: "14px",
              cursor: "pointer",
            })}>
            답글
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
        <FaRegTrashAlt
          onClick={deleteComment}
          css={css({
            fontSize: "13px",
            color: "#E89494",
            cursor: "pointer",
            marginLeft: "15px",
            marginRight: "5px",
          })}
        />
      </div>
      <div // 댓글 내용
        css={css({
          marginTop: "3px",
          // border: "1px solid red",
        })}
      >
        {comment.content}
      </div>
      <hr css={css({marginTop: "20px", border: "1px solid #E9E9E9"})}/>
      {subCommentCount > 0 && (
        subComments.map((subComment, index) => (
          <SubCommentDisplay
            key={index}
            subComment={subComment}
            deleteSubComment={() => deleteSubComment(index)}
          />
        ))
      )}
      {isOpen && <SubCommentInput addSubComment={addSubComment}/>}
    </div>
  )
}