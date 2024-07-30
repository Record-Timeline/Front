/** @jsxImportSource @emotion/react */

import React, {useEffect} from "react";
import { css } from "@emotion/react";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import axiosInstance from "../utils/axiosInstance";

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

export default function Bookmark() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // 현재 팔로잉 정보 불러오기
  const fetchProfileData = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/follow/following");
      console.log(response.data);
      //setFollowing(response.data); // 현재 닉네임 설정

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
          팔로우 목록
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          팔로잉 목록
        </CustomTabPanel>
      </Box>
    </div>
  );
}
