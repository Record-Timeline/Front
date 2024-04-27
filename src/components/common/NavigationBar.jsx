/** @jsxImportSource @emotion/react */

import Logo from "../../assets/images/recodeTimelineLogo.svg";
import { css } from "@emotion/react";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import MenuIcon from "@mui/icons-material/Menu";
import CreateIcon from "@mui/icons-material/Create";
import { useState } from "react";
import testProfileImg from "../../assets/images/testProfileImg.png";
export default function NavigationBar() {
  const [isExpanded, setIsExpanded] = useState(true); // 네비게이션 바 펼친 상태 & 접힌 상태
  const nickName = "닉네임"; // 테스트 닉네임
  const interestCategory = "개발자"; // 테스트 관심분야
  const introduction = "어쩌구 저쩌구 하고싶은 웹 디벨로퍼 누구누구 입니다~"; // 테스트 소개글
  const toggleNavigationBar = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div
      css={css`
        width: ${isExpanded ? "350px" : "300px"};
        box-shadow: ${isExpanded ? "1px 0px 5px -3px #8b8b8b" : "none"};
        height: 100vh;
        display: flex;
        flex-direction: column;
        transition: width 0.4s ease; // 네비게이션 바 생기는 모션
      `}
    >
      <div
        css={css({
          display: "flex",
          alignItems: "center",
          margin: "30px 20px 0px 38px",
        })}
      >
        {isExpanded ? (
          <div>
            <div
              css={css({
                display: "flex",
                alignItems: "center",
              })}
            >
              <img
                src={Logo}
                alt="record timeline"
                css={css`
                  width: ${isExpanded ? "180px" : "0px"};
                `}
              />
              <KeyboardDoubleArrowLeftIcon
                onClick={toggleNavigationBar}
                style={{
                  fontSize: "28px",
                  color: "#666666",
                  cursor: "pointer",
                  margin: "0px 0px -3px 70px",
                }}
              />
            </div>
            <div
              css={css({
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                margin: "40px 0px 20px 0px",
                fontSize: "22px",
                fontWeight: "500",
              })}
            >
              <img
                src={testProfileImg}
                alt="프로필 이미지"
                css={css({
                  width: "150px",
                  marginBottom: "20px",
                })}
              />
              <div>{nickName}</div>
            </div>
            <div
              css={css({
                display: "flex",
                flexDirection: "column",
              })}
            >
              <div
                css={css({
                  width: "95px",
                  borderRadius: "20px",
                  backgroundColor: "#829FD7",
                  color: "white",
                  textAlign: "center",
                  fontSize: "18px",
                  fontWeight: "200",
                  padding: "8px 0px",
                })}
              >
                {interestCategory}
              </div>
              <div
                css={css({
                  display: "flex",
                  alignItems: "center",
                })}
              >
                <textarea
                  css={css({
                    width: "80%",
                    border: "none",
                    borderLeft: "3px solid black",
                    height: "50px",
                    outline: "none",
                    fontSize: "15px",
                    padding: "5px 0px 5px 20px",
                    marginTop: "20px",
                    lineHeight: "140%",
                    resize: "none",
                  })}
                ></textarea>
                <CreateIcon
                  style={{
                    fontSize: "25px",
                    color: "#333333",
                    cursor: "pointer",
                    marginTop: "20px",
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            <MenuIcon
              onClick={toggleNavigationBar}
              style={{
                fontSize: "28px",
                color: "#333333",
                cursor: "pointer",
              }}
            />
            <img
              src={Logo}
              alt="record timeline"
              css={css({
                width: "165px",
                marginLeft: "10px",
              })}
            />
          </>
        )}
      </div>
    </div>
  );
}
