/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Popover, Typography, Box } from "@mui/material";

export default function Header(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  // 알림 버튼 클릭 핸들러
  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // 알림 창 닫기 핸들러
  const handleNotificationClose = () => {
    setAnchorEl(null);
  };

  // 알림 창 열림 여부
  const open = Boolean(anchorEl);
  const id = open ? "notification-popover" : undefined;

  return (
    <div
      css={css`
        width: 100%;
        height: 50px;
        background-color: ${props.backgroundColor || "none"};
        display: flex;
        align-items: center;
        padding: 50px 0px 10px 0px;
      `}
    >
      <div
        css={css`
          margin-left: auto;
          padding: 8px 18px;
          align-items: center;
          justify-content: center;
          border-radius: 30px;
          background: #829fd7;
          cursor: pointer;
          color: #ffffff;
          font-size: 15px;
          font-weight: 200;
        `}
      >
        {!!localStorage.getItem("token") ? (
          <Link
            to={"/mytimeline"}
            css={css`
              text-decoration: none;
              color: white;
            `}
          >
            내 타임라인
          </Link>
        ) : (
          <Link
            to={"/login"}
            css={css`
              text-decoration: none;
              color: white;
            `}
          >
            시작하기
          </Link>
        )}
      </div>
      <NotificationsIcon
        style={{
          fontSize: "30px",
          cursor: "pointer",
          color: "#525252",
          margin: "0px 0px 0px 20px",
        }}
        onClick={handleNotificationClick}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleNotificationClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          sx: {
            borderRadius: "30px",
            boxShadow: "0px 1px 6px 0px rgba(0, 0, 0, 0.25)",
          },
        }}
      >
        <Box
          sx={{
            backgroundColor: "#FFF",
            width: 600,
            display: 'flex',
            justifyContent: "center",
            flexDirection: 'column',

          }}
        >
          <Box
            sx={{
              height: 70,
              display: 'flex',
              alignItems: "center",
              padding: '0px 25px',
            }}
          >
            <Typography
              variant="h6"
              sx={{ mb: 1, fontFamily: "Pretendard", fontWeight: "bold", justifyContent: 'center', marginBottom: 0, }}
            >
              알림
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "#F8F8F8",
              padding: '30px 25px',
            }}
          >
            <Typography variant="body2" sx={{ fontFamily: "Pretendard" }}>
              새로운 알림이 없습니다.
            </Typography>
          </Box>
        </Box>
      </Popover>
      <Link to="/search">
        <SearchIcon
          style={{
            fontSize: "30px",
            cursor: "pointer",
            color: "#525252",
            margin: "8px 50px 0px 7px",
          }}
        />
      </Link>
    </div>
  );
}
