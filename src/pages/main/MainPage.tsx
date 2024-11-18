import React from 'react';
import styled from 'styled-components';
import MapBox from 'components/main/MapBox';
import MarketRestaurantBox from 'components/main/MarketRestaurantBox';

export default function MainPage() {
  return (
    <MainPageContainer>
      <MapBox></MapBox>
      <MarketRestaurantBox></MarketRestaurantBox>
    </MainPageContainer>
  );
}

const MainPageContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  overflow-y: hidden;
`;
