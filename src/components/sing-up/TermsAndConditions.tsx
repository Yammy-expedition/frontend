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
    font-size: 1.4rem;
    margin: 1rem 0;

    @media screen and (min-width: 768px) {
      font-size: 2rem;
    }
  }
`;

const Form = styled.div`
  white-space: pre-wrap;
  width: 30rem;
  height: 35rem;

  background: white;
  overflow-y: auto;
  padding: 2rem;
  font-size: 1.25rem;
  margin: 1rem 0;

  @media screen and (min-width: 768px) {
    width: 50rem;
    height: 30rem;
  }

  border: 1px solid var(--border-color);
  color: var(--secondary-text);
`;

const AgreeBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  @media screen and (min-width: 768px) {
    gap: 3.5rem;
  }

  > div {
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    > input {
      zoom: 1.2;
      @media screen and (min-width: 768px) {
        zoom: 1.5;
      }
    }

    > span {
      font-size: 1.6rem;
      @media screen and (min-width: 768px) {
        font-size: 2rem;
      }
    }
  }
  margin: 2rem 0;

  @media screen and (min-width: 768px) {
    margin: 3rem 0;
  }
`;

const NextButton = styled.button<{ $checked: boolean }>`
  width: 8rem;
  height: 4rem;
  font-size: 1.6rem;
  background: ${(props) => (props.$checked ? 'var(--vertical-gradient)' : '')};
  color: ${(props) => (props.$checked ? 'white' : '')};
  border-radius: 0.5rem;
  border: 1px solid var(--border-color);
  cursor: ${(props) => (props.$checked ? 'pointer' : '')};

  @media screen and (min-width: 768px) {
    width: 10rem;
    height: 5rem;
    font-size: 2rem;
  }
`;
