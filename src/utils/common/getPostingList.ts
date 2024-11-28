import { instance } from 'api/instance';
import { Posting } from 'types/posting';

export const getPostingList = async (
  boradType: string,
  onSet: (value: Posting[]) => void,
  page: number,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  orderType?: string | undefined,
  searchType?: string | undefined,
  searchContent?: string
) => {
  setLoading(true);
  try {
    const response = await instance.get(
      `/posting?board_type=${boradType}&page=${page}${orderType ? `&sort_by=${orderType}` : ''}${searchType ? `&search_type=${searchType}` : ''}${searchContent ? `&keyword=${searchContent}` : ''}`
    );

    if (response.status === 200) {
      onSet(response.data.results);
      return response.data.count;
    }
  } catch (err) {
    console.log('Error occured');
  } finally {
    setLoading(false);
  }
};
