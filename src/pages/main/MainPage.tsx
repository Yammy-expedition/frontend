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
  height: auto;
  min-height: 100vh; /* 부모 요소가 자식을 감쌀 수 있도록 설정 */
  overflow: visible; /* 잘림 방지 */
`;
