import { instance } from 'api/instance';
import { Posting } from 'types/posting';

export const getPostingList = async (
  boradType: string,
  onSet: (value: Posting[]) => void,
  page: number,
  orderType?: string | undefined
) => {
  try {
    const response = await instance.get(
      `/posting?board_type=${boradType}&page=${page}`
    );
    if (response.status === 200) {
      onSet(response.data.results);
      return response.data.count;
    }
  } catch (err) {
    console.log('Error occured');
  }
};
