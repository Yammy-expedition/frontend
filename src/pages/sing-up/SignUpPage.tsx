import TermsAndConditions from 'components/sing-up/TermsAndConditions';
import React from 'react';
import styled from 'styled-components';

export default function SignUpPage() {
  return (
    <SignUpPageContainer>
      <p>Sign Up</p>
      <TermsAndConditions />
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
