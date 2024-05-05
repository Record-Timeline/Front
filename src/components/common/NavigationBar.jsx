/** @jsxImportSource @emotion/react */

import Logo from "../../assets/images/recodeTimelineLogo.svg";
import { css } from "@emotion/react";
import { useState } from "react";
import testProfileImg from "../../assets/images/testProfileImg.png";
import { Link } from "react-router-dom";
import ProfileNickName from "../main/ProfileNickName";

import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import MenuIcon from "@mui/icons-material/Menu";
import CreateIcon from "@mui/icons-material/Create";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function NavigationBar() {
  const [isExpanded, setIsExpanded] = useState(true); // 네비게이션 바 펼친 상태 & 접힌 상태
  const nickName = "닉네임"; // 테스트 닉네임
  const interestCategory = "개발자"; // 테스트 관심분야
  const [isEditingIntroduction, setIsEditingIntroduction] = useState(false); // 소개글 수정중 상태
  const [introductionText, setIntroductionText] = useState("");
  const followers = 20;
  const followings = 30;
  // 네비게이션 바 토글
  const toggleNavigationBar = () => {
    setIsExpanded(!isExpanded);
  };
  // 소개글 수정 토글
  const toggleEditIntroduction = () => {
    setIsEditingIntroduction(!isEditingIntroduction);
  };
  // 소개글 변경될 때
  const handleIntroductionChange = (event) => {
    setIntroductionText(event.target.value);
  };
  // 소개글 저장 누를 때
  const handleIntroductionSave = () => {
    if (introductionText.trim() === "") {
      alert("소개글을 작성해주세요.");
      return;
    }
    alert("소개글이 수정되었습니다");
    setIsEditingIntroduction(false);
  };

  return (
    <div
      css={css`
        position: fixed;
        top: 0;
        left: 0;
        width: ${isExpanded ? "310px" : "300px"};
        box-shadow: ${isExpanded ? "1px 0px 5px -3px #8b8b8b" : "none"};
        height: 100vh;
        display: flex;
        flex-direction: column;
      `}
    >
      <div
        css={css({
          display: "flex",
          alignItems: "center",
        })}
      >
        {isExpanded ? (
          <div
            css={css({
              height: "100vh",
              width: "100%",
              backgroundColor: "white",
              padding: "30px",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            })}
          >
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
                  width: ${isExpanded ? "160px" : "0px"};
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
                margin: "45px 0px 20px 0px",
                fontSize: "21px",
                fontWeight: "500",
              })}
            >
              <ProfileNickName
                profileImgSrc={testProfileImg}
                nickName={nickName}
              />
            </div>
            <div
              css={css({
                display: "flex",
                flexDirection: "column",
                height: "100%",
              })}
            >
              <div
                css={css({
                  width: "80px",
                  borderRadius: "20px",
                  backgroundColor: "#829FD7",
                  color: "white",
                  textAlign: "center",
                  fontSize: "15px",
                  fontWeight: "200",
                  padding: "7px 0px",
                })}
              >
                {interestCategory}
              </div>
              <div>
                {isEditingIntroduction ? (
                  <div css={css({ display: "flex", alignItems: "center" })}>
                    <textarea
                      value={introductionText}
                      onChange={handleIntroductionChange}
                      css={css`
                        width: 80%;
                        border: none;
                        border-left: 3px solid black;
                        height: 50px;
                        outline: none;
                        font-size: 15px;
                        padding: 5px 10px 5px 18px;
                        margin-top: 20px;
                        line-height: 140%;
                        resize: none;
                        color: #747474;
                      `}
                    ></textarea>
                    <CheckCircleIcon
                      onClick={handleIntroductionSave}
                      style={{
                        fontSize: "25px",
                        color: "#333333",
                        cursor: "pointer",
                        marginTop: "20px",
                        marginLeft: "5px",
                      }}
                    />
                  </div>
                ) : (
                  <div css={css({ display: "flex", alignItems: "center" })}>
                    <div
                      css={css({
                        display: "flex",
                        alignItems: "center",
                        width: "200px",
                        borderLeft: "3px solid black",
                        height: "50px",
                        fontSize: "14px",
                        padding: "5px 0px 5px 20px",
                        marginTop: "20px",
                        lineHeight: "140%",
                        wordBreak: "keep-all",
                      })}
                    >
                      {introductionText.trim() === "" ? (
                        <div
                          css={css({
                            whiteSpace: "pre-line",
                            fontSize: "13px",
                            width: "200px",
                            color: "#6d6d6d",
                          })}
                        >
                          소개글이 없습니다. {"\n"}나를 소개하는 한 마디를
                          적어주세요
                        </div>
                      ) : (
                        <div>{introductionText}</div>
                      )}
                    </div>
                    <CreateIcon
                      onClick={toggleEditIntroduction}
                      style={{
                        fontSize: "22px",
                        color: "#333333",
                        cursor: "pointer",
                        marginTop: "20px",
                        marginLeft: "5px",
                      }}
                    />
                  </div>
                )}
              </div>
              <div
                css={css({
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                })}
              >
                <div
                  css={css({
                    width: "95%",
                    height: "95px",
                    borderRadius: "30px",
                    backgroundColor: "#F5F5F5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    marginTop: "25px",
                  })}
                >
                  <div css={css({ marginLeft: "20px" })}>
                    <div css={css({ textAlign: "center", fontSize: "22px" })}>
                      {followers}
                    </div>
                    <div css={css({ textAlign: "center", fontSize: "14px" })}>
                      팔로워
                    </div>
                  </div>
                  <div css={css({ marginRight: "20px" })}>
                    <div css={css({ textAlign: "center", fontSize: "22px" })}>
                      {followings}
                    </div>
                    <div css={css({ textAlign: "center", fontSize: "14px" })}>
                      팔로잉
                    </div>
                  </div>
                </div>
                <Link
                  css={css`
                    width: 125.5%;
                    height: 80px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 17px;
                    border-top: 1px solid #e9e9e9;
                    margin-top: 30px;
                    cursor: pointer;
                    text-decoration: none;
                    color: #161616;
                  `}
                >
                  <HomeOutlinedIcon
                    style={{
                      fontSize: "28px",
                      marginRight: "8px",
                      color: "#353535",
                    }}
                  />
                  <div>내 타임라인</div>
                </Link>
                <Link
                  css={css`
                    width: 125.5%;
                    height: 80px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 17px;
                    border-top: 1px solid #e9e9e9;
                    border-bottom: 1px solid #e9e9e9;
                    cursor: pointer;
                    text-decoration: none;
                    color: #161616;
                  `}
                  to="/bookmark"
                >
                  <BookmarkBorderIcon
                    style={{
                      fontSize: "26px",
                      marginRight: "8px",
                      color: "#353535",
                    }}
                  />
                  <div>북마크한 게시물</div>
                </Link>
                <div
                  css={css({
                    display: "flex",
                    position: "absolute",
                    bottom: "20px",
                    fontSize: "14px",
                  })}
                >
                  <div
                    css={css({
                      border: "1px solid #595959",
                      color: "#595959",
                      padding: "8px 18px",
                      borderRadius: "24px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                    })}
                  >
                    <SettingsIcon
                      style={{
                        marginRight: "4px",
                      }}
                    />
                    회원정보 수정
                  </div>
                  <div
                    css={css({
                      border: "1px solid #607FB9",
                      color: "#607FB9",
                      padding: "8px 18px",
                      borderRadius: "24px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginLeft: "7px",
                      cursor: "pointer",
                    })}
                  >
                    <LogoutIcon
                      style={{
                        marginRight: "4px",
                      }}
                    />
                    로그아웃
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            css={css({
              padding: "30px 20px 0px 38px",
            })}
          >
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
          </div>
        )}
      </div>
    </div>
  );
}
