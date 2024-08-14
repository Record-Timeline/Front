/** @jsxImportSource @emotion/react */

import React, {useState, useEffect} from "react";
import {css} from "@emotion/react";
import PostBox from "../components/common/PostBox";
import Header from "../components/common/Header";
import axiosInstance from "../utils/axiosInstance";
import { TbNotesOff } from "react-icons/tb";

export default function Bookmark() {
  const [bookmarkList, setBookmarkList] = useState([]);
  const [bookmarkPostNum, setBookmarkPostNum] = useState(); // 북마크 한 게시글 수

  const interestMapping = {
    "Marketing_Promotion": "마케팅/홍보/조사",
    "Accounting_Tax_Finance": "회계/세무/재무",
    "GeneralAffairs_LegalAffairs_Affairs": "총무/법무/사무",
    "IT_Data": "IT개발/데이터",
    "Design": "디자인",
    "Service": "서비스",
    "Construction_Architecture": "건설/건축",
    "MedicalCare": "의료",
    "Education": "교육",
    "Media_Culture_Sports": "미디어/문화/스포츠",
  };

  // 북마크 목록 조회 연동
  const fetchBookmarkList = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/bookmarks/my`)
      setBookmarkPostNum(response.data.length);
      setBookmarkList(response.data);
      console.log("북마크 조회 성공", response.data);
      console.log(response);
    } catch (error) {
      console.log("북마크 조회 실패", error);
      console.error("에러 상세:", error.response ? error.response.data : error.message);
    }
  }

  useEffect(() => {
    fetchBookmarkList();
  }, [])

  return (
    <div
      css={css({
        marginBottom: "140px",
      })}
    >
      <Header/>
      <div
        css={css({
          color: "#313131",
          textAlign: "center",
          fontSize: "30px",
          fontWeight: "700",
          margin: "20px 0 50px 0",
        })}
      >
        북마크한 게시물 <p css={css({color: "#939393", display: "inline-block", marginLeft: "8px"})}>{bookmarkPostNum}</p>
      </div>
      <div
        css={css({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        })}
      >
        {bookmarkPostNum === 0 ? (
          <div
            css={css({
              marginTop: "150px",
              fontSize: "25px"
            })}
          >
            <div
              css={css({
                display: 'flex',  // Flexbox 사용 설정
                alignItems: 'center',  // 내부 아이콘 가로 방향 중앙 정렬
                justifyContent: 'center',  // 내부 아이콘 세로 방향 중앙 정렬
                fontSize: "50px",
                marginBottom: "30px"
              })}
            >
              <TbNotesOff />
            </div>
            <p>북마크한 게시글이 없습니다.</p>
          </div>
        ) : (
          bookmarkList.map((post, index) => ( // 북마크한 게시글 목록 뿌리기
            <PostBox
              key={index}
              nickName={post.authorName}
              title={post.title}
              category={interestMapping[post.authorInterest]}
              commentNum={20}
              heartNum={post.likeCount}
              scrapNum={post.bookmarkCount}
              startDate={post.startDate}
              endDate={post.endDate}
              maintimelineId={post.mainTimelineId}
              memeberId={post.authorId}
            />
          )))}
      </div>
    </div>
  );
}
