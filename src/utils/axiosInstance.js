import axios from 'axios';
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: "",
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false; // 토큰 재발급 중인지 추적
let refreshSubscribers = []; // 토큰 재발급 중 실패한 요청을 보관

// 토큰 재발급이 완료된 후, 대기 중이던 요청들을 실행하는 함수
const onRefreshed = (newToken) => {
  refreshSubscribers.map((callback) => callback(newToken));
  refreshSubscribers = [];
};

// 실패한 요청을 대기열에 추가하는 함수
const addSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

// 요청 인터셉터 설정
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // 로컬스토리지에서 'token'값을 가져옴
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // 토큰이 있으면 헤더에 토큰 추가
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem('refreshToken');

    // 401 에러이고, 토큰 재발급 중이 아니고, 원래 요청이 한번도 재시도된 적이 없다면
    if (error.response?.status === 401 && refreshToken && !originalRequest._retry) {
      console.log("401 에러 발생!");
      console.log("accessToken before refresh:", localStorage.getItem('token'));
      console.log("refreshToken before refresh:", refreshToken);

      originalRequest._retry = true; // 재시도 방지 플래그 설정

      // 이미 토큰 재발급 중이라면, 대기열에 현재 요청을 추가
      if (isRefreshing) {
        return new Promise((resolve) => {
          addSubscriber((newToken) => {
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      isRefreshing = true; // 토큰 재발급 중임을 표시

      try {
        // refresh token을 사용해 새로운 access token 요청
        const response = await axios.post('/api/v1/auth/renew-tokens', {
          accessToken: localStorage.getItem('token'),
          refreshToken: refreshToken,
        });

        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;

        if (!newAccessToken || !newRefreshToken) {
          throw new Error('Received invalid tokens during refresh.');
        }

        console.log("새로운 토큰 발급 :", newAccessToken);

        // 새로운 토큰 저장
        localStorage.setItem('token', newAccessToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        // 대기 중이던 요청을 새로운 토큰으로 재시도
        onRefreshed(newAccessToken);
        isRefreshing = false;

        // 새로운 토큰으로 원래 요청 재시도
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // 재발급 실패 시 토큰 제거 및 로그인 페이지로 이동
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.replace('/login');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // 그 외의 오류 처리
  }
);

export default axiosInstance;
