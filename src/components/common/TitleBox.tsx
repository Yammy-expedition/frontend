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
  padding-top: 3rem;
  margin-bottom: 4.5rem;
  position: relative;
  width: 100%;
  height: 20rem;
  display: flex;
  justify-content: center;
  cursor: pointer;
  img {
    height: 90%;
    object-fit: contain;
  }
`;
