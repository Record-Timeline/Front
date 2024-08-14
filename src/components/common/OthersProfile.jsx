/** @jsxImportSource @emotion/react */

import * as React from "react";
import {useState, useEffect} from "react";
import {css} from "@emotion/react";
import Button from "./Button"
import testProfileImg from "../../assets/images/testProfileImg.png";
import axiosInstance from "../../utils/axiosInstance";
import {useNavigate} from "react-router-dom";

export default function OthersProfile({profile}) {
  const [isFollowed, setIsFollowed] = useState(false);
  const [followers, setFollowers] = useState(profile.followerCount);
  const [followings, setFollowings] = useState(profile.followingCount);
  const navigate = useNavigate();

  // 팔로우/팔로잉 목록 페이지로 이동
  const goToFollowList = () => {
    navigate(`/follow/${profile.memberId}`);
  };

  // 해당 멤버의 메인 타임라인 페이지로 이동
  const onClickNickname = () => {
    navigate(`/othersmain/${profile.memberId}`)
  }

  // 팔로우 상태 연동
  const followStatus = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/follow/is-following/${profile.memberId}`)
      const followedStatus = response.data.result; // '내'가 해당 'memberId'를 팔로우 했는지 여부 (true/false)
      console.log("팔로우 상태 체크 완료", response.data);

      if (followedStatus) { // 팔로우 여부 상태 체크
        setIsFollowed(true)
      }
    } catch (error) {
      console.log("팔로우 상태 체크 오류", error);
      console.error("에러 상세:", error.response ? error.response.data : error.message);
    }
  }

  useEffect(() => {
    followStatus();
  }, [])

  const onClickFollow = async () => {
    if (isFollowed) {
      // 팔로우 취소 연동
      try {
        const response = await axiosInstance.delete(`/api/v1/follow/${profile.memberId}`)
        setFollowers(followers - 1); // 팔루오 해제 시 팔로우 수 감소
        console.log("팔로우 취소 완료", response);
      } catch (error) {
        console.log("팔로우 취소 오류", error);
        console.error("에러 상세:", error.response ? error.response.data : error.message);
      }
    } else {
      // 팔로우 연동
        try {
          const response = await axiosInstance.post(`/api/v1/follow/${profile.memberId}`, {});
          setFollowers(followers + 1); // 팔로우 누를 시 팔로우 수 증가
          console.log("팔로우 완료", response)
        } catch (error) {
          console.log("팔로우 연동 오류", error);
          console.error("에러 상세:", error.response ? error.response.data : error.message);
        }
    }
    setIsFollowed(!isFollowed); // 팔로우 상태 토글
  }

  // 카테고리
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

  return (
    <div
      css={css({
        width: "100%",
        height: "340px",
        marginBottom: "80px",
        backgroundColor: "#F2F5FA"
      })}
    >
      <div // 사진, 닉네임, 관심분야, 소개 감싸는 div
        css={css({
          display: "inline-block",
          alignItems: "left",
          flexDirection: "column",
          margin: "25px 0px 0px 400px",
          // border: "1px solid lightgray",
        })}
      >
        <img // 프로필 이미지
          src={profile.profileImageUrl || testProfileImg}
          alt="프로필 이미지"
          css={css({
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            display: "inline-block",
            verticalAlign: "bottom",
            // border: "1px solid lightgray",
          })}
        />
        <div css={css({display: "inline-block", width: "330px"})}>
          <div
            onClick={onClickNickname}
            css={css({
              fontSize: "25px",
              fontWeight: "700",
              marginLeft: "25px",
              display: "inline-block",
              cursor: "pointer",
              ":hover": {
                textDecoration: "underline",
              }
            })}
          >
            {profile.nickname}
          </div>
          <div
            css={css({
              fontSize: "15px",
              color: "#5D5D5D",
              marginLeft: "5px",
              display: "inline-block",
            })}
          >
            님의 타임라인
          </div>
          <div // 관심 분야
            css={css({
              width: "fit-content",
              borderRadius: "20px",
              backgroundColor: "#829FD7",
              color: "white",
              textAlign: "center",
              fontSize: "15px",
              fontWeight: "200",
              marginTop: "3px",
              // marginBottom: "10px",
              marginLeft: "25px",
              padding: "4px 10px",
            })}
          >
            {interestMapping[profile.interest]}
          </div>
        </div>
        <div
          css={css({
            height: "65px",
            fontSize: "15px",
            color: "black",
            // marginLeft: "60px",
            borderLeft: "3px solid #6E6E6E",
            verticalAlign: "bottom",
            display: "inline-block",
            padding: "10px 15px",
          })}
        >
          {profile.introduction}
        </div>
        <div>
          <Button
            Follow={isFollowed}
            onClick={onClickFollow}
            width="120px"
            height="40px"
            // lineHeight="15px" // 나중에 깨지면 지우기
            margin="28px 0 0 0"
            backgroundColor={isFollowed ? "#EEEEEE" : "#fff"}
            border="1px solid #D7D7D7"
            textColor="#424242"
            fontSize="15px"
            borderRadius="30px"
            css={css({display: "inline-block",})}
          >
            {isFollowed ? "팔로잉" : "팔로우"}
          </Button>
          <Button
            width="150px"
            height="40px"
            margin="28px 0 0 310px"
            backgroundColor="none"
            border="2px solid #829FD7"
            textColor="#7286AD"
            fontSize="15px"
            borderRadius="30px"
            css={css({display: "inline-block"})}
          >
            경력 사항 보기
          </Button>
        </div>
        <div
          css={css({
            width: "250px",
            height: "78px",
            borderRadius: "30px",
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            marginTop: "15px",
          })}
        >
          <div
            onClick={goToFollowList}
            css={css({marginLeft: "20px", cursor: "pointer"})}
          >
            <div css={css({textAlign: "center", fontSize: "20px"})}>
              {followers}
            </div>
            <div css={css({textAlign: "center", fontSize: "13px"})}>
              팔로워
            </div>
          </div>
          <div
            onClick={goToFollowList}
            css={css({marginRight: "20px", cursor: "pointer"})}
          >
            <div css={css({textAlign: "center", fontSize: "20px"})}>
              {followings}
            </div>
            <div css={css({textAlign: "center", fontSize: "13px"})}>
              팔로잉
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
