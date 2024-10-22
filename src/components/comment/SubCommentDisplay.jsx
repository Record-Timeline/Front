/** @jsxImportSource @emotion/react */

import React, {useEffect, useState} from "react";
import {css} from "@emotion/react";
import {FaRegTrashAlt} from "react-icons/fa";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Checkbox from "@mui/material/Checkbox";

const label = {inputProps: {'aria-label': 'Checkbox demo'}};

export default function CommentDisplay({subComment, deleteSubComment}) {
  const [isCommentLiked, setIsCommentLiked] = useState(false); // 대댓글 좋아요 상태
  const [commentLike, setCommentLike] = useState(7); // 대댓글 좋아요 수

  // 대댓글 좋아요 토글
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
          <b>{subComment.nickname}</b>
          <div css={css({fontSize: "13px", color: "#A5A5A5"})}>{subComment.currentDate}</div>
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
          onClick={deleteSubComment}
          css={css({
            fontSize: "13px",
            color: "#E89494",
            cursor: "pointer",
            marginLeft: "15px",
            marginRight: "5px",
          })}
        />
      </div>
      <div // 대댓글 내용
        css={css({
          marginTop: "3px",
          // border: "1px solid red",
        })}
      >
        {subComment.content}
      </div>
      <hr css={css({marginTop: "20px", border: "1px solid #E9E9E9"})}/>
    </div>
  )
}