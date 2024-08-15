/** @jsxImportSource @emotion/react */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { css } from "@emotion/react";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import axiosInstance from "../utils/axiosInstance";
import FollowerUser from "../components/follow/FollowerUser";
import testProfileImg from "../assets/images/testProfileImg.png";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Follow() {
  const navigate = useNavigate();
  const myMemberId = useSelector(state => state.memberId);
  const [value, setValue] = React.useState(0);
  const [following, setFollowing] = useState([]); // 팔로잉 목록 state
  const [follower, setFollower] = useState([]); // 팔로워 목록 state

  const [openFollowSnackbar, setOpenFollowSnackbar] = useState(false);
  const [openFollowerSnackbar, setOpenFollowerSnackbar] = useState(false);

  const handleCloseFollowSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenFollowSnackbar(false);
    console.log("닫기")
    console.log()
  };


  const handleCloseFollowerSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenFollowerSnackbar(false);
    console.log("닫기")
    console.log()
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // 현재 팔로잉 정보 불러오기
  const fetchFollowingData = async () => {
    try {
      const url = "/api/v1/follow/my-following";
      const response = await axiosInstance.get(url);
      console.log("팔로잉", response.data.result);
      setFollowing(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFollowingData();
  }, []);

  // 현재 팔로워 정보 불러오기
  const fetchFollowerData = async () => {
    try {
      const url = "/api/v1/follow/my-followers";// 내 팔로워 목록
      const response = await axiosInstance.get(url);
      console.log("팔로워", response.data.result);
      setFollower(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchFollowerData();
  }, []);

  // 팔로우 취소
  const cancleFollowing = async (followerId) => {
    try {
      const response = await axiosInstance.delete(`/api/v1/follow/${followerId}`);
      console.log("팔로잉 취소 성공:", response);
      // 요청이 성공하면, 현재 팔로잉 목록 갱신
      fetchFollowingData();
      setOpenFollowSnackbar(true)
    } catch (error) {
      console.error("팔로우 취소 실패:", error);
    }
  };

  // 팔로워 삭제
  const cancleFollower = async (followerId) => {
    try {
      const response = await axiosInstance.delete(`/api/v1/follow/remove-follower/${followerId}`);
      console.log("팔로워 삭제 성공:", response);
      // 요청이 성공하면, 현재 팔로워 목록 갱신
      fetchFollowerData();
      setOpenFollowerSnackbar(true)
    } catch (error) {
      console.error("팔로워 삭제 실패:", error);
    }
  };

  const handleUserClick = (userId) => {
    if (userId === myMemberId) {
      navigate('/mytimeline');
    } else {
      navigate(`/othersmain/${userId}`);
    }
  };


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
      css={css`
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
      `}
    >
      <Box
        sx={{
          width: '100%',
          marginTop: '100px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            width: '100%',
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="follow/following tabs"
            centered
            sx={{
              '& .MuiTab-root': {
                fontSize: '19px',
                minWidth: '150px',
                fontFamily: "Pretendard"
              },
              '& .MuiTabs-flexContainer': {
                justifyContent: 'center',
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
          width: '100%',
          maxWidth: '600px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <CustomTabPanel value={value} index={0}>
          {/*팔로워 목록*/}
          {follower.length === 0 ? (
            <Box sx={{ textAlign: 'center', fontSize: '18px', color: '#999999', paddingTop: '20px' }}>
              팔로워가 없습니다.
            </Box>
          ) : (
            follower.map((follower) => (
              <FollowerUser
                key={follower.memberId}
                profileImgSrc={follower.profileImageUrl || testProfileImg}
                nickName={follower.nickname}
                interest={interestMapping[follower.interest]}
                followerId={follower.memberId}
                cancleFollow={cancleFollower}
                isFollowing={false}
                onClick={handleUserClick}
              />
            ))
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {/*팔로잉 목록*/}
          {following.length === 0 ? (
            <Box sx={{ textAlign: 'center', fontSize: '18px', color: '#999999', paddingTop: '20px' }}>
              팔로잉이 없습니다.
            </Box>
          ) : (
            following.map((following) => (
              <FollowerUser
                key={following.memberId}
                profileImgSrc={following.profileImageUrl || testProfileImg}
                nickName={following.nickname}
                interest={interestMapping[following.interest]}
                followerId={following.memberId}
                cancleFollow={cancleFollowing}
                isFollowing={true}
                onClick={handleUserClick}
              />
            ))
          )}
        </CustomTabPanel>
      </Box>

      {/* 팔로우 취소 시 뜨는 스낵바 */}
      <Snackbar open={openFollowSnackbar} autoHideDuration={4000} onClose={handleCloseFollowSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert
          onClose={handleCloseFollowSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          팔로우가 취소되었습니다.
        </Alert>
      </Snackbar>

      {/* 팔로워 삭제 시 뜨는 스낵바 */}
      <Snackbar open={openFollowerSnackbar} autoHideDuration={4000} onClose={handleCloseFollowerSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert
          onClose={handleCloseFollowerSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          팔로워가 삭제되었습니다.
        </Alert>
      </Snackbar>
    </div>
  );
}
