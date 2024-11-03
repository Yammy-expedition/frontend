import React from 'react';
import styled from 'styled-components';

import TitleBox from 'components/main/TitleBox';
import MenuGroup from 'components/main/MenuGroup';
import Footer from 'components/main/Footer';
import MapBox from 'components/main/MapBox';

export default function MainPage() {
  return (
    <MainPageComponent>
      <SideBar>
        <div>
          <TitleBox />
          <MenuGroup />
        </div>
        <Footer />
      </SideBar>
      <MapBox></MapBox>
    </MainPageComponent>
  );
}

const MainPageComponent = styled.div`
  display: flex;
  height: 100%;
`;

const SideBar = styled.div`
  z-index: 10;
  min-width: 38.4rem;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0.5rem 0 1rem rgba(0, 0, 0, 0.1);
`;
