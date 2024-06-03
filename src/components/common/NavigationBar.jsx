/** @jsxImportSource @emotion/react */

import Logo from "../../assets/images/recodeTimelineLogo.svg";
import { css } from "@emotion/react";
import React, { useState, useEffect } from "react";
import testProfileImg from "../../assets/images/testProfileImg.png";
import {Link, useNavigate} from "react-router-dom";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import MenuIcon from "@mui/icons-material/Menu";
import CreateIcon from "@mui/icons-material/Create";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import PersonIcon from '@mui/icons-material/Person';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";
import ProfileInfo from "../main/ProfileInfo";
import axiosInstance from '../../utils/axiosInstance';
import {useNavigation} from "react-router-dom";

export default function NavigationBar() {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(true); // 네비게이션 바 펼친 상태 & 접힌 상태

  const [isEditingIntroduction, setIsEditingIntroduction] = useState(false); // 소개글 수정중 상태
  const [isEditingProfile, setIsEditingProfile] = useState(false); // 프로필 수정중 상태
  const [introductionText, setIntroductionText] = useState("");
  const followers = 20;
  const followings = 30;

  const [openProfileSnackbar, setOpenProfileSnackbar] = useState(false);
  const [openIntroduceSnackbar, setOpenIntroduceSnackbar] = useState(false);
  const [openLogoutSnackbar, setOpenLogoutSnackbar] = useState(false);

  const [profileImage, setProfileImage] = useState(); // 프로필 이미지
  const [profileThumbnail, setProfileThumbnail] = useState() // 프로필 이미지 썸네일

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

  // 프로필 정보 (닉네임, 관심분야, 프로필 사진, 소개글)
  const [profileInfo, setProfileInfo] = useState({
    nickname: "",
    interest: "",
    profileImageUrl: "",
    introduction: "",
  });

  const handleCloseProfileSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenProfileSnackbar(false);
  };

  const handleCloseIntroduceSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenIntroduceSnackbar(false);
  };

  const handleCloseLogoutSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenLogoutSnackbar(false);
  };


  // 네비게이션 바 열고 닫기
  const toggleNavigationBar = () => {
    setIsExpanded(!isExpanded);
  };

  // 로고 클릭 시 메인페이지로 이동
  const onClickLogoImg = () => {
    navigate("/")
  };

  // 소개글 수정 토글
  const toggleEditIntroduction = () => {
    setIsEditingIntroduction(!isEditingIntroduction);
    setIntroductionText(profileInfo.introduction)
  };
  // 소개글 변경될 때
  const handleIntroductionChange = (event) => {
    setIntroductionText(event.target.value);
  };
  // 소개글 저장 누를 때
  const handleIntroductionSave  = async () => {
    // 소개글을 입력하지 않았을 때
    if (introductionText.trim() === "") {
      alert("소개글을 작성해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append('introduction',introductionText);

    // 소개글 작성 연동
    try {
      const response = await axiosInstance.post(
        `/api/v1/profile/update-introduction`,
        formData,
        {
          headers: {
            Accept: "*/*",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      // 코드 발송 성공헀을 때
      if (response.status === 200) {
        setIntroductionText(profileInfo.introduction); // 소개글 상태 초기화
        setOpenIntroduceSnackbar(true);
        setIsEditingIntroduction(false);
      }
      fetchProfileInfo()
    } catch (error) {
      console.error(error);
    }
  };

  // 프로필 편집
  const onClickEditProfile = () => {
    setIsEditingProfile(true);
  };

  // 프로필 편집
  const onClickCancleEditProfile = () => {
    setIsEditingProfile(false);
  };
  console.log("profileInfo", profileInfo)
  // 프로필 정보 가져오기
  const fetchProfileInfo = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/my-profile");
      setProfileInfo(response.data);
      console.log("사용자 정보", response.data)
    } catch (error) {
      console.error(error);
    }
  };

  // 프로필 저장
  const onClickSaveProfile = async () => {
    // 프로필 변경 연동
    const formData = new FormData();
    formData.append('profileImage', profileImage);

    console.log(...formData);
    try {
      const response = await axiosInstance.post(
        `/api/v1/profile/update-image`,
        formData,
        {
          headers: {
            Accept: "*/*",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      // 코드 발송 성공헀을 때
      if (response.status === 200) {
        setIsEditingProfile(false); // 프로필 편집 중 상태 false로 바꿈
        setOpenProfileSnackbar(true); // 프로필 저장 성공 시 스낵바
        fetchProfileInfo();
      }
    } catch (error) {
      console.error(error);
      alert("프로필 저장에 실패했습니다. 다시 시도해주세요.")
    }
  };

  // 프로필 삭제
  const removeProfileImg = async () => {
    try {
      const response = await axiosInstance.delete(
        `/api/v1/profile/delete-image`,
        {
          headers: {
            Accept: "*/*",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      // 코드 발송 성공헀을 때
      if (response.status === 200) {
        setIsEditingProfile(false); // 프로필 편집 중 상태 false로 바꿈
        setOpenProfileSnackbar(true); // 프로필 저장 성공 시 스낵바
        fetchProfileInfo();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 사진 업로드 되었을 때
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
    console.log(file)
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileThumbnail(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    fetchProfileInfo();
  }, []);

  // 로그아웃
  const handleLogout = () => {
    localStorage.removeItem('token');
    setOpenLogoutSnackbar(true);
  };


  return (
    <div
      css={css`
        position: fixed;
        top: 0;
        left: 0;
        width: ${isExpanded ? "285px" : "300px"};
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
              padding: "25px",
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
                  width: ${isExpanded ? "140px" : "0px"};
                    cursor: pointer;
                `}
                onClick={onClickLogoImg}
              />
              <KeyboardDoubleArrowLeftIcon
                onClick={toggleNavigationBar}
                style={{
                  fontSize: "27px",
                  color: "#666666",
                  cursor: "pointer",
                  margin: "0px 0px -3px 72px",
                }}
              />
            </div>
            {localStorage.getItem("token")?
              <>
                <div
                  css={css({
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    margin: "35px 0px 10px 0px",
                    fontSize: "20px",
                    fontWeight: "500",
                  })}
                >
                  <div
                    css={css({
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      marginBottom: "10px",
                      fontSize: "19px",
                      fontWeight: "500",
                      position: "relative"
                    })}
                  >
                    {isEditingProfile ?
                      // 프로필 이미지 편집 중
                      <><label htmlFor="inputTag" >
                        {profileThumbnail ? <><img
                          src={profileThumbnail}
                          alt="프로필 이미지"
                          css={css({
                            width: "130px",
                            height: "130px",
                            marginBottom: "10px",
                            borderRadius: "50%",
                            overflow: "hidden",
                            cursor: "pointer"
                          })}
                          onClick={onClickEditProfile}
                        />
                          <input type="file" id="inputTag" accept="image/*" css={css({
                            display: "none"
                          })} onChange={handleFileChange}/>
                        </> : <div css={css({
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center"
                        })}><img
                          src={profileInfo.profileImageUrl ? profileInfo.profileImageUrl : testProfileImg}
                          alt="프로필 이미지"
                          css={css({
                            width: "130px",
                            height: "130px",
                            overflow: "hidden",
                            marginBottom: "10px",
                            borderRadius: "50%",
                          })}
                          onClick={onClickEditProfile}
                        />
                          <input type="file" id="inputTag" accept="image/*" css={css({
                            display: "none"
                          })} onChange={handleFileChange}/>
                          <CameraAltOutlinedIcon style={{
                            fontSize: "70px",
                            color: "#e1e1e1",
                            cursor: "pointer",
                            position: "absolute",
                            zIndex: "3",
                          }}
                          /></div>}

                      </label>
                        <div css={css({
                          display: "flex",
                          marginBottom: "10px",
                          justifyContent: "center",
                          flexWrap: "wrap"
                        })}>
                          <div css={css({
                            fontSize: "15px",
                            border: "1px solid #829FD7",
                            borderRadius: "15px",
                            padding: "2px 8px",
                            color: "#829FD7",
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",

                          })}
                               onClick={onClickSaveProfile}><CheckCircleIcon style={{
                            fontSize: "23px",
                            marginRight: "5px"
                          }}/>프로필 저장
                          </div>
                          <div css={css({
                            fontSize: "15px",
                            border: "1px solid #8d8d8d",
                            borderRadius: "15px",
                            padding: "2px 8px",
                            color: "#999999",
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                            marginLeft: "5px"
                          })}
                               onClick={onClickCancleEditProfile}
                          > 취소
                          </div>
                          <div
                            css={css({
                              fontSize: "12px",
                              textDecoration: "underline",
                              marginTop: "5px",
                              color: "#ababab",
                              cursor: "pointer",
                            })}
                            onClick={removeProfileImg}
                          >프로필 삭제하기</div>
                        </div>
                      </> :
                      // 프로필 이미지 편집중 아닐 때
                      <>
                        {profileInfo ? <><img
                          src={profileInfo.profileImageUrl ? profileInfo.profileImageUrl : testProfileImg}
                          alt="프로필 이미지"
                          css={css({
                            width: "130px",
                            height: "130px",
                            overflow: "hidden",
                            marginBottom: "10px",
                            borderRadius: "50%",
                          })}
                        /></> : <><img
                          src={testProfileImg}
                          alt="프로필 이미지"
                          css={css({
                            width: "130px",
                            marginBottom: "10px",
                          })}
                        /><PersonIcon style={{
                          fontSize: "90px",
                          color: "#B1B1B1",
                          cursor: "pointer",
                          position: "absolute",
                          top: "18px",

                        }}/></> }

                        <div css={css({
                          fontSize: "15px",
                          color: "#B1B1B1",
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                          marginBottom: "10px"
                        })}
                             onClick={onClickEditProfile}>프로필 이미지 편집<CreateIcon style={{
                          fontSize: "18px",
                          marginLeft: "5px"
                        }}/></div>
                      </>}

                    <div>{profileInfo.nickname}</div>
                  </div>
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
                      width: "fit-content",
                      borderRadius: "20px",
                      backgroundColor: "#829FD7",
                      color: "white",
                      textAlign: "center",
                      fontSize: "15px",
                      fontWeight: "200",
                      padding: "4px 10px",
                    })}
                  >
                    {interestMapping[profileInfo.interest]}
                  </div>
                  <div>
                    {isEditingIntroduction ? (
                      <div css={css({display: "flex", alignItems: "center"})}>
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
                            fontSize: "23px",
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
                            padding: "5px 0px 5px 18px",
                            marginTop: "20px",
                            lineHeight: "140%",
                            wordBreak: "break-all",
                          })}
                        >
                          {profileInfo.introduction.trim() === "" ? (
                            <div
                              css={css({
                                whiteSpace: "pre-line",
                                fontSize: "12px",
                                width: "200px",
                                color: "#6d6d6d",
                              })}
                            >
                              소개글이 없습니다. {"\n"}나를 소개하는 한 마디를
                              적어주세요
                            </div>
                          ) : (
                            <div>{profileInfo.introduction}</div>
                          )}
                        </div>
                        <CreateIcon
                          onClick={toggleEditIntroduction}
                          style={{
                            fontSize: "19px",
                            color: "#333333",
                            cursor: "pointer",
                            marginTop: "20px",
                            marginLeft: "2px",
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
                        width: "93%",
                        height: "78px",
                        borderRadius: "30px",
                        backgroundColor: "#F5F5F5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                        marginTop: "20px",
                      })}
                    >
                      <div css={css({ marginLeft: "20px" })}>
                        <div css={css({ textAlign: "center", fontSize: "20px" })}>
                          {followers}
                        </div>
                        <div css={css({ textAlign: "center", fontSize: "13px" })}>
                          팔로워
                        </div>
                      </div>
                      <div css={css({ marginRight: "20px" })}>
                        <div css={css({ textAlign: "center", fontSize: "20px" })}>
                          {followings}
                        </div>
                        <div css={css({ textAlign: "center", fontSize: "13px" })}>
                          팔로잉
                        </div>
                      </div>
                    </div>
                    <Link
                      css={css`
                    width: 125.5%;
                    height: 60px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 15px;
                    border-top: 1px solid #e9e9e9;
                    margin-top: 20px;
                    cursor: pointer;
                    text-decoration: none;
                    color: #161616;
                  `}
                    >
                      <HomeOutlinedIcon
                        style={{
                          fontSize: "26px",
                          marginRight: "8px",
                          color: "#353535",
                        }}
                      />
                      <div>내 타임라인</div>
                    </Link>
                    <Link
                      css={css`
                    width: 125.5%;
                    height: 60px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 15px;
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
                          fontSize: "24px",
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
                        fontSize: "13px",
                      })}
                    >
                      <div
                        css={css({
                          border: "1px solid #595959",
                          color: "#595959",
                          padding: "6px 13px",
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
                        onClick={handleLogout}
                        css={css({
                          border: "1px solid #607FB9",
                          color: "#607FB9",
                          padding: "6px 13px",
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
                </div></> :
              // 토큰 정보가 없을 때
              (<div css={css({
                  display:"flex",
                  flexDirection: "column",
                  alignItems: "center"
                })}><div css={css({
                  whiteSpace: "pre-wrap",
                  textAlign: "center",
                  color: "#494949",
                  fontSize: "16px",
                  fontWeight: "400",
                  lineHeight: "28px",
                  margin: "62px 0px 30px 0px"
                })}><span css={css({
                  color: "#405988",
                  fontWeight: "600",
                })}>레코드 타임라인</span>에서 {"\n"}
                  당신의 타임라인을 그려보세요!
                </div>
                  <Link to="/login" css={css({
                    width: "fit-content",
                    borderRadius: "20px",
                    border: "1.5px solid #607FB9",
                    color: "#607FB9",
                    fontSize: "16px",
                    fontWeight: "400",
                    textDecoration: "none",
                    padding: "7px 16px"
                  })}>레코드 타임라인 시작하기</Link>
                </div>
              )}
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
              onClick={onClickLogoImg}
              css={css({
                width: "165px",
                marginLeft: "10px",
                cursor: "pointer"
              })}
            />
          </div>
        )}
      </div>
      <Snackbar open={openProfileSnackbar} autoHideDuration={3000} onClose={handleCloseProfileSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert
          onClose={handleCloseProfileSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          프로필 사진이 변경되었습니다.
        </Alert>
      </Snackbar>

      <Snackbar open={openIntroduceSnackbar} autoHideDuration={3000} onClose={handleCloseIntroduceSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert
          onClose={handleCloseIntroduceSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          소개글이 수정되었습니다
        </Alert>
      </Snackbar>

      <Snackbar open={openLogoutSnackbar} autoHideDuration={3000} onClose={handleCloseLogoutSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert
          onClose={handleCloseLogoutSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          로그아웃 되었습니다.
        </Alert>
      </Snackbar>
    </div>
  );
}