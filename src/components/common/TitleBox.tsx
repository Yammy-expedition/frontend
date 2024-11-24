import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function TitleBox() {
  const navigate = useNavigate();
  return (
    <LogoBox onClick={() => navigate('/')}>
      <BackgroundCircle />
      <div style={{ zIndex: 10, width: '100%' }}>
        {/* <ServiceName>unicon</ServiceName> */}
        {/* <UnivName>for Sogang University.</UnivName> */}
      </div>
    </LogoBox>
  );
}

const LogoBox = styled.div`
  padding-top: 3rem;
  margin-bottom: 4.5rem;
  position: relative;
  width: 100%;
  height: 9.5rem;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;
const BackgroundCircle = styled.div`
  position: absolute;
  width: 9.5rem;
  height: 9.5rem;
  background-image: linear-gradient(150deg, #fff 43.89%, #888 92.28%);
  border-radius: 10rem;
`;

const ServiceName = styled.h1`
  text-align: center;
  color: var(--primary-color);
  font-size: 5.6rem;
  font-family: var(--sub-font);
  font-weight: 300;
`;

const UnivName = styled.h2`
  text-align: right;
  font-size: 1.6rem;
  font-family: var(--sub-font);
  font-weight: 300;
`;
