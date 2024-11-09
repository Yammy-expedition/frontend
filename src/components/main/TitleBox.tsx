import React from 'react';
import styled from 'styled-components';

export default function TitleBox() {
  return (
    <LogoBox>
      <BackgroundCircle />
      <div style={{ zIndex: 10, width: '100%' }}>
        <ServiceName>unicon</ServiceName>
        <UnivName>for Sogang University.</UnivName>
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
`;
const BackgroundCircle = styled.div`
  position: absolute;
  width: 9.5rem;
  height: 9.5rem;
  background-image: linear-gradient(to top left, #888888, #ffffff, #ffffff);
  border-radius: 10rem;
`;

const ServiceName = styled.h1`
  text-align: center;
  color: green;
  font-size: 5.6rem;
  font-family: 'Tahoma', sans-serif;
`;

const UnivName = styled.h2`
  text-align: right;
  font-size: 1.6rem;
  font-family: 'Tahoma', sans-serif;
`;
