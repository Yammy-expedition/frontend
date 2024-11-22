import { instance } from 'api/instance';
import PersonalInformation from 'components/sing-up/PersonalInformation';
import SelfCertification from 'components/sing-up/SelfCertification';
import TermsAndConditions from 'components/sing-up/TermsAndConditions';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { User } from 'types/user';

export default function SignUpPage() {
  const [step, setStep] = useState<number>(1);
  const [imgFile, setImgFile] = useState<string>('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState<User>({
    univcert: false,
    email: '',
    password: '',
    nickname: '',
    major: '',
    nationality: '',
    sex: null,
    birth: '',
    languages: '',
    introduce: '',
    mbti: null,
    profile_image: null,
    univ_certified: false,
    created_at: new Date().toLocaleDateString(),
    is_staff: false,
    start_date: '',
    end_date: ''
  });

  useEffect(() => {
    console.log(imgFile);
  }, [imgFile]);

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const submit = async () => {
    const {
      univcert,
      univ_certified,
      email,
      password,
      nickname,
      major,
      nationality,
      start_date,
      end_date,
      mbti,
      sex,
      birth,
      languages,
      introduce
    } = formData;

    const dataToSend = {
      univcert: univcert,
      univ_certified: univ_certified,
      email: email,
      password: password,
      nickname: nickname,
      major: major,
      nationality: nationality,
      start_date: start_date,
      end_date: end_date,
      mbti: mbti,
      sex: sex,
      birth: birth,
      languages: languages,
      introduce: introduce
    };
    try {
      const response1 = await instance.post('user/register', dataToSend);
      console.log(response1);
      if (response1.status === 201) {
        try {
          const response2 = await instance.post(
            `user/univrequest/${response1.data.id}`,
            {
              image: imgFile
            }
          );
          console.log(response2);

          if (response2.status === 201) {
            navigate('/');
          }
        } catch (err) {
          console.log('Error occured inner post');
        }
      }
    } catch (err) {
      console.log('Error occured outer post');
    }
    //
  };

  return (
    <SignUpPageContainer>
      <p>Sign Up</p>
      {step === 1 ? <TermsAndConditions setStep={setStep} /> : null}
      {step === 2 ? (
        <SelfCertification
          setStep={setStep}
          updateFormData={updateFormData}
          email={formData.email}
          imgFile={imgFile}
          setImgFile={setImgFile}
        />
      ) : null}
      {step === 3 ? (
        <PersonalInformation
          formData={formData}
          updateFormData={updateFormData}
          submit={submit}
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
