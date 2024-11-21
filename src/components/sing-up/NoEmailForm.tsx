import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { User } from 'types/user';
import { postSendCode } from 'utils/postSendCode';
import { postSubmitCode } from 'utils/postSubmitCode';

interface NoEmailFormProps {
  updateFormData: (field: keyof User, value: any) => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  email: string;
}

export default function NoEmailForm({
  updateFormData,
  setStep,
  email
}: NoEmailFormProps) {
  const [code, setCode] = useState<string>();
  const [token, setToken] = useState<string>();
  const [certified, setCertified] = useState<boolean>(false);
  const [imgFile, setImgFile] = useState('');
  const imgFileRef = useRef<HTMLInputElement>(null);

  const onClickNextButton = () => {
    setStep((prev) => prev + 1);
  };

  const onSaveImage = () => {
    const reader = new FileReader();

    if (imgFileRef.current?.files) {
      const file = imgFileRef.current.files[0];

      if (file) {
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setImgFile(reader.result as string);

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
            onChange={(e) => updateFormData('email', e.target.value)}
            disabled={certified}
          />
          <button
            onClick={() => postSendCode(email, setToken)}
            disabled={certified}
          >
            send code
          </button>
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
            {imgFile === '' ? (
              <>
                <label htmlFor="file">
                  <span style={{ fontSize: '1.4rem' }}>+ Attach File</span>
                  <br />
                  <span style={{ color: 'blue' }}>
                    Image files such as jpeg, gif, png
                  </span>
                </label>
              </>
            ) : (
              <>
                <img src={imgFile} alt="proving-source" />
                <div>
                  <button onClick={onClickReupload}>reupload</button>
                  <button onClick={() => setImgFile('')}>delete</button>
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
        </ProvingContainer>
      </CertifyBox>

      <ButtonBox>
        <NextButton
          $certified={certified && imgFile !== ''}
          disabled={!(certified && imgFile !== '')}
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
  width: 50rem;
  background: white;
`;

const EmailContainer = styled.div`
  > p {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  > input {
    margin-right: 2rem;
    padding: 0.5rem;
  }
`;

const CertifyCodeContainer = styled.div<{ $certified: boolean }>`
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
  width: 10rem;
  height: 5rem;
  font-size: 2rem;
  background: ${(props) =>
    props.$certified ? 'var(--vertical-gradient)' : ''};
  color: ${(props) => (props.$certified ? 'white' : '')};
  border-radius: 0.5rem;
  border: 1px solid var(--border-color);
  cursor: ${(props) => (props.$certified ? 'pointer' : '')};
`;
