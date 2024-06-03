/** @jsxImportSource @emotion/react */

import * as React from "react";
import {useEffect, useState} from "react";
import {css} from "@emotion/react";
import OthersProfile from "../components/common/OthersProfile";
import OthersTimelineItem from "../components/othersTimeline/OthersTimelineItem";
import {useParams} from "react-router-dom";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

export default function OthersMainTimeline() {
  const {memberId} = useParams(); // URL 파라미터로부터 memberId 받아오기
  const [profile, setProfile] = useState(null); // 프로필 상태 추가
  const [items, setItems] = useState([]); // 타임라인 항목들을 관리할 상태 생성

  const [isDone, setIsDone] = useState(false);

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

  // 다른 사용자 메인 타임라인 조회 연동
  useEffect(() => {
    const fetchOthersMainTimelines = async (memberId) => {
      try {
        const response = await axiosInstance.get(`/api/v1/main-timelines/member/${memberId}`)
        setItems(response.data.map(item => ({type: "item", data: item})));
        console.log("다른 사용자 메인 타임라인 조회 완료", response);
      } catch (error) {
        console.log("에러 발생:", error);
        console.error("에러 상세:", error.response ? error.response.data : error.message);
      }
    }

    fetchOthersMainTimelines(memberId);
  }, []);

  return (
    <div>
      {profile && <OthersProfile profile={profile}/>} {/* 프로필 컴포넌트에 프로필 정보 전달 */}
      <div
        css={css({
          color: "#313131",
          textAlign: "center",
          fontFamily: "Pretendard",
          fontSize: "36px",
          fontStyle: "normal",
          fontWeight: "700",
          lineHeight: "normal",
          margin: "0 auto 50px auto",
        })}
      >
        {profile && profile.nickname} 님의 Timeline
      </div>
      <div
        css={css({ // 타임라인 간의 선
          position: "relative", // 상대적 위치 설정
          '&::after': { // 타임라인 아이템들 사이에 선 추가
            content: '""',
            position: 'absolute',
            left: '617px', // 체크 표시 위치에 맞게 조정 --> 선 위치 절대적인거 수정해야됨
            top: '48px', // 첫 번째 아이템의 중간부터 시작
            width: '2px',
            height: 'calc(100% - 75px)', // 전체 높이에서 첫 번째 아이템 높이만큼 제외
            backgroundColor: '#E2E2E2', // 선의 색상
          },
        })}
      >
        {items.map((item, index) => (
          <OthersTimelineItem
            key={index}
            mainTimelineId={item.data.id}
            startDate={item.data.startDate}
            endDate={item.data.endDate}
            title={item.data.title}
          />
        ))}
      </div>
    </div>
  )
}
