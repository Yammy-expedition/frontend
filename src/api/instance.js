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
  (response) => response,
  async (error) => {
    console.log(error);
    if (error.response?.status === 401) {
      const dataToSend = { refresh: Cookies.get('refreshToken') };

      try {
        const response = await instance.post('/user/refresh', dataToSend);

        if (response.status === 200) {
          window.localStorage.setItem('accessToken', response.data.access);
        }
      } catch (err) {
        console.log('Error in instance');
        console.log(err);
      }
    }
    return Promise.reject(error);
  }
);
