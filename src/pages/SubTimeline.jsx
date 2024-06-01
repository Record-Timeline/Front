/** @jsxImportSource @emotion/react */

import React, {useState} from "react";
import {css} from "@emotion/react";
import MyProfile from "../components/common/MyProfile";
import CreateSubTimelinePost from "../components/subTimeline/CreateSubTimelinePost";
import ReadSubTimelinePost from "../components/subTimeline/ReadSubTimelinePost";
import SubTimelineItem from "../components/subTimeline/SubTimelineItem";
import Button from "../components/common/Button";

export default function SubTimeline() {
  const [isDone, setIsDone] = useState(false); // 체크를 사용자가 직접 체크 안할 경우
  const [isChecked, setIsChecked] = useState(false); // 사용자가 직접 체크 할 경우
  const [isCreating, setIsCreating] = useState(true);
  const [editablePost, setEditablePost] = useState(null);
  const [subTimelineItems, setSubTimelineItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

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

  const handleSubmit = (newItem) => {
    if (editablePost) {
      // 수정 모드에서의 저장
      const updatedItems = subTimelineItems.map((item) =>
        item === editablePost ? newItem : item
      );
      setSubTimelineItems(updatedItems);
      setSelectedItem(newItem);
    } else {
      // 새 항목 추가
      const updatedItems = [...subTimelineItems, newItem];
      setSubTimelineItems(updatedItems);
      setSelectedItem(newItem);
    }
    setIsCreating(false);
  }

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handleDelete = (item) => {
    const itemIndex = subTimelineItems.findIndex(subItem => subItem === item);
    const updatedItems = subTimelineItems.filter((subItem) => subItem !== item);
    setSubTimelineItems(updatedItems);
    if (updatedItems.length > 0) {
      const newSelectedItem = itemIndex > 0 ? updatedItems[itemIndex - 1] : updatedItems[0];
      setSelectedItem(newSelectedItem);
    } else {
      setSelectedItem(null);
      setIsCreating(true);
    }
  };

  return (
    <div
      css={css({
        marginBottom: "150px",
      })}
    >
      <MyProfile/>
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
          <h1>졸업 프로젝트 캡스톤 - 레코드 타임라인</h1>
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
