import { instance } from 'api/instance';

export const deleteAllNotification = async () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
  };

  try {
    const response = await instance.delete(`/notification`, {
      headers
    });

    if (response.status === 200) {
      console.log('good!! good!!! good!!!');
    }
  } catch (err) {
    console.log(err);
  }
};
