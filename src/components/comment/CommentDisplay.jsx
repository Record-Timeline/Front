/** @jsxImportSource @emotion/react */

import React, {useEffect, useState} from "react";
import {css} from "@emotion/react";
import {FaRegTrashAlt} from "react-icons/fa";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Checkbox from "@mui/material/Checkbox";
import SubCommentDisplay from './SubCommentDisplay';
import SubCommentInput from "./SubCommentInput";
import dayjs from "dayjs";
import axiosInstance from "../../utils/axiosInstance";
import {useSelector} from "react-redux";

const label = {inputProps: {'aria-label': 'Checkbox demo'}};

export default function CommentDisplay({comment, updateCommentCount, deleteComment}) {
  const myNickname = useSelector(state => state.nickname); // 리덕스: 내 닉네임

  const [isCommentLiked, setIsCommentLiked] = useState(false); // 댓글 좋아요 상태
  const [commentLike, setCommentLike] = useState(10); // 댓글 좋아요 수

  // 대댓글 상태 관리
  const [subComments, setSubComments] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // 대댓글 input 컴포넌트

  // 대댓글 입력창 open 함수
  const openSubCommentInput = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }

  // 대댓글 추가(저장)하는 함수
  const addSubComment = (newSubComment) => {
    setSubComments((prevSubComments) => [...prevSubComments, newSubComment]);
    setIsOpen(false);
    console.log("대댓글", subComments);
  }

  // 대댓글 삭제 함수 + 삭제 연동
  const deleteSubComment = async (targetIndex) => {
    const subCommentId = subComments[targetIndex].data.id;
    // 연동 코드
    try {
      const response = await axiosInstance.delete(`/api/v1/replies/${subCommentId}`)
      setSubComments(subComments.filter((_, index) => index !== targetIndex));

      console.log("대댓글 삭제 완료", response.data)

      // 삭제후 대댓글, 댓글 수 다시 조회
      await fetchSubComments();
      await updateCommentCount();
      console.log(subComments);
    } catch (error) {
      console.log("삭제 에러 발생:", error);
      console.error("삭제 에러 상세:", error.response ? error.response.data : error.message);
    }
    // setSubComments(subComments.filter((_, index) => index !== targetIndex));
  }

  // 대댓글 생성 연동
  const createSubComment = async (newSubComment) => {
    // 낙관적 업데이트 : 프론트엔드에 임시 댓글을 먼저 추가
    const tempSubComment = {
      type: "item",
      data: {
        id: Date.now(),
        nickname: myNickname,
        content: newSubComment.content,
        createDate: new Date().toISOString(),
      }
    }

    // 1. 상태에 임시 대댓글 추가
    addSubComment(tempSubComment);

    try {
      // 2. 서버에 대댓글 저장 요청 (대댓글 생성)
      const response = await axiosInstance.post(
        `/api/v1/replies`,
        {
          "commentId": comment.data.id,
          "content": newSubComment.content,
        }
      )

      // 3. 서버 응답으로 상태 업데이트
      const savedSubComment = {
        type: "item",
        data: response.data,
      }

      await fetchSubComments();
      await updateCommentCount();

      setSubComments((prevSubComments) =>
        prevSubComments.map((subComment) =>
          subComment.data.id === tempSubComment.data.id ? savedSubComment : subComment
        )
      );

      console.log("대댓글 생성 완료", response)
    } catch (error) {
      console.log("대댓글 생성 실패", error);
      console.error("에러 상세:", error.response ? error.response.data : error.message);

      // 4. 서버 요청 실패 시 임시 대댓글 롤백
      setSubComments((prevSubComments) =>
        prevSubComments.filter((subComment) => subComment.data.id !== tempSubComment.data.id)
      );
    }
  }

  // 대댓글 조회 연동
  const fetchSubComments = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/replies/comment/${comment.data.id}`);
      setSubComments(response.data.map(item => ({ type: "item", data: item })));
      console.log("대댓글 조회 완료")
      console.log(response.data);
    } catch (error) {
      console.log("대댓글 조회 실패", error);
      console.error("에러 상세:", error.response ? error.response.data : error.message);
    }
  }

  // if(!comment?.data) {
  //   console.log("Comment data is missing or undefined");
  //   return null; // 데이터가 없을 경우 렌더링하지 않음
  // }
  //
  // const { nickname, content, createdDate } = comment.data

  // 댓글 좋아요 상태 연동
  const commentLikeStatus = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/comments/${comment.data.id}/like/status`);
      console.log("댓글 좋아요 상태 체크", response.data);
      if (response.data) {
        setIsCommentLiked(true);
      } else {
        setIsCommentLiked(false);
      }
    } catch (error) {
      console.log("댓글 좋아요 상태 체크 오류", error);
      console.error("에러 상세:", error.response ? error.response.data : error.message);
    }
  }

  useEffect(() => {
    commentLikeStatus();
    fetchSubComments();
    console.log(subComments);
  }, [])


  if(!comment?.data) {
    console.log("Comment data is missing or undefined");
    return null; // 데이터가 없을 경우 렌더링하지 않음
  }

  const { nickname, content, createdDate } = comment.data

  // 댓글 좋아요 토글
  const onClickCommentLike = async () => {
    if (isCommentLiked) {
      // 좋아요 취소 연동
      try {
        const response = await axiosInstance.post(`/api/v1/comments/${comment.data.id}/like`)
        setCommentLike(response.data.likeCount); // 좋아요 수 갱신
        console.log("댓글 좋아요 취소 완료", response)
      } catch (error) {
        console.log("댓글 좋아용 취소 오류", error);
        console.error("에러 상세:", error.response ? error.response.data : error.message);
      }
    } else {
      // 좋아요 연동
      try {
        const response = await axiosInstance.post(`/api/v1/comments/${comment.data.id}/like`)
        setCommentLike(response.data.likeCount); // 좋아요 수 갱신
        console.log("댓글 좋아요 완료", response)
      } catch (error) {
        console.log("댓글 좋아용 오류", error);
        console.error("에러 상세:", error.response ? error.response.data : error.message);
      };
    }
    setIsCommentLiked(!isCommentLiked); // 좋아요 상태 토글
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
          <b>{comment.data.nickname || "익명"}</b>
          <div css={css({
            fontSize: "13px",
            color: "#A5A5A5"
          })}>{dayjs(comment.data.createdDate).format('YY-MM-DD HH:mm')}</div>
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
        {comment.data.nickname === myNickname && (
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
        )}
      </div>
      <div // 댓글 내용
        css={css({
          marginTop: "3px",
          // border: "1px solid red",
        })}
      >
        {comment.data.content || "내용 없음"}
      </div>
      <hr css={css({marginTop: "20px", border: "1px solid #E9E9E9"})}/>
      {subComments.length > 0 && (
        subComments.map((subComment, index) => (
          <SubCommentDisplay
            key={index}
            subComment={subComment}
            deleteSubComment={() => deleteSubComment(index)}
          />
        ))
      )}
      {isOpen &&
        <SubCommentInput
          addSubComment={addSubComment}
          createSubComment={createSubComment}
        />
      }
    </div>
  )
}