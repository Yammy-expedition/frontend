import PersonalInformation from 'components/sing-up/PersonalInformation';
import SelfCertification from 'components/sing-up/SelfCertification';
import TermsAndConditions from 'components/sing-up/TermsAndConditions';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { User } from 'types/user';

export default function SignUpPage() {
  const [step, setStep] = useState<number>(1);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<User>({
    univcert: false,
    email: '',
    password: '',
    nickname: '',
    major: '',
    nationality: '',
    sex: null,
    age: null,
    languages: '',
    introduce: '',
    hobby: null,
    mbti: null,
    profile_image: null,
    univ_certified: false,
    created_at: new Date().toLocaleDateString(),
    is_staff: false,
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const submit = () => {
    console.log('ing');
    //백엔드에 데이터 보내기
    //데이터 부족하면 alert 하고 채우라고
    //잘 있으면 홈으로
    navigate('/');
  };

  return (
    <SignUpPageContainer>
      <p>Sign Up</p>
      {step === 1 ? <TermsAndConditions setStep={setStep} /> : null}
      {step === 2 ? (
        <SelfCertification setStep={setStep} updateFormData={updateFormData} />
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
