import TitleBox from 'components/common/TitleBox';
import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as CloseSVG } from '../../assets/icons/plus.svg';
import { instance } from 'api/instance';
import { AxiosError } from 'axios';

const LoginModal = ({ onClose }: any) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onClickLogin = async () => {
    const dataToSend = { email: email, password: password };

    try {
      const response = await instance.post('user/login', dataToSend);

      if (response.status === 200) {
        const accessToken = response.data.access;
        window.localStorage.setItem('accessToken', accessToken);
        console.log('Loginned Success');
        onClose();
        window.location.reload();
      }
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
    }
  };
  return (
    <LoginModalContainer onClick={onClose}>
      <LoginWindow onClick={(e) => e.stopPropagation()}>
        <CloseSVGWrapper>
          <CloseSVG onClick={onClose}></CloseSVG>
        </CloseSVGWrapper>

        <TitleBoxWrapper>
          <TitleBox></TitleBox>
        </TitleBoxWrapper>

        <InputBox>
          <InputField>
            <span>Email(ID) : </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputField>

          <InputField>
            <span>Password : </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputField>
        </InputBox>

        <LoginButtonWrapper>
          <LoginButton onClick={onClickLogin}>Login</LoginButton>
        </LoginButtonWrapper>
      </LoginWindow>
    </LoginModalContainer>
  );
};

export default LoginModal;

const LoginModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
`;

const LoginWindow = styled.div`
  background: white;
  width: 40rem;
  height: 50rem;
  padding: 2rem;
`;

const TitleBoxWrapper = styled.div`
  > * {
    margin-bottom: 8rem;
  }
`;

const CloseSVGWrapper = styled.div`
  transform: rotate(180deg);
  > * {
    transform: rotate(45deg);
    cursor: pointer;
  }
`;

const InputField = styled.div`
  > span {
    display: inline-block;
    margin-right: 1rem;
    text-align: right;
    width: 5rem;
  }

  > input {
    width: 20rem;
  }
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  margin-bottom: 7.5rem;
`;

const LoginButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const LoginButton = styled.button`
  width: 7.5rem;
  height: 4rem;
  background-image: var(--vertical-gradient);
  border-radius: 5px;
  color: white;
  border: none;
  font-weight: 600;
  font-size: 1.4rem;
  cursor: pointer;
`;
