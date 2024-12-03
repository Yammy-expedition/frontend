import React, { useRef, useState } from 'react';
import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister
} from 'react-hook-form';
import styled from 'styled-components';
import { User } from 'types/user';
import { postSendCode } from 'utils/sign-up/postSendCode';
import { postSubmitCode } from 'utils/sign-up/postSubmitCode';

interface NoEmailFormProps {
  getValues: UseFormGetValues<User>;
  register: UseFormRegister<User>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  imgFile: File | null;
  setImgFile: React.Dispatch<React.SetStateAction<File | null>>;
  errors: FieldErrors<User>;
}

export default function NoEmailForm({
  getValues,
  register,
  setStep,
  imgFile,
  setImgFile,
  errors
}: NoEmailFormProps) {
  const [code, setCode] = useState<string>();
  const [token, setToken] = useState<string>();
  const [certified, setCertified] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [preview, setPreview] = useState<string>('');
  const imgFileRef = useRef<HTMLInputElement>(null);

  const onClickNextButton = () => {
    setStep((prev) => prev + 1);
  };

  const onSaveImage = () => {
    const reader = new FileReader();

    if (imgFileRef.current?.files) {
      const file = imgFileRef.current.files[0];
      console.log(file);
      setImgFile(file);

      if (file) {
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setPreview(reader.result as string);

          if (imgFileRef.current) {
            imgFileRef.current.value = '';
          }
        };
      }
    }
  };

  const onClickReupload = () => {
    console.log(imgFileRef.current);
    if (imgFileRef.current) {
      imgFileRef.current.value = '';
      imgFileRef.current.click();
    }
  };

  return (
    <NoEmailFormContainer>
      <CertifyBox>
        <EmailContainer>
          <p>E-mail Address (ID)</p>
          <input
            type="email"
            {...register('email', {
              required: true,
              pattern: {
                value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                message: 'Invalid email format'
              }
            })}
            disabled={certified}
          />
          {errors.email && <small role="alert">{errors.email.message}</small>}
          <button
            onClick={() =>
              postSendCode(getValues('email'), setToken, setIsLoading)
            }
            disabled={certified}
          >
            send code
          </button>
          {isLoading === true
            ? 'Sending...'
            : isLoading === false
              ? 'Successfully Sent'
              : ''}
        </EmailContainer>

        <CertifyCodeContainer $certified={certified}>
          <p>Code</p>
          <input
            type="text"
            onChange={(e) => setCode(e.target.value)}
            disabled={certified}
          />
          <button
            onClick={() => postSubmitCode(token, code, setCertified)}
            disabled={certified}
          >
            submit
          </button>
          <span>{certified ? 'completed' : 'uncompleted'}</span>
        </CertifyCodeContainer>

        <ProvingContainer>
          <p>
            {`Please upload an image file to prove that you are a student at Sogang University
(ex. Course records, Logined Saint main page, student card, ...)`}
          </p>

          <ImgBox>
            {preview === '' ? (
              <>
                <label htmlFor="file">
                  <span style={{ fontSize: '1.4rem', cursor: 'pointer' }}>
                    + Attach File
                  </span>
                  <br />
                  <span style={{ color: 'blue' }}>
                    Image files such as jpeg, gif, png
                  </span>
                </label>
              </>
            ) : (
              <>
                <img src={preview} alt="proving-source" />
                <div>
                  <button onClick={onClickReupload}>reupload</button>
                  <button onClick={() => setPreview('')}>delete</button>
                </div>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              id="file"
              name="file"
              ref={imgFileRef}
              onChange={onSaveImage}
              style={{ display: 'none' }}
            />
          </ImgBox>

          <p>{`*It takes some times to accept you, because we have to check this file.
And we will destroy this file after checking

*Chat, Post and Comment functions are not available until you are approved`}</p>
        </ProvingContainer>
      </CertifyBox>

      <ButtonBox>
        <NextButton
          $certified={certified && preview !== ''}
          disabled={!(certified && preview !== '')}
          onClick={onClickNextButton}
        >
          Next
        </NextButton>
      </ButtonBox>
    </NoEmailFormContainer>
  );
}

const NoEmailFormContainer = styled.div``;

const CertifyBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 2rem;
  width: 30rem;
  background: white;

  @media screen and (min-width: 768px) {
    width: 50rem;
  }
`;

const EmailContainer = styled.div`
  > p {
    font-size: 1.6rem;
    margin-bottom: 1.6rem;
  }

  > input {
    margin-right: 1.6rem;
    padding: 0.5rem;
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

const ProvingContainer = styled.div`
  > p {
    white-space: pre-wrap;
  }
`;

const ImgBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 3rem 0;

  > img {
    width: 20rem;
    object-fit: cover;
  }

  > label {
    height: 5rem;
    cursor: pointer;
    border-radius: 1rem;
    border: dashed black;
    padding: 1rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
