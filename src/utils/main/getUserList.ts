import { instance } from 'api/instance';

export const getUserList = async (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  nationality?: string | null,
  major?: string | null
) => {
  const query1 = nationality ? `nationality=${nationality}` : '';
  const query2 = major ? `major=${major}` : '';
  let totalQuery;

  if (query1 !== '' && query2 !== '') {
    totalQuery = `?${query1}&${query2}`;
  } else if (query2 === '') {
    totalQuery = `?${query1}`;
  } else if (query1 === '') {
    totalQuery = `?${query2}`;
  } else totalQuery = '';
  console.log(totalQuery);
  setLoading(true);

  try {
    const response = await instance.get(`/user/list${totalQuery}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    console.log('Error occured');
  } finally {
    setLoading(false);
  }
};
