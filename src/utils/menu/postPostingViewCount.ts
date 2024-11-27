import { instance } from 'api/instance';

export const postPostingViewCount = async (postingId: string | undefined) => {
  const accessToken = localStorage.getItem('accessToken');

  const headers = accessToken
    ? {
        Authorization: `Bearer ${accessToken}`
      }
    : {};

  try {
    const response = await instance.post(
      `/posting/${postingId}/view`,
      {},
      {
        headers
      }
    );

    if (response.status === 200) {
      console.log(response.data);
    }
  } catch (err) {
    console.log('Error Occured');
  }
};
