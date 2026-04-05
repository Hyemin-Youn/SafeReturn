import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true, // 쿠키(Refresh Token) 전송을 위해 필수
});

// 1. 요청 인터셉터: 모든 요청에 Access Token 삽입
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 2. 응답 인터셉터: 401(만료) 에러 시 토큰 갱신 로직
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // 토큰이 만료되었고, 재시도하지 않은 요청일 때
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // 백엔드의 /auth/refresh 엔드포인트로 새 토큰 요청
        const res = await axios.post('/auth/refresh'); 
        const { accessToken } = res.data;
        
        localStorage.setItem('accessToken', accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        
        return api(originalRequest); // 원래 하려던 요청 재시도
      } catch (refreshError) {
        // Refresh Token도 만료되었다면 로그아웃 처리
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;