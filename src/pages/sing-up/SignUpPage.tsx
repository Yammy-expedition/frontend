import PersonalInformation from 'components/sing-up/PersonalInformation';
import SelfCertification from 'components/sing-up/SelfCertification';
import TermsAndConditions from 'components/sing-up/TermsAndConditions';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { User } from 'types/user';

export default function SignUpPage() {
  const [step, setStep] = useState<number>(1);

  const [formData, setFormData] = useState<User>({
    univcert: false,
    email: '',
    password: '',
    nickname: '',
    major: '',
    nationality: '',
    sex: null,
    birth: null,
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

  return (
    <SignUpPageContainer>
      <p>Sign Up</p>
      {step === 1 ? <TermsAndConditions setStep={setStep} /> : null}
      {step === 2 ? (
        <SelfCertification setStep={setStep} updateFormData={updateFormData} />
      ) : null}
      {step === 3 ? (
        <PersonalInformation updateFormData={updateFormData} />
      ) : null}
    </SignUpPageContainer>
  );
}

const SignUpPageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    font-size: 5rem;
    margin: 4rem 0;
  }
`;
