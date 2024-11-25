import { instance } from 'api/instance';
import { Posting } from 'types/posting';

export const getPostingList = async (
  boradType: string,
  onSet: (value: Posting[]) => void
) => {
  try {
    const response = await instance.get(`/posting?board_type=${boradType}`);
    if (response.status === 200) {
      onSet(response.data);
    }
  } catch (err) {
    console.log('Error occured');
  }
};
