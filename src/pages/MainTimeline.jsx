/** @jsxImportSource @emotion/react */

import React, {useState} from "react";
import {css} from "@emotion/react";
import MyProfile from "../components/common/MyProfile";
import MainTimelineItem from "../components/timeline/MainTimelineItem";
import MainTimelineInput from "../components/timeline/MainTimelineInput";
import Button from "../components/common/Button";

export default function MainTimeline() {
  // 타임라인 항목들을 관리할 상태 생성
  const [items, setItems] = useState([]);

  // 새 타임라인 입력 항목 추가하는 함수
  const addInput = () => {
    setItems([...items, { type: "input", data: {} }]);
  };

  // 타임라인 항목을 저장하는 함수
  const saveItem = (index, data) => {
    const newItems = items.slice();
    newItems[index] = { type: "item", data: data };
    setItems(newItems);
  };

  // 타임라인 항목을 수정 모드로 전환하는 함수
  const editItem = (index) => {
    const newItems = items.slice();
    newItems[index] = { ...newItems[index], type: "input" };
    setItems(newItems);
  };

  // 타임라인 항목을 삭제하는 함수
  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div
      css={css({
        margin: "0 auto",
        marginBottom: "70px"
        // border: "1px solid black"
      })}
    >
      <MyProfile/>
      <div
        css={css({
          color: "#313131",
          textAlign: "center",
          fontFamily: "Pretendard",
          fontSize: "36px",
          fontStyle: "normal",
          fontWeight: "700",
          lineHeight: "normal",
          margin: "0 auto",
        })}
      >
        My Timeline
      </div>
      <div
        css={css({
          color: "#313131",
          textAlign: "center",
          fontFamily: "Pretendard",
          fontSize: "20px",
          fontStyle: "normal",
          fontWeight: "400",
          lineHeight: "normal",
          marginTop: "13px",
        })}
      >
        <h5>내 커리어를 타임라인으로 기록해보세요</h5> {/* 폰트 적용되면 h5 태그 빼기 */}
      </div>
      <section>
        {items.map((item, index) =>
          item.type === "item" ? (
            <MainTimelineItem
              key={index}
              startDate={item.data.startDate}
              endDate={item.data.endDate}
              title={item.data.title}
              onEdit={() => editItem(index)}
              onDelete={() => deleteItem(index)}
            />
          ) : (
            <MainTimelineInput
              key={index}
              index={index}
              saveItem={saveItem}
              initialData={item.data}
              onDelete={() => deleteItem(index)}
            />
          )
        )}
        <Button
          onClick={addInput}  // 버튼 클릭 시 addInput 함수 호출
          width="810px"
          height="85px"
          margin="45px auto"
          backgroundColor="#f8f6f6"
          textColor="#717171"
          fontSize="35px"
          borderRadius="30px"
        >
          +
        </Button>
      </section>
    </div>
  );
}
