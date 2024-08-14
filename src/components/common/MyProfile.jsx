/** @jsxImportSource @emotion/react */

import * as React from "react";
import {useState} from "react";
import {css} from "@emotion/react";
import Button from "./Button"
import testProfileImg from "../../assets/images/testProfileImg.png";
import CareerModal from "../timeline/CareerModal";
import {useNavigate} from "react-router-dom";

export default function MyProfile({profile}) {
  const [isFollowed, setIsFollowed] = useState(false);
  const [followers, setFollowers] = useState(profile.followerCount);
  const [followings, setFollowings] = useState(profile.followingCount);
  const navigate = useNavigate();

  // 팔로우/팔로잉 목록 페이지로 이동
  const goToFollowList = () => {
    navigate(`/follow`);
  };

  // my 메인 타임라인 페이지로 이동
  const onClickNickname = () => {
    navigate(`/mytimeline`)
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
        height: "320px",
        marginBottom: "80px",
        backgroundColor: "#F2F5FA"
      })}
    >
      <div // 사진, 닉네임, 관심분야, 소개 감싸는 div
        css={css({
          display: "inline-block",
          alignItems: "left",
          flexDirection: "column",
          margin: "30px 0px 0px 400px",
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
        <div
          css={css({
            display: "flex",
            width: "600px", // 전체 컨테이너의 너비 조정
            marginTop: "50px",
            // border: "1px solid black",
          })}
        >
          <div
            css={css({
              width: "250px",
              height: "78px",
              borderRadius: "30px",
              backgroundColor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
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
          <div
            css={css({
              margin: "0px 0 0 180px",
            })}
          >
            <CareerModal />
            {/*<Button*/}
            {/*  width="160px"*/}
            {/*  height="40px"*/}
            {/*  margin="0px 0 0 180px"*/}
            {/*  backgroundColor="none"*/}
            {/*  border="2px solid #829FD7"*/}
            {/*  textColor="#7286AD"*/}
            {/*  fontSize="15px"*/}
            {/*  borderRadius="30px"*/}
            {/*  lineHeight="40px"*/}
            {/*>*/}
            {/*  내 경력 사항 수정*/}
            {/*</Button>*/}
          </div>
        </div>
      </div>
    </div>
  )
}
