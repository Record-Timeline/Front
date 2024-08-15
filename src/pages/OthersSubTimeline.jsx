/** @jsxImportSource @emotion/react */

import React, {useState, useEffect} from "react";
import {css} from "@emotion/react";
import OthersProfile from "../components/common/OthersProfile";
import OthersSubTimelinePost from "../components/othersTimeline/OthersSubTimelinePost";
import OthersSubTimelineItem from "../components/othersTimeline/OthersSubTimelineItem";
import {useLocation, useParams} from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import SubTimelineItem from "../components/subTimeline/SubTimelineItem";

export default function OthersSubTimeline() {
  const {memberId, mainTimelineId} = useParams(); // URL 파라미터로부터 id 받아오기
  const location = useLocation(); // navigate의 state를 통해 메인 타임라인의 제목을 받아오기 위함

  const sessionTitle = sessionStorage.getItem('mainTimelineTitle'); // sessionStorage에서 title 가져오기
  const [title, setTitle] = useState(sessionTitle || "메인 타임라인 제목");
  const [profile, setProfile] = useState(null); // 프로필 상태 추가

  const [isDone, setIsDone] = useState(false);
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

        if (data.length > 0) { // 서브 타임라인 아이템이 있으면
          setSelectedItem(data[0]); // 첫번째 서브 타임라인을 보여주고
        } else {
        }

        setTitle(response.data.mainTimelineTitle)
        console.log("서브 타임라인 조회 완료", response)
      } catch (error) {
        console.log("다른 사용자 서브 타임라인 조회 실패: ", error);
        console.error("에러 상세:", error.response ? error.response.data : error.message);
      }
    }

    fetchOthersSubTimelines();

    // // 메인 타임라인에서 가져온 title 상태 설정 및 sessionStorage에 저장 (유지되도록)
    // if (location.state && location.state.title) {
    //   setTitle(location.state.title);
    //   sessionStorage.setItem('mainTimelineTitle', location.state.title);
    // }
  }, []);

  return (
    <div
      css={css({
        marginBottom: "150px",
      })}
    >
      {profile && <OthersProfile profile={profile}/>} {/* 프로필 컴포넌트에 프로필 정보 전달 */}
      <div // 포스팅 박스 전체
        css={css({
          width: "760px",
          height: "820px",
          // height: "100%",
          borderRadius: "30px",
          background: "#FFF",
          margin: "0px 0px 50px 355px",
          padding: "10px",
          float: "left",
          display: "inline-block", // 서브 타임라인과 나란히 두기 위함
          border: "3px solid #f8f6f6",
        })}
      >
        {selectedItem && (
        <OthersSubTimelinePost
          isDone={true}
          item={selectedItem}
        />
        )}
      </div>
      <div // 서브 타임라인 박스
        css={css({
          marginTop: "50px",
          marginBottom: "70px",
          marginLeft: "45px",
          display: "inline-block", // 포스팅과 나란히 두기 위함 (div 두 개 나란히 두기)
          // border: "1px solid black",
        })}
      >
        <div // 서브 타임라인 제목
          css={css({
            width: "280px",
            textAlign: "center",
            margin: "0 auto", // 가운데 정렬을 하기 위함
            // overflow: "hidden",
            // border: "4px solid #f8f6f6",
          })}
        >
          <h1>{title}</h1>
        </div>
        {subTimelineItems.map((item, index) => (
          <OthersSubTimelineItem
            key={index}
            startDate={item.startDate}
            endDate={item.endDate}
            title={item.title}
            isPublic={item.isPublic}
            onClick={() => handleSelectItem(item)}
          />
        ))}
      </div>
    </div>
  )
}