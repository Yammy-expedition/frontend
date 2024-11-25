import LoginModal from 'components/login/LoginModal';
import LoginModalPortal from 'components/portal/LoginModalPortal';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Footer() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>();

  const HandleModalShow = () => {
    setLoginModalOpen(false);
  };

  const onClickLogout = () => {
    window.localStorage.removeItem('accessToken');
    window.location.reload();
  };

  useEffect(() => {
    if (window.localStorage.getItem('accessToken')) {
      setIsLogin(true);
    }
  }, []);

  const navigate = useNavigate();
  return (
    <FooterContainer>
      {isLogin ? (
        <>
          <div>chat</div>
          <p>|</p>
          <div>mypage</div>
          <p>|</p>
          <div onClick={onClickLogout}>logout</div>
        </>
      ) : (
        <>
          <div onClick={() => setLoginModalOpen(true)}>login</div>
          <p>|</p>
          <div onClick={() => navigate('/sign-up')}>sign up</div>

          {loginModalOpen && (
            <LoginModalPortal>
              <LoginModal onClose={HandleModalShow}></LoginModal>
            </LoginModalPortal>
          )}
        </>
      )}
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  margin: 4rem 0;
  display: flex;
  gap: 0.5rem;
  font-size: 1.2rem;
  @media screen and (min-width: 1024px) {
    font-size: 1.4rem;
  }
  > div {
    cursor: pointer;
  }
`;
