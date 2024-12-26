import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function TitleBox() {
  const navigate = useNavigate();
  return (
    <LogoBox onClick={() => navigate('/')}>
      {/* <BackgroundCircle />
      <div style={{ zIndex: 10, width: '100%' }}>
     
      </div> */}
      <img src="https://i.imgur.com/GKvXV4S.png" alt="" />
    </LogoBox>
  );
}

const LogoBox = styled.div`
  padding-top: 1rem;
  position: relative;
  width: 100%;
  height: 15rem;
  display: flex;
  justify-content: center;
  cursor: pointer;
  img {
    height: 90%;
    object-fit: contain;
  }
  @media screen and (min-width: 1024px) {
    height: 17rem;
  }
`;
