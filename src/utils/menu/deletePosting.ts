import { instance } from 'api/instance';

export const deletePosting = async (postingId: string | undefined) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
  };

  try {
    const response = await instance.delete(`/posting/${postingId}`, {
      headers
    });

    if (response.status === 201) {
      console.log(response.data);
      return response.data;
    }
  } catch (err) {
    console.log('Error Occured');
  }
};
