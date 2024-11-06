import Footer from 'components/main/Footer';
import MenuGroup from 'components/main/MenuGroup';
import TitleBox from 'components/main/TitleBox';
import React from 'react';
import styled from 'styled-components';

export default function SideBar() {
  return (
    <SideBarContainer>
      <div>
        <TitleBox />
        <MenuGroup />
      </div>
      <Footer />
    </SideBarContainer>
  );
}

const SideBarContainer = styled.div`
  z-index: 10;
  min-width: 38.4rem;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0.5rem 0 1rem rgba(0, 0, 0, 0.1);
  height: 100vh;
`;
