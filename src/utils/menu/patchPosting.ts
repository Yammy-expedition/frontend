import { instance } from 'api/instance';

export const patchPosting = async (
  postingId: string | undefined,
  title: string,
  content: string,
  price: string
) => {
  const dataToSend = new FormData();
  dataToSend.append('title', title);
  dataToSend.append('content', content);
  dataToSend.append('price', price);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    'Content-Type': 'multipart/form-data'
  };

  try {
    const response = await instance.patch(`/posting/${postingId}`, dataToSend, {
      headers
    });

    if (response.status === 200) {
      console.log(response.data);
    }
  } catch (err) {
    console.log('Error Occured');
  }
};
