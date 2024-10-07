/** @jsxImportSource @emotion/react */

import React, {useEffect, useState} from "react";
import {css} from "@emotion/react";
import {FaRegTrashAlt} from "react-icons/fa";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Checkbox from "@mui/material/Checkbox";

const label = {inputProps: {'aria-label': 'Checkbox demo'}};

export default function CommentDisplay() {
  const [isCommentLiked, setIsCommentLiked] = useState(false); // 댓글 좋아요 상태
  const [commentLike, setCommentLike] = useState(10); // 댓글 좋아요 수

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
        <b>닉네임</b>
        <div css={css({fontSize: "13px", color: "#A5A5A5"})}>24-03-23 19:23</div>
        <div
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
        헤이 모두들 안녕 내가 누군지 아니?계산을 통해 정해지는 수치로 표현하므로,
        정확한 갯수와 아이템의 너비가 같을 경우에 사용가능하며, 만약 갯수가 변경되거나,
        아이템 너비가 각각 변하게 된다면 추가적인 수정이 필요하게 됩니다. 하지만,
        하위 브라우저에 대한 지원도 가능하니, 알아둬야 되는 방법입니다
      </div>
      <hr css={css({marginTop: "20px", border: "1px solid #E9E9E9"})}/>
    </div>
  )
}