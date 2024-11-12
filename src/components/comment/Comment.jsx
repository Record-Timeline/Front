/** @jsxImportSource @emotion/react */

import React, {useEffect, useState} from "react";
import {css} from "@emotion/react";
import {BiCommentDetail} from "react-icons/bi";
import CommentDisplay from "./CommentDisplay";
import CommentInput from "./CommentInput";
import NoneData from "../common/NoneData";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from 'react-redux';

export default function Comment({subTimeline}) {
  const myMemberId = useSelector(state => state.memberId);
  const myNickname = useSelector(state => state.nickname); // 리덕스: 내 닉네임

  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);

  // 댓글 추가(저장)하는 함수
  const addComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
    setCommentCount((prevCount) => prevCount + 1);
    console.log(comments);
  }

  // 댓글 삭제 함수 + 삭제 연동
  const deleteComment = async (targetIndex) => {
    const commentId = comments[targetIndex].data.id;
    // 연동 코드
    try {
      const response = await axiosInstance.delete(`/api/v1/comments/${commentId}`);
      setComments(comments.filter((_, index) => index !== targetIndex));
      setCommentCount((prevCount) => prevCount - 1);

      console.log("댓글 삭제 완료", response.data)

      // 삭제 후 댓글 다시 조회
      await fetchComments();
      console.log(comments)
    } catch (error) {
      console.log("삭제 에러 발생:", error);
      console.error("삭제 에러 상세:", error.response ? error.response.data : error.message);
    }
  }

  // 댓글 생성 연동
  const createComment = async (newComment) => {
    try {
      const response = await axiosInstance.post(
        `/api/v1/comments`,
        {
          "subTimelineId": subTimeline.id,
          "memberId": myMemberId,
          "content": newComment.content,
        }
      )
      console.log("댓글 생성 완료", response)
    } catch (error) {
      console.log("댓글 생성 실패", error);
      console.error("에러 상세:", error.response ? error.response.data : error.message);
    }
  }

  // 댓글 조회 연동
  const fetchComments = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/comments/sub-timeline/${subTimeline.id}`)
      setComments(response.data.map(item => ({ type: "item", data: item })));
      console.log("댓글 조회 완료", response)
    } catch (error) {
      console.log("댓글 생성 실패", error);
      console.error("에러 상세:", error.response ? error.response.data : error.message);
    }
  }

  useEffect(() => {
    fetchComments();
    console.log(comments)
  }, [])

  return (
    <div // 댓글 전체 박스
      css={css({
        width: "760px",
        margin: "100px auto",
        // border: "1px solid black",
      })}
    >
      <div // 댓글 헤더
        css={css({
          display: "flex", // 부모 요소에 flexbox 적용
          alignItems: "center", // 자식 요소들 수직 정렬 (justify-content: center -> 수평 정렬)
          gap: "8px", // 요소들 사이의 간격 설정
          height: "40px",
          backgroundColor: "#F2F5FA",
          borderRadius: "5px",
          padding: "10px",
          paddingLeft: "18px", // 왼쪽에 여백 추가
        })}
      >
        <BiCommentDetail/> 댓글 {commentCount}
      </div>
      {comments.length === 0 ? (
        <NoneData
          messege={"아직 등록된 댓글이 없습니다."}
          boxShadow={"none"}
        />
      ) : (
        comments.map((comment, index) => (
          <CommentDisplay
            key={index}
            comment={comment}
            setCommentCount={setCommentCount}
            deleteComment={() => deleteComment(index)}
          />
        ))
      )}
      <CommentInput
        addComment={addComment}
        createComment={createComment}
      />
    </div>
  )
}
