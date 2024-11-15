import React, { useState } from 'react';
import styled from 'styled-components';
import { TermsAndConditionsText } from 'constants/TermsAndConditionsText';

interface TermsAndConditionsProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function TermsAndConditions({
  setStep
}: TermsAndConditionsProps) {
  const [checked, setChecked] = useState(false);

  const onClickNextButton = () => {
    setStep((prev) => prev + 1);
  };
  return (
    <TermsAndConditionsContainer>
      <p>① Agreement to Terms and Conditions</p>
      <Form>{TermsAndConditionsText}</Form>
      <AgreeBox>
        <div>
          <input
            style={{ zoom: 1.5 }}
            type="checkbox"
            onChange={() => setChecked((prev) => !prev)}
          ></input>
          <span>Yes, I Agree</span>
        </div>

        <NextButton
          $checked={checked}
          disabled={!checked}
          onClick={onClickNextButton}
        >
          Next
        </NextButton>
      </AgreeBox>
    </TermsAndConditionsContainer>
  );
}

const TermsAndConditionsContainer = styled.div`
  > p {
    font-family: var(--main-font);
    font-size: 2rem;
    margin: 1rem 0;
  }
`;

const Form = styled.div`
  white-space: pre-wrap;
  width: 50rem;
  height: 30rem;
  background: white;
  overflow-y: auto;
  padding: 2rem;
  font-size: 1.25rem;
  margin: 1rem 0;

  border: 1px solid var(--border-color);
  color: var(--secondary-text);
`;

const AgreeBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3.5rem;

  > div {
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
  margin: 3rem 0;
`;

const NextButton = styled.button<{ $checked: boolean }>`
  width: 10rem;
  height: 5rem;
  font-size: 2rem;
  background: ${(props) => (props.$checked ? 'var(--vertical-gradient)' : '')};
  color: ${(props) => (props.$checked ? 'white' : '')};
  border-radius: 0.5rem;
  border: 1px solid var(--border-color);
  cursor: ${(props) => (props.$checked ? 'pointer' : '')};
`;
