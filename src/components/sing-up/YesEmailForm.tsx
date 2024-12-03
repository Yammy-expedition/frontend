import React, { useEffect, useState } from 'react';
import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue
} from 'react-hook-form';
import styled from 'styled-components';
import { User } from 'types/user';
import { postSendCode } from 'utils/sign-up/postSendCode';
import { postSubmitCode } from 'utils/sign-up/postSubmitCode';

interface YesEmailFormProps {
  setValue: UseFormSetValue<User>;
  getValues: UseFormGetValues<User>;
  register: UseFormRegister<User>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function YesEmailForm({
  setValue,
  getValues,
  register,
  setStep
}: YesEmailFormProps) {
  const [code, setCode] = useState<string>();
  const [token, setToken] = useState<string>();
  const [certified, setCertified] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);

  const onClickNextButton = () => {
    setStep((prev) => prev + 1);
  };

  const onClickSendCode = () => {
    postSendCode(getValues('email') + '@sogang.ac.kr', setToken, setIsLoading);
  };

  useEffect(() => {
    return () => {
      const value = getValues('email');
      setValue('email', `${value}@sogang.ac.kr`);
    };
  }, []);

  return (
    <YesEmailFormContainer>
      <CertifyBox>
        <EmailContainer>
          <p>Sogang University E-mail Address (ID)</p>
          <input
            type="email"
            {...register('email', {
              required: true
            })}
            disabled={certified}
          />
          <span> @sogang.ac.kr </span>
          <button onClick={onClickSendCode}>send code</button>
          {isLoading === true
            ? 'Sending...'
            : isLoading === false
              ? 'Successfully Sent'
              : ''}
        </EmailContainer>

        <CertifyCodeContainer $certified={certified}>
          <p>Code</p>
          <input type="text" onChange={(e) => setCode(e.target.value)} />
          <button onClick={() => postSubmitCode(token, code, setCertified)}>
            submit
          </button>
          <span>{certified ? 'completed' : 'uncompleted'}</span>
        </CertifyCodeContainer>
      </CertifyBox>

      <ButtonBox>
        <NextButton
          $certified={certified}
          disabled={!certified}
          onClick={onClickNextButton}
        >
          Next
        </NextButton>
      </ButtonBox>
    </YesEmailFormContainer>
  );
}

const YesEmailFormContainer = styled.div``;

const CertifyBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 2rem;
  width: 30rem;
  height: 35rem;
  background: white;

  @media screen and (min-width: 768px) {
    width: 50rem;
    height: 30rem;
  }
`;

const EmailContainer = styled.div`
  > p {
    font-size: 1.6rem;
    margin-bottom: 1.6rem;
  }

  > input {
    padding: 0.4rem;
  }

  > span {
    font-size: 1rem;
    margin-right: 1.6rem;
  }

  @media screen and (min-width: 768px) {
    > p {
      font-size: 2rem;
      margin-bottom: 2rem;
    }

    > input {
      padding: 0.5rem;
    }

    > span {
      font-size: 1.2rem;
      margin-right: 2rem;
    }
  }
`;

const CertifyCodeContainer = styled.div<{ $certified: boolean }>`
  > p {
    font-size: 1.6rem;
    margin-bottom: 1.6rem;
  }

  > input {
    margin-right: 1.6rem;
    padding: 0.4rem;
  }

  > button {
    margin-right: 1.6rem;
  }

  > span {
    font-size: 1rem;
    color: ${(props) => (props.$certified ? 'blue' : 'red')};
  }

  @media screen and (min-width: 768px) {
    > p {
      font-size: 2rem;
      margin-bottom: 2rem;
    }

    > input {
      margin-right: 2rem;
      padding: 0.5rem;
    }

    > button {
      margin-right: 2rem;
    }

    > span {
      font-size: 1.2rem;
      color: ${(props) => (props.$certified ? 'blue' : 'red')};
    }
  }
`;

const ButtonBox = styled.div`
  margin: 5rem 0;
  display: flex;
  justify-content: center;
`;

const NextButton = styled.button<{ $certified: boolean }>`
  width: 8rem;
  height: 4rem;
  font-size: 1.6rem;
  background: ${(props) =>
    props.$certified ? 'var(--vertical-gradient)' : ''};
  color: ${(props) => (props.$certified ? 'white' : '')};
  border-radius: 0.5rem;
  border: 1px solid var(--border-color);
  cursor: ${(props) => (props.$certified ? 'pointer' : '')};

  @media screen and (min-width: 768px) {
    width: 10rem;
    height: 5rem;
    font-size: 2rem;
  }
`;
