import { instance } from 'api/instance';

export const getNotification = async () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
  };
  try {
    const response = await instance.get(`/notification`, { headers });
    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    }
  } catch (err) {
    console.log('Error occured');
  }
};
