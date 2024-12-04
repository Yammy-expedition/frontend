import { instance } from 'api/instance';

export const putReadNotification = async (itemId: number) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
  };

  try {
    const response = await instance.put(`/notification/${itemId}`, { headers });
    if (response.status === 200) {
      console.log('good');
    }
  } catch (err) {
    console.log(err);
  }
};
