/** @jsxImportSource @emotion/react */

import React, {useState, useEffect} from "react";
import {css} from "@emotion/react";
import MyProfile from "../components/common/MyProfile";
import MainTimelineItem from "../components/timeline/MainTimelineItem";
import MainTimelineInput from "../components/timeline/MainTimelineInput";
import Button from "../components/common/Button";
import axios from "axios";

export default function MainTimeline() {
  // 타임라인 항목들을 관리할 상태 생성
  const [items, setItems] = useState([]);
  // 프로필 상태 추가
  const [profile, setProfile] = useState(null);

  // 토큰 정보 받아오기
  const token = localStorage.getItem("token");
  console.log("토큰 확인:", token); // 토큰 확인을 위한 콘솔 로그 추가

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
  const deleteItem = async (index) => {
    const itemId = items[index].data.id;
    // 메인 타임라인 삭제 연동 (DEL, DELETE)
    try {
      await axios.delete(
        `/api/v1/main-timelines/${itemId}`,
        {
          headers: {
            Accept: "*/*",
            "Content-Type": `application/json`,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setItems(items.filter((_, i) => i !== index));
      console.log("메인 타임라인 삭제 완료");
    } catch (error) {
      console.log("삭제 에러 발생:", error);
      console.error("삭제 에러 상세:", error.response ? error.response.data : error.message);
    }
  };

  // 메인 타임라인 생성 버튼 (체크 버튼)
  const createMainTimeline = async (data) => {
    // 메인 타임라인 생성 연동 (POST, CREATE)
    console.log(items)
    try {
      const response = await axios.post(
        `/api/v1/main-timelines`,
        {
          title: data.title,
          startDate: data.startDate,
          endDate: data.endDate,
        },
        {
          headers: {
            Accept: "*/*",
            "Content-Type": `application/json`,
            Authorization: `Bearer ${token}`
          },
        }
      );
      setItems([...items, { type: "item", data: response.data }]);
      console.log("메인 타임라인 생성 완료", response)
      console.log(items)
    } catch (error) {
      console.log("에러!")
      console.error(error);
    }
  };

  useEffect(() => { // useEffect 사용해서 컴포넌트가 마운트 될 때 메인 타임라인을 서버에서 가져옴
    // 메인 타임라인 조회 연동 (GET, READ)
    const fetchMainTimelines = async () => {
      try {
        const response = await axios.get(
          `/api/v1/main-timelines/member/21`,
          {
            headers: {
              Accept: "*/*",
              "Content-Type": `application/json`,
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setItems(response.data.map(item => ({ type: "item", data: item })));
        console.log("메인 타임라인 조회 완료", response);
      } catch (error) {
        console.log("에러 발생:", error);
        console.error("에러 상세:", error.response ? error.response.data : error.message);
      }
    };

    // 내 프로필 조회 연동 (메인 타임라인 페이지 내)
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

    fetchMainTimelines();
    fetchProfile();
  }, [token]);

  // 메인 타임라인 수정 버튼 (체크 버튼, 생성 버튼과 동일)
  const updateItem = async (index, data) => {
    const itemId = items[index].data.id;
    if (!itemId) {
      console.error("타임라인 항목의 ID가 없습니다.");
      return;
    }
    // 메인 타임라인 수정 연동 (PUT, UPDATE)
    console.log(items);
    try {
      const response = await axios.put( // 서버에 put 요청 보냄
        `/api/v1/main-timelines/${itemId}`,
        {
          title: data.title,
          startDate: data.startDate,
          endDate: data.endDate,
        },
        {
          headers: {
            Accept: "*/*",
            "Content-Type": `application/json`,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newItems = items.slice();
      newItems[index] = { type: "item", data: response.data };
      setItems(newItems);
      console.log("메인 타임라인 업데이트 완료", response);
    } catch (error) {
      console.log("업데이트 에러 발생:", error);
      console.error("업데이트 에러 상세:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div
      css={css({
        margin: "0 auto",
        marginBottom: "70px"
        // border: "1px solid black"
      })}
    >
      {/*<MyProfile/>*/}
      {profile && <MyProfile profile={profile} />} {/* 프로필 컴포넌트에 프로필 정보 전달 */}
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
              createMainTimeline={createMainTimeline} // 생성 연동
              updateItem={updateItem} // 수정 연동
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
