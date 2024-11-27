import { instance } from 'api/instance';
import { Posting } from 'types/posting';

export const getPostingDetail = async (
  postingId: string | undefined,
  onSet: React.Dispatch<React.SetStateAction<Posting | undefined>>
) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
  };
  try {
    const response = await instance.get(`/posting/${postingId}`, { headers });
    if (response.status === 200) {
      onSet(response.data);
      return response.data;
    }
  } catch (err) {
    console.log('Error occured');
  }
};
