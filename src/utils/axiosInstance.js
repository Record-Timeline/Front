import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "",
  headers: {
    'Content-Type': 'application/json',
  },
});

let isAlertShown = false; // alert가 표시되었는지 추적하는 변수

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

// 토큰이 만료되어 401 에러가 발생할 경우 처리하는 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    return response; // 응답이 성공적인 경우
  },
  async (error) => {
    if (error.response?.status === 401 && !isAlertShown) { // 응답이 401(Unauthorized)일 경우
      isAlertShown = true; // alert가 표시되었음을 기록
      alert('토큰이 만료되었습니다. 로그인을 다시 해주세요.');
      localStorage.removeItem('token'); // 로컬스토리지에서 토큰 제거
      window.location.replace('/login'); // 로그인 페이지로 이동
    }
    return Promise.reject(error); // 그 외의 오류 처리
  }
);

export default axiosInstance;
