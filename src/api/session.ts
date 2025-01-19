import axios from 'axios';
import Cookies from 'js-cookie';

// 세션 상태 확인 함수
export const checkSession = async (): Promise<boolean> => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = Cookies.get('refreshToken');
  console.log(accessToken, refreshToken);

  // Access 토큰과 Refresh 토큰이 없으면 세션 없음
  if (!accessToken || !refreshToken) {
    window.localStorage.removeItem('accessToken');
    Cookies.remove('refreshToken');
    return false;
  }

  // Access 토큰 만료 여부 확인
  const isAccessTokenExpired = checkTokenExpired(accessToken);
  if (isAccessTokenExpired) {
    try {
      // Refresh 토큰으로 새로운 Access 토큰 발급
      const response = await axios.post('/user/refresh', {
        refresh: refreshToken
      });
      localStorage.setItem('accessToken', response.data.access);
      return true; // 세션 유지
    } catch (error) {
      console.error('Refresh token expired:', error);
      return false; // 세션 만료
    }
  }

  return true; // Access 토큰이 유효
};

// Access 토큰 만료 여부 확인 함수
const checkTokenExpired = (token: string): boolean => {
  const payload = JSON.parse(atob(token.split('.')[1]));
  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp < currentTime; // 만료 여부 반환
};
