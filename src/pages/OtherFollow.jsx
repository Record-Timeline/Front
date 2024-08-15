/** @jsxImportSource @emotion/react */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { css } from "@emotion/react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import axiosInstance from "../utils/axiosInstance";
import OtherFollowerUser from "../components/follow/OtherFollowerUser";
import testProfileImg from "../assets/images/testProfileImg.png";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function OtherFollow() {
  const { memberId } = useParams(); // URL에서 memberId를 가져옴
  const navigate = useNavigate();
  const myMemberId = useSelector((state) => state.memberId); // 내 memberId 가져오기

  const [value, setValue] = useState(0);
  const [following, setFollowing] = useState([]); // 팔로잉 목록 state
  const [follower, setFollower] = useState([]); // 팔로워 목록 state
  const [isFollowingMap, setIsFollowingMap] = useState({}); // 팔로우 여부를 저장하는 map

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleUserClick = (userId) => {
    if (userId === myMemberId) {
      navigate('/mytimeline');
    } else {
      navigate(`/othersmain/${userId}`);
    }
  };


  // 현재 팔로잉 정보 불러오기
  const fetchFollowingData = async () => {
    try {
      const url = memberId
        ? `/api/v1/follow/${memberId}/following` // 다른 사람의 팔로잉 목록
        : "/api/v1/follow/my-following"; // 내 팔로잉 목록
      const response = await axiosInstance.get(url);
      setFollowing(response.data.result);

      // 다른 사람의 팔로잉 목록을 볼 때, 각 팔로잉의 팔로우 여부 확인
      if (memberId) {
        const promises = response.data.result.map(async (following) => {
          const isFollowingResponse = await axiosInstance.get(
            `/api/v1/follow/is-following/${following.memberId}`
          );
          return {
            followingId: following.memberId,
            isFollowing: isFollowingResponse.data.result,
          };
        });

        const results = await Promise.all(promises);
        const newIsFollowingMap = results.reduce((acc, cur) => {
          acc[cur.followingId] = cur.isFollowing;
          return acc;
        }, {});

        setIsFollowingMap(newIsFollowingMap);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 현재 팔로워 정보 불러오기
  const fetchFollowerData = async () => {
    try {
      const url = memberId
        ? `/api/v1/follow/${memberId}/followers` // 다른 사람의 팔로워 목록
        : "/api/v1/follow/my-followers"; // 내 팔로워 목록
      const response = await axiosInstance.get(url);
      setFollower(response.data.result);

      // 다른 사람의 팔로워 목록을 볼 때, 각 팔로워의 팔로우 여부 확인
      if (memberId) {
        const promises = response.data.result.map(async (follower) => {
          const isFollowingResponse = await axiosInstance.get(
            `/api/v1/follow/is-following/${follower.memberId}`
          );
          return {
            followerId: follower.memberId,
            isFollowing: isFollowingResponse.data.result,
          };
        });

        const results = await Promise.all(promises);
        const newIsFollowingMap = results.reduce((acc, cur) => {
          acc[cur.followerId] = cur.isFollowing;
          return acc;
        }, {});

        setIsFollowingMap(newIsFollowingMap);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFollowingData();
    fetchFollowerData();
  }, [memberId]);

  // 팔로우 또는 팔로우 취소
  const toggleFollow = async (userId) => {
    const isCurrentlyFollowing = isFollowingMap[userId];

    try {
      if (isCurrentlyFollowing) {
        await axiosInstance.delete(`/api/v1/follow/${userId}`);
        setSnackbarMessage("팔로우가 취소되었습니다.");
      } else {
        await axiosInstance.post(`/api/v1/follow/${userId}`);
        setSnackbarMessage("팔로우 되었습니다.");
      }

      setOpenSnackbar(true);

      // 팔로우 상태 업데이트
      setIsFollowingMap((prevMap) => ({
        ...prevMap,
        [userId]: !isCurrentlyFollowing,
      }));
    } catch (error) {
      console.error("팔로우/취소 실패:", error);
    }
  };

  // 카테고리 매핑
  const interestMapping = {
    Marketing_Promotion: "마케팅/홍보/조사",
    Accounting_Tax_Finance: "회계/세무/재무",
    GeneralAffairs_LegalAffairs_Affairs: "총무/법무/사무",
    IT_Data: "IT개발/데이터",
    Design: "디자인",
    Service: "서비스",
    Construction_Architecture: "건설/건축",
    MedicalCare: "의료",
    Education: "교육",
    Media_Culture_Sports: "미디어/문화/스포츠",
  };

  return (
    <div
      css={css`
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
      `}
    >
      <Box
        sx={{
          width: "100%",
          marginTop: "100px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            width: "100%",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="follow/following tabs"
            centered
            sx={{
              "& .MuiTab-root": {
                fontSize: "19px",
                minWidth: "150px",
                fontFamily: "Pretendard",
              },
              "& .MuiTabs-flexContainer": {
                justifyContent: "center",
              },
            }}
          >
            <Tab label="팔로워" {...a11yProps(0)} />
            <Tab label="팔로잉" {...a11yProps(1)} />
          </Tabs>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          maxWidth: "600px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CustomTabPanel value={value} index={0}>
          {/* 팔로워 목록 */}
          {follower.length === 0 ? (
            <Box
              sx={{
                textAlign: "center",
                fontSize: "18px",
                color: "#999999",
                paddingTop: "20px",
              }}
            >
              팔로워가 없습니다.
            </Box>
          ) : (
            follower.map((follower) => (
              <OtherFollowerUser
                key={follower.memberId}
                profileImgSrc={follower.profileImageUrl || testProfileImg}
                nickName={follower.nickname}
                interest={interestMapping[follower.interest]}
                followerId={follower.memberId}
                toggleFollow={toggleFollow}
                onClick={handleUserClick}
                isFollowing={memberId ? isFollowingMap[follower.memberId] : true} // 다른 사람의 팔로워 목록에서 팔로우 여부에 따라 버튼 표시
              />
            ))
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {/* 팔로잉 목록 */}
          {following.length === 0 ? (
            <Box
              sx={{
                textAlign: "center",
                fontSize: "18px",
                color: "#999999",
                paddingTop: "20px",
              }}
            >
              팔로잉이 없습니다.
            </Box>
          ) : (
            following.map((following) => (
              <OtherFollowerUser
                key={following.memberId}
                profileImgSrc={following.profileImageUrl || testProfileImg}
                nickName={following.nickname}
                interest={interestMapping[following.interest]}
                followerId={following.memberId}
                toggleFollow={toggleFollow}
                onClick={handleUserClick}
                isFollowing={memberId ? isFollowingMap[following.memberId] : true} // 다른 사람의 팔로잉 목록에서 팔로우 여부에 따라 버튼 표시
              />
            ))
          )}
        </CustomTabPanel>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
