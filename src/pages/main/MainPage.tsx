import React from 'react';
import styled from 'styled-components';
import MapBox from 'components/main/MapBox';

export default function MainPage() {
  return (
    <MainPageComponent>
      <MapBox></MapBox>
    </MainPageComponent>
  );
}

const MainPageComponent = styled.div`
  display: flex;
  width: 100%;
`;
