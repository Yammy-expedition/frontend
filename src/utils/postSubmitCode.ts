import { instance } from 'api/instance';

export const postSubmitCode = async (
  token: string | undefined,
  code: string | undefined,
  setCertified: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const dataToSend = { token: token, verification_code: code };
  try {
    const response = await instance.post('user/verify', dataToSend);

    if (response.status === 200) {
      alert('Authentication was successful.');
      setCertified(true);
    }
  } catch (err) {
    alert('The code does not match.');
  }
};
