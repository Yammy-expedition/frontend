import { instance } from 'api/instance';

export const postComment = async (
  postingId: string | undefined,
  comment: string
) => {
  const dataToSend = { content: comment };

  console.log(dataToSend);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    'Content-Type': 'multipart/form-data'
  };

  try {
    const response = await instance.post(
      `/posting/${postingId}/comment`,
      { dataToSend },
      { headers }
    );

    if (response.status === 201) {
      console.log(response.data);
      return response.data;
    }
  } catch (err) {
    console.log('Error Occured');
  }
};
