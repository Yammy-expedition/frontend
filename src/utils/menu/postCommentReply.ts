import { instance } from 'api/instance';

export const postCommentReply = async (
  postingId: string | undefined,
  comment: string,
  parentId?: number
) => {
  const formData = new FormData();
  formData.append('content', comment);
  if (parentId) {
    formData.append('parent_id', parentId.toString());
  }

  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    'Content-Type': 'multipart/form-data'
  };

  try {
    const response = await instance.post(
      `/posting/${postingId}/comment`,
      formData,
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
