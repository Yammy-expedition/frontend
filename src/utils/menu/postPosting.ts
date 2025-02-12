import { instance } from 'api/instance';

export const postPosting = async (
  title: string,
  content: string,
  boardType: string,
  price: string,
  imgFiles?: File[]
) => {
  const dataToSend = new FormData();
  dataToSend.append('title', title);
  dataToSend.append('content', content);
  dataToSend.append('board_type', boardType);
  dataToSend.append('price', price);
  if (imgFiles) {
    const blobImgFiles = imgFiles?.map((imgFile) => {
      return new Blob([imgFile], { type: imgFile.type });
    });
    blobImgFiles.forEach((blob) => dataToSend.append('images', blob));
  }

  console.log(boardType);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    'Content-Type': 'multipart/form-data'
  };

  try {
    const response = await instance.post('/posting', dataToSend, { headers });

    if (response.status === 201) {
      return response.data;
    }
  } catch (err) {
    console.log('Error Occured');
  }
};
