import axios from 'axios';
import Cookies from 'js-cookie';

export const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  withCredentials: true
});

instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(error);
    console.log(error.response.status);
    if (error.response?.status === 401) {
      const dataToSend = { refresh: Cookies.get('refreshToken') };
      const newAccessToken = (await instance.post('/user/refresh', dataToSend))
        .data.access;
      console.log(newAccessToken);

      error.config.headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${newAccessToken}`
      };

      window.localStorage.removeItem('accessToken');
      window.localStorage.setItem('accessToken', newAccessToken);

      const response = await axios.request(error.config);
      return response;
    }
    return Promise.reject(error);
  }
);
