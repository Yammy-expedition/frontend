import { instance } from 'api/instance';

export const postCommentLike = async (commentId: number) => {
  const accessToken = localStorage.getItem('accessToken');

  const headers = { Authorization: `Bearer ${accessToken}` };

  try {
    const response = await instance.post(
      `/posting/comment/${commentId}/like`,
      {},
      {
        headers
      }
    );

    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    }
  } catch (err) {
    console.log('Error Occured');
  }
};
