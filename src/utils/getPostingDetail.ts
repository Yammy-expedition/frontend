import { instance } from 'api/instance';
import { Posting } from 'types/posting';

export const getPostingDetail = async (
  postingId: string | undefined,
  onSet: React.Dispatch<React.SetStateAction<Posting | undefined>>
) => {
  try {
    const response = await instance.get(`/posting/${postingId}`);
    if (response.status === 200) {
      onSet(response.data);
    }
  } catch (err) {
    console.log('Error occured');
  }
};
