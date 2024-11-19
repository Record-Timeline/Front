/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Popover, Typography, Box } from "@mui/material";
import axiosInstance from "../../utils/axiosInstance";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';

export default function Header(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0); // 안 읽은 알림 개수

  const navigate = useNavigate();

  // 알림 api
  useEffect(() => {
    console.log("알림");
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get("/api/v1/notifications/my");
        console.log("알림: ", response);
        if (response.data.errorCode === "NOTIFICATION4000") {
          setNotifications([]);
        } else {
          setNotifications(response.data.result);
        }
      } catch (error) {
        console.error("알림을 불러오는데 오류 발생:", error);
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchUnreadCount = async () => {
      try {
        const response = await axiosInstance.get("/api/v1/notifications/unread/count");
        setUnreadCount(response.data.result); // unreadCount 상태 업데이트
      } catch (error) {
        console.error("Unread count fetch failed:", error);
      }
    };

    fetchNotifications();
    fetchUnreadCount();
  }, []);

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

  // 시간 차이 계산 함수
  const getTimeDifference = (createdAt) => {
    const now = new Date(); // 현재 시간
    const createdDate = new Date(createdAt); // 생성된 시간
    const diffInSeconds = Math.floor((now - createdDate) / 1000); // 시간 차이를 초 단위로 계산
    const diffInMinutes = Math.floor(diffInSeconds / 60); // 분 단위로 변환
    const diffInHours = Math.floor(diffInMinutes / 60); // 시간 단위로 변환
    const diffInDays = Math.floor(diffInHours / 24); // 일 단위로 변환

    if (diffInMinutes < 1) return "방금 전"; // 1분 미만일 경우
    if (diffInMinutes < 60) return `${diffInMinutes}분 전`; // 1시간 미만일 경우
    if (diffInHours < 24) return `${diffInHours}시간 전`; // 24시간 미만일 경우
    return `${diffInDays}일 전`; // 그 외의 경우
  };

  const isLoggedIn = !!localStorage.getItem("token"); // 로그인 여부 확인

  // 알림 클릭 시 호출되는 함수
  const handleNotificationNavigation = async (notification) => {
    try {
      // 알림 읽음 상태로 변경하는 API 호출
      await axiosInstance.put(`/api/v1/notifications/${notification.id}/read`);

      // 알림 유형에 따라 이동 처리
      if (notification.type === 'FOLLOW' && notification.followerId) {
        navigate(`/othersmain/${notification.followerId}`);
      } else if (notification.postId) {
        navigate(`/othersmain/${notification.postId}`);
      }
    } catch (error) {
      console.error(`Failed to mark notification ${notification.id} as read:`, error);
    }
  };


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
        {isLoggedIn ? (
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
      {isLoggedIn && ( // 로그인된 경우에만 알림 아이콘을 렌더링
        <div style={{ position: 'relative' }}>
          <NotificationsIcon
            style={{
              fontSize: "30px",
              cursor: "pointer",
              color: "#525252",
              margin: "5px 2px 0px 20px",
            }}
            onClick={handleNotificationClick}
          />
          {unreadCount > 0 && ( // 안읽은 알림이 있을 경우 개수 표시
            <span
              style={{
                position: 'absolute',
                top: '0px',
                right: '-5px',
                backgroundColor: '#829fd7',
                color: 'white',
                borderRadius: '50%',
                padding: '2px 7px',
                fontSize: '11px',
                fontWeight: 'bold',
              }}
            >
              {unreadCount}
            </span>
          )}
        </div>
      )}
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
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              height: 70,
              display: "flex",
              alignItems: "center",
              padding: "0px 25px",
            }}
          >
            <Typography
              variant="h6"
              sx={{ mb: 1, fontFamily: "Pretendard", fontWeight: "bold", justifyContent: "center", marginBottom: 0 }}
            >
              알림
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "#F8F8F8",
              padding: "30px 25px",
            }}
          >
            {loading ? (
              <Typography variant="body2" sx={{ fontFamily: "Pretendard" }}>
                알림을 불러오고 있습니다.
              </Typography>
            ) : notifications.length === 0 ? (
              <Typography variant="body2" sx={{ fontFamily: "Pretendard" }}>
                새로운 알림이 없습니다.
              </Typography>
            ) : (
              notifications
                .slice() // 원본 배열을 변경하지 않기 위해 slice() 사용
                .reverse() // 배열을 역순으로 정렬
                .map((notification, index) => (
                  <Box
                    key={notification.id}
                    sx={{
                      paddingTop: index === 0 ? 0 : "20px", // 첫 번째 알림에는 paddingTop을 0으로 설정
                      paddingBottom: index === notifications.length - 1 ? 0 : "20px", // 마지막 알림에는 paddingBottom을 0으로 설정
                      borderBottom: index === notifications.length - 1 ? "none" : "1px solid #E4E4E4", // 마지막 알림에는 borderBottom을 제거
                      fontWeight: notification.read ? "normal" : "bold", // 읽은 상태에 따라 글자 두께 설정
                      opacity: notification.read ? 0.4 : 1, // 읽은 상태에 따라 불투명도 조절
                      cursor: 'pointer',
                    }}
                    onClick={() => handleNotificationNavigation(notification)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                          src={notification.profileImageUrl}
                          alt="Profile"
                          style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            marginRight: '20px',
                          }}
                        />
                        <div>
                          <Typography variant="body2" sx={{ fontFamily: "Pretendard", fontSize: 16 }}>
                            {notification.message} {/* 알림 메시지 */}
                          </Typography>
                          <Typography variant="caption" sx={{ fontFamily: "Pretendard", color: "#888" }}>
                            {getTimeDifference(notification.createdAt)}
                          </Typography>
                        </div>
                      </div>
                      <ChevronRightIcon />
                    </div>
                  </Box>

                ))
            )}
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
