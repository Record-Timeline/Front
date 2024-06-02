/** @jsxImportSource @emotion/react */

import React, {useEffect, useState} from "react";
import {css} from "@emotion/react";
import MyProfile from "../components/common/MyProfile";
import CreateSubTimelinePost from "../components/subTimeline/CreateSubTimelinePost";
import ReadSubTimelinePost from "../components/subTimeline/ReadSubTimelinePost";
import SubTimelineItem from "../components/subTimeline/SubTimelineItem";
import Button from "../components/common/Button";
import axios from "axios";
import {useParams, useLocation} from 'react-router-dom';
import axiosInstance from "../utils/axiosInstance";

export default function SubTimeline() {
  const {mainTimelineId} = useParams(); // URL 파라미터로부터 id 받아오기
  const location = useLocation(); // navigate의 state를 통해 메인 타임라인의 제목을 받아오기 위함

  const sessionTitle = sessionStorage.getItem('mainTimelineTitle'); // sessionStorage에서 title 가져오기
  const [title, setTitle] = useState(sessionTitle || "메인 타임라인 제목");
  const [profile, setProfile] = useState(null); // 프로필 상태 추가
  const [isDone, setIsDone] = useState(false); // 체크를 사용자가 직접 체크 안할 경우
  const [isChecked, setIsChecked] = useState(false); // 사용자가 직접 체크 할 경우
  const [isCreating, setIsCreating] = useState(true);
  const [editablePost, setEditablePost] = useState(null);
  const [subTimelineItems, setSubTimelineItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  // 토큰 정보 받아오기
  const token = localStorage.getItem("token");
  console.log("토큰 확인:", token); // 토큰 확인을 위한 콘솔 로그 추가

  const handleCreateNew = () => {
    setEditablePost(null); // 새 포스트 작성을 위해 editablePost를 null로 설정
    setIsCreating(true);
  }

  const handleEdit = (post) => {
    setEditablePost(post); // 수정할 포스트 데이터 설정
    setIsCreating(true); // 생성 모드로 전환
  };

  const handleCancel = () => {
    setIsCreating(false);
  }

  const handleSubmit = async (newItem) => {
    if (editablePost) {
      // 수정 모드에서의 저장
      // 서브 타임라인 수정 연동
      try {
        const response = await axiosInstance.put(
          `/api/v1/sub-timelines/${editablePost.id}`,
          {
            title: newItem.title,
            startDate: newItem.startDate,
            endDate: newItem.endDate,
            content: newItem.content,
          }
        );
        const updatedItems = subTimelineItems.map((item) =>
          item === editablePost ? newItem : item
        );
        setSubTimelineItems(updatedItems);
        setSelectedItem(newItem);

        console.log("서브 타임라인 수정 완료", response.data)
        console.log(subTimelineItems);
      } catch (error) {
        console.log("서브 타임라인 수정 에러: ", error);
        console.error("에러 상세:", error.response ? error.response.data : error.message);
      }
    } else {
      // 새 항목 추가
      // 서브 타임라인 생성 연동
      try {
        const response = await axiosInstance.post(
          `/api/v1/sub-timelines`,
          {
            mainTimelineId,
            title: newItem.title,
            startDate: newItem.startDate,
            endDate: newItem.endDate,
            content: newItem.content,
          }
        );

        const updatedItems = [...subTimelineItems, newItem];
        setSubTimelineItems(updatedItems);
        setSelectedItem(newItem);

        console.log("서브 타임라인 생성 완료", response.data)
        console.log(subTimelineItems);
      } catch (error) {
        console.log("서브 타임라인 생성 에러: ", error);
        console.error("에러 상세:", error.response ? error.response.data : error.message);
      }
    }
    setIsCreating(false);
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handleDelete = async (item) => {
    // 서브 타임라인 삭제 연동
    try {
      await axiosInstance.delete(`/api/v1/sub-timelines/${item.id}`);
      const itemIndex = subTimelineItems.findIndex(subItem => subItem === item)
      const updatedItems = subTimelineItems.filter((subItem) => subItem !== item);
      setSubTimelineItems(updatedItems);
      if (updatedItems.length > 0) {
        const newSelectedItem = itemIndex > 0 ? updatedItems[itemIndex - 1] : updatedItems[0];
        setSelectedItem(newSelectedItem);
      } else {
        setSelectedItem(null);
        setIsCreating(true);
      }
      console.log("서브 타임라인 삭제 완료");
      console.log(subTimelineItems);
    } catch (error) {
      console.error("서브 타임라인 삭제 에러 발생:", error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    // 내 프로필 조회 연동
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `/api/v1/my-profile`,
          {
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
        setProfile(response.data);
        console.log("프로필 조회 완료", response);
      } catch (error) {
        console.log("프로필 조회 에러 발생:", error);
        console.error("에러 상세:", error.response ? error.response.data : error.message);
      }
    };

    // 서브 타임라인 조회 연동
    const fetchSubTimelines = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/v1/sub-timelines/main/${mainTimelineId}/ordered`, // 메인 타임라인 ID로 서브 타임라인 데이터 가져오기
        );
        const data = response.data.subTimelines;
        setSubTimelineItems(data);

        if (data.length > 0) {
          setSelectedItem(data[0]);
          setIsCreating(false);
        }
        console.log("서브 타임라인 조회 완료", response)
      } catch (error) {
        console.error("서브 타임라인 조회 에러 발생:", error.response ? error.response.data : error.message);
      }
    };

    fetchProfile();
    fetchSubTimelines();

    // 메인 타임라인에서 가져온 title 상태 설정 및 sessionStorage에 저장 (유지되도록)
    if (location.state && location.state.title) {
      setTitle(location.state.title);
      sessionStorage.setItem('mainTimelineTitle', location.state.title);
    }
  }, [token, mainTimelineId, location.state]); // id와 location.state를 의존성 배열에 추가

  return (
    <div
      css={css({
        marginBottom: "150px",
      })}
    >
      {profile && <MyProfile profile={profile}/>} {/* 프로필 컴포넌트에 프로필 정보 전달 */}
      <div // 포스팅 박스 전체
        css={css({
          width: "760px",
          height: "840px",
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
        {isCreating ? (
          <CreateSubTimelinePost
            post={editablePost}
            setIsCreating={setIsCreating}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
          />
        ) : (
          selectedItem && (
            <ReadSubTimelinePost
              item={selectedItem}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )
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
          <h1>{title}</h1> {/* 메인 타임라인 제목 */}
        </div>
        {subTimelineItems.map((item, index) => (
          <SubTimelineItem
            key={index}
            startDate={item.startDate}
            endDate={item.endDate}
            title={item.title}
            isPublic={item.isPublic}
            onClick={() => handleSelectItem(item)}
          />
        ))}
        <Button
          onClick={handleCreateNew}
          width="300px"
          height="100px"
          margin="45px auto"
          backgroundColor="#f8f6f6"
          textColor="#717171"
          fontSize="35px"
          border="none"
          borderRadius="50px"
        >
          +
        </Button>
      </div>
    </div>
  )
}
