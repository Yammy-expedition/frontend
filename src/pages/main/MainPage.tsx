import React from 'react';
import styled from 'styled-components';

import TitleBox from 'components/main/TitleBox';
import MenuGroup from 'components/main/MenuGroup';

export default function MainPage() {
  return (
    <MainPageComponents>
      <SideBar>
        <div>
          <TitleBox></TitleBox>
          <MenuGroup></MenuGroup>
        </div>

        <Footer>
          <div>chat</div>
          <div>|</div>
          <div>mypage</div>
        </Footer>
      </SideBar>
      <MapBox>지도</MapBox>
    </MainPageComponents>
  );
}

const MainPageComponents = styled.div`
  display: flex;
  height: 100%;
`;
//------------------------------------------------------
const SideBar = styled.div`
  z-index: 10;
  width: 37.8rem;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0.5rem 0 1rem rgba(0, 0, 0, 0.1);
`;
//------------------------------------------------------
//------------------------------------------------------

const MapBox = styled.div`
  background: yellow;
  width: 50rem;
  height: 100vh;
`;

const Footer = styled.footer`
  margin: 4rem 0;
  display: flex;
  gap: 0.5rem;
  font-size: 2rem;
`;
