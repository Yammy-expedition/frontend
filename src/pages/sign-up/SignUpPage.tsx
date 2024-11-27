import { instance } from 'api/instance';
import PersonalInformation from 'components/sing-up/PersonalInformation';
import SelfCertification from 'components/sing-up/SelfCertification';
import TermsAndConditions from 'components/sing-up/TermsAndConditions';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { User } from 'types/user';

export default function SignUpPage() {
  const [step, setStep] = useState<number>(1);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue
  } = useForm<User>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      check_password: '',
      nickname: '',
      major: '',
      nationality: '',
      sex: '',
      birth: '',
      languages: '',
      introduce: '',
      mbti: '',
      start_date: '',
      end_date: ''
    }
  });

  useEffect(() => {
    console.log(imgFile);
  }, [imgFile]);

  const submit = async (data: User) => {
    const dataToSend = data;

    try {
      const response1 = await instance.post('user/register', dataToSend);
      console.log(response1);
      if (response1.status === 201) {
        try {
          const response2 = await instance.post('user/login', {
            email: dataToSend.email,
            password: dataToSend.password
          });

          if (response2.status === 200) {
            const accessToken = response2.data.access;
            window.localStorage.setItem('accessToken', accessToken);

            if (!dataToSend.email.includes('sogang.ac.kr')) {
              const formData = new FormData();
              if (imgFile) {
                formData.append('image', imgFile);
              }

              const headers = {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'multipart/form-data'
              };
              try {
                const response3 = await instance.post(
                  `user/univrequest/${response1.data.id}`,
                  formData,
                  { headers }
                );

                if (response3.status === 201) {
                  console.log('Send completely');
                  console.log(response3.data);
                  navigate('/');
                }
              } catch (err) {
                console.log('Error occured in Image Sending');
              }
            } else navigate('/');
          }
        } catch (err) {
          console.log('Error occured in Login');
        }
      }
    } catch (err) {
      console.log('Error occured outer post');
    }
  };

  return (
    <SignUpPageContainer>
      <p>Sign Up</p>
      {step === 1 ? <TermsAndConditions setStep={setStep} /> : null}
      {step === 2 ? (
        <SelfCertification
          setValue={setValue}
          getValues={getValues}
          register={register}
          setStep={setStep}
          imgFile={imgFile}
          setImgFile={setImgFile}
          errors={errors}
        />
      ) : null}
      {step === 3 ? (
        <PersonalInformation
          handleSubmit={handleSubmit}
          setValue={setValue}
          getValues={getValues}
          register={register}
          submit={submit}
          errors={errors}
        />
      ) : null}
    </SignUpPageContainer>
  );
}

const SignUpPageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    font-size: 5rem;
    margin: 4rem 0;
  }
`;
