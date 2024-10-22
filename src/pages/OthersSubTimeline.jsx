/** @jsxImportSource @emotion/react */

import React, {useState, useEffect} from "react";
import {css} from "@emotion/react";
import OthersProfile from "../components/common/OthersProfile";
import OthersSubTimelinePost from "../components/othersTimeline/OthersSubTimelinePost";
import OthersSubTimelineItem from "../components/othersTimeline/OthersSubTimelineItem";
import {useLocation, useParams, useSearchParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import SubTimelineItem from "../components/subTimeline/SubTimelineItem";
import Header from "../components/common/Header";
import Comment from "../components/comment/Comment";

export default function OthersSubTimeline() {
  const {memberId, mainTimelineId} = useParams(); // URL 파라미터로부터 id 받아오기
  const [searchParams, setSearchParams] = useSearchParams(); // 쿼리 스트링의 value를 가져오기 위함
  const targetId = searchParams.get("subtimelineId") // 타겟 서브타임라인 id

  const [title, setTitle] = useState( "메인 타임라인 제목");
  const [profile, setProfile] = useState(null); // 프로필 상태 추가

  const [subTimelineItems, setSubTimelineItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  // 다른 사용자 프로필 조회 연동
  useEffect(() => {
    const fetchOthersProfiles = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/profile/${memberId}`);
        setProfile(response.data);
        console.log("다른 사용자 프로필 조회 완료", response);
      } catch (error) {
        console.log("다른 사용자 프로필 조회 실패: ", error);
        console.error("에러 상세:", error.response ? error.response.data : error.message);
      }
    };

    fetchOthersProfiles();
  }, []);

  // 다른 사용자 서브 타임라인 조회 연동
  useEffect(() => {
    const fetchOthersSubTimelines = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/sub-timelines/main/${mainTimelineId}/ordered`)
        const data = response.data.subTimelines;
        setSubTimelineItems(data);

        const targetIndex = data.findIndex(item => item.id.toString() === targetId);

        if (targetIndex !== -1) {
          setSelectedItem(data[targetIndex]); // 해당 id를 가진 아이템이 있으면 그 아이템을 선택
        } else if (data.length > 0) { // url에 쿼리스트링이 없고, 서브 타임라인 아이템들은 있을 경우
          setSelectedItem(data[0]); // 해당 id가 없으면 첫번째 서브 타임라인 아이템을 선택
        } else {
          // 서브 타임라인이 하나도 없는 경우 -> ui 디자인 해야 함
        }

        setTitle(response.data.mainTimelineTitle)
        console.log("서브 타임라인 조회 완료", response)
      } catch (error) {
        console.log("다른 사용자 서브 타임라인 조회 실패: ", error);
        console.error("에러 상세:", error.response ? error.response.data : error.message);
      }
    }

    fetchOthersSubTimelines();
  }, []);

  return (
    <div css={css({marginBottom: "150px"})}>
      <Header backgroundColor="#F2F5FA"/>
      {profile && <OthersProfile profile={profile}/>} {/* 프로필 컴포넌트에 프로필 정보 전달 */}
      <div
        css={css({
          width: "100%", // 포스팅 박스와 서브 타임라인을 감싸는 div의 너비 (margin: "0 auto"를 하기위해 지정해줘야 함)
          height: "100%",
          margin: "0 auto",
          // border: "1px solid black",
          display: "flex", // 두 박스를 나란히 놓기 위함
          justifyContent: "space-between", // 두 박스(포스팅+댓글 박스 & 서브타임라인 박스) 사이에 간격을 두고 정렬
          alignItems: "flex-start",   // 상단 정렬
        })}
      >
        <div // 포스팅 박스 + 댓글
          css={css({
            margin: "0 auto",
            marginRight: "20px"
          })} // margin은 두 박스 사이의 간격
        >
          <div // 포스팅 박스 전체
            css={css({
              width: "760px",
              height: "840px",
              borderRadius: "30px",
              background: "#FFF",
              padding: "10px",
              border: "3px solid #f8f6f6",
              margin: "0 auto",
            })}
          >
            {selectedItem && (
            <OthersSubTimelinePost
              item={selectedItem}
            />
          )}
          </div>
          <Comment/>
        </div>
        <div // 서브 타임라인 박스
          css={css({
            width: "320px",
            margin: "0 auto",
            marginLeft: "25px",
            marginTop: "50px",
            // border: "1px solid black",
          })}
        >
          <div // 메인 타임라인 제목
            css={css({
              width: "280px",
              textAlign: "center",
              margin: "0 auto", // 가운데 정렬을 하기 위함
              // overflow: "hidden",
              // border: "4px solid #f8f6f6",
            })}
          >
            <h1>{title}</h1> {/* 메인 타임라인 제목 */}
          </div>
          {subTimelineItems.map((item, index) => (
            <OthersSubTimelineItem
              key={index}
              startDate={item.startDate}
              endDate={item.endDate}
              title={item.title}
              done={item.done}
              isPublic={item.isPublic}
              onClick={() => handleSelectItem(item)}
              showLine={index !== subTimelineItems.length - 1} // 마지막 아이템에는 선을 표시하지 않음
            />
          ))}
        </div>
      </div>
    </div>
  )
}