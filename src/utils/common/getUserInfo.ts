import { instance } from 'api/instance';

export const getUserInfo = async (userId: number) => {
  try {
    const responese = await instance.get(`/user/${userId}`);

    if (responese.status === 200) return responese.data;
  } catch (err) {
    console.log(err);
  }
};
