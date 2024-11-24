import { instance } from 'api/instance';

export const postPostingLike = async (
  postingId: string | undefined,
  setLike: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const accessToken = localStorage.getItem('accessToken');

  const headers = { Authorization: `Bearer ${accessToken}` };

  try {
    const response = await instance.post(
      `/posting/${postingId}/like`,
      {},
      {
        headers
      }
    );

    if (response.status === 200) {
      console.log(response.data);
      setLike(response.data.liked);
    }
  } catch (err) {
    console.log('Error Occured');
  }
};
