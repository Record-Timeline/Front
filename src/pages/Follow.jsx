/** @jsxImportSource @emotion/react */

import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import axiosInstance from "../utils/axiosInstance";
import FollowerUser from "../components/follow/FollowerUser";
import testProfileImg from "../assets/images/testProfileImg.png";

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

export default function Follow() {
  const [value, setValue] = useState(0);
  const [following, setFollowing] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // 현재 팔로잉 정보 불러오기
  const fetchProfileData = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/follow/following");
      console.log(response.data.result);
      setFollowing(response.data.result); // 현재 팔로잉 목록 설정
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

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
            <Tab label="팔로우" {...a11yProps(0)} />
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
          {/* 팔로우 목록 */}
          {following.length > 0 ? (
            following.map((user) => (
              <FollowerUser
                key={user.memberId}
                profileImgSrc={user.profileImageUrl || testProfileImg}
                nickName={user.nickname}
                interest={interestMapping[user.interest]}
              />
            ))
          ) : (
            <div>팔로우 목록이 없습니다.</div>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          팔로잉 목록
        </CustomTabPanel>
      </Box>
    </div>
  );
}
