/** @jsxImportSource @emotion/react */

import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import OthersProfile from "../components/common/OthersProfile";
import OthersSubTimelinePost from "../components/othersTimeline/OthersSubTimelinePost";
import OthersSubTimelineItem from "../components/othersTimeline/OthersSubTimelineItem";
import {useLocation, useParams} from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

export default function OthersSubTimeline() {
  const {memberId, mainTimelineId} = useParams(); // URL 파라미터로부터 id 받아오기
  const location = useLocation(); // navigate의 state를 통해 메인 타임라인의 제목을 받아오기 위함

  const sessionTitle = sessionStorage.getItem('mainTimelineTitle'); // sessionStorage에서 title 가져오기
  const [title, setTitle] = useState(sessionTitle || "메인 타임라인 제목");
  const [profile, setProfile] = useState(null); // 프로필 상태 추가

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
                    height: "720px",
                    // height: "100%",
                    borderRadius: "30px",
                    background: "#FFF",
                    margin: "0px 0px 0px 355px",
                    padding: "10px",
                    float: "left",
                    display: "inline-block", // 서브 타임라인과 나란히 두기 위함
                    border: "3px solid #f8f6f6",
                })}
            >
                <OthersSubTimelinePost isDone={true}/>
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
                    <h1>졸업 프로젝트 캡스톤 - 레코드 타임라인</h1>
                </div>
                <OthersSubTimelineItem isDone={true}/>
                <OthersSubTimelineItem isDone={true}/>
                <OthersSubTimelineItem isDone={false}/>
            </div>
        </div>
    )
}