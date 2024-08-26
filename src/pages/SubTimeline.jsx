/** @jsxImportSource @emotion/react */

import React, {useEffect, useState} from "react";
import {css} from "@emotion/react";
import MyProfile from "../components/common/MyProfile";
import CreateSubTimelinePost from "../components/subTimeline/CreateSubTimelinePost";
import ReadSubTimelinePost from "../components/subTimeline/ReadSubTimelinePost";
import SubTimelineItem from "../components/subTimeline/SubTimelineItem";
import Button from "../components/common/Button";
import {useParams, useLocation, useSearchParams} from 'react-router-dom';
import axiosInstance from "../utils/axiosInstance";
import Header from "../components/common/Header";

export default function SubTimeline() {
  const {mainTimelineId} = useParams(); // URL 파라미터로부터 id 받아오기
  const [searchParams, setSearchParams] = useSearchParams(); // 쿼리 스트링의 value를 가져오기 위함
  const targetId = searchParams.get("subtimelineId") // 타겟 서브타임라인 id

  const [title, setTitle] = useState("메인 타임라인 제목");
  const [profile, setProfile] = useState(null); // 프로필 상태 추가

  const [isDone, setIsDone] = useState(false); // 체크를 사용자가 직접 체크 안할 경우
  const [isChecked, setIsChecked] = useState(false); // 사용자가 직접 체크 할 경우
  const [isCreating, setIsCreating] = useState(false);
  const [editablePost, setEditablePost] = useState(null);
  const [subTimelineItems, setSubTimelineItems] = useState([]); // 타임라인 항목들을 관리할 상태 생성
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handleCreateNew = () => {
    setEditablePost(null); // 새 포스트 작성을 위해 editablePost를 null로 설정
    setIsCreating(true);
  }

  const handleEdit = (post) => {
    setEditablePost(post); // 수정할 포스트 데이터 설정
    setIsCreating(true); // 생성 모드로 전환
  };

  const handleCancel = () => {
    console.log(subTimelineItems);
    if (subTimelineItems.length === 0) {
      setIsCreating(true);
    } else {
      setIsCreating(false);
    }
  }

  // 내 프로필 조회 연동
  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/my-profile`);
      setProfile(response.data);
      console.log("프로필 조회 완료", response);
    } catch (error) {
      console.log("프로필 조회 에러 발생:", error);
      console.error("에러 상세:", error.response ? error.response.data : error.message);
    }
  };

  // 서브 타임라인 조회 연동
  const fetchSubTimelines = async (newItemId) => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/sub-timelines/main/${mainTimelineId}/ordered`, // 메인 타임라인 ID로 서브 타임라인 데이터 가져오기
      );
      const data = response.data.subTimelines;
      setSubTimelineItems(data);

      const targetIndex = data.findIndex(item => item.id.toString() === targetId); // 쿼리문에서 받은 서브 타임라인 ID와 일치하는 인덱스 찾기
      const targetIndex2 = data.findIndex(item => item.id === newItemId); // 새로 생성(수정) 서브 타임라인 ID와 일피하는 인덱스 찾기

      if (targetIndex !== -1) {
        setSelectedItem(data[targetIndex]); // 해당 id를 가진 아이템이 있으면 그 아이템을 선택
      } else if (data.length > 0) { // url에 쿼리스트링이 없고, 서브 타임라인 아이템들은 있을 경우
        setSelectedItem(data[0]); // 해당 id가 없으면 첫번째 서브 타임라인 아이템을 선택
        setIsCreating(false); // 글쓰기 모드 활성화 x
      } else {
        setIsCreating(true)
        // +) 서브 타임라인이 하나도 없는 경우 -> ui 디자인 해야 함
      }

      if (targetIndex2 !== -1) {
        setSelectedItem(data[targetIndex2]); // 해당 id를 가진 아이템이 있으면 그 아이템을 선택
      }

      setTitle(response.data.mainTimelineTitle)
      console.log(response.data.mainTimelineTitle)
      console.log("서브 타임라인 조회 완료", response)
    } catch (error) {
      console.error("서브 타임라인 조회 에러 발생:", error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchSubTimelines();
  }, [mainTimelineId]); // id를 의존성 배열에 추가

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

        // 수정 후 서브 타임라인 다시 조회
        await fetchSubTimelines(editablePost.id);
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

        const createdItemId = response.data.subTimelineId; // 새로 생성된 타임라인의 id
        console.log(createdItemId)

        // 생성 후 서브 타임라인 다시 조회
        await fetchSubTimelines(createdItemId);
      } catch (error) {
        console.log("서브 타임라인 생성 에러: ", error);
        console.error("에러 상세:", error.response ? error.response.data : error.message);
      }
    }
    setIsCreating(false);
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

      // 삭제 후 서브 타임라인 다시 조회
      // fetchSubTimelines(); 이거 있으면 위에 selectedItem 설정해놓은게 적용이 안됨 초기화 돼서
    } catch (error) {
      console.error("서브 타임라인 삭제 에러 발생:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div
      css={css({
        marginBottom: "150px",
      })}
    >
      <Header backgroundColor="#F2F5FA"/>
      {profile && <MyProfile profile={profile}/>} {/* 프로필 컴포넌트에 프로필 정보 전달 */}
      <div
        css={css({
          width: "1115px", // 포스팅 박스와 서브 타임라인을 감싸는 div의 너비 (margin: "0 auto"를 하기위해 지정해줘야 함)
          margin: "auto",
          // border: "1px solid black"
        })}
      >
      <div // 포스팅 박스 전체
        css={css({
          width: "760px",
          height: "840px",
          borderRadius: "30px",
          background: "#FFF",
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
            showLine={index !== subTimelineItems.length - 1} // 마지막 아이템에는 선을 표시하지 않음
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
    </div>
  )
}
