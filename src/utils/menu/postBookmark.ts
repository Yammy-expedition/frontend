import { instance } from 'api/instance';

export const postBookmark = async (
  postingId: string,
  setBookmark: React.Dispatch<React.SetStateAction<boolean>>,
  isLoading: boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (isLoading) return;
  setIsLoading(true);
  const accessToken = localStorage.getItem('accessToken');
  const headers = { Authorization: `Bearer ${accessToken}` };

  try {
    const response = await instance.post(
      `/posting/${postingId}/bookmark`,
      {},
      { headers }
    );

    if (response.status === 200) {
      console.log(response.data);
      setBookmark((prev) => !prev);
    }
  } catch (err) {
    console.log(err);
  } finally {
    setIsLoading(false);
  }
};
