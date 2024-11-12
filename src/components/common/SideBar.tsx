import Footer from 'components/main/Footer';
import MenuGroup from 'components/main/MenuGroup';
import TitleBox from 'components/main/TitleBox';
import React from 'react';
import styled from 'styled-components';

export default function SideBar() {
  return (
    <SideBarContainer>
      <TitleBox />
      <MenuGroup />
      <Footer />
    </SideBarContainer>
  );
}

const SideBarContainer = styled.div`
  z-index: 10;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0.5rem 0 1rem rgba(0, 0, 0, 0.1);
  min-height: 100vh;

  min-width: 25.4rem;
  padding: 0 1.6rem;

  @media screen and (min-width: 1024px) {
    min-width: 29.4rem;
    padding: 0 2rem;
  }
`;
