import { instance } from 'api/instance';
import { AxiosError } from 'axios';

export const postSendCode = async (
  email: string,
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  const dataToSend = { email: email };
  console.log(dataToSend);
  try {
    const response = await instance.post('user/email', dataToSend);
    console.log(response.status);

    if (response.status === 201) {
      alert('A verification code has been sent to your email.');
      const codetoken = response.data.token;
      setToken(codetoken);
    }
  } catch (err) {
    const error = err as AxiosError;
    if (error.status === 409) {
      alert('This email is already registered.');
    }
  }
};
