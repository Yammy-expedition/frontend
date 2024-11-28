import { instance } from 'api/instance';

export const postPosting = async (
  title: string,
  content: string,
  boardType: string,
  price: string
) => {
  const dataToSend = new FormData();
  dataToSend.append('title', title);
  dataToSend.append('content', content);
  dataToSend.append('board_type', boardType);
  dataToSend.append('price', price);

  console.log(boardType);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    'Content-Type': 'multipart/form-data'
  };

  try {
    const response = await instance.post('/posting', dataToSend);

    if (response.status === 201) {
      return response.data;
    }
  } catch (err) {
    console.log('Error Occured');
  }
};
