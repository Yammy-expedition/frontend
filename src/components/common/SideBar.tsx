import Footer from 'components/common/Footer';
import MenuGroup from 'components/common/MenuGroup';
import TitleBox from 'components/common/TitleBox';
import styled from 'styled-components';
import Hamburger from './Hamburger';
import { useEffect, useRef, useState } from 'react';

interface SideBarProps {
  openHam: boolean;
  setOpenHam: React.Dispatch<React.SetStateAction<boolean>>;
  sideBarRef: React.RefObject<HTMLDivElement>;
  isLoggedIn: boolean;
}

export default function SideBar({
  openHam,
  setOpenHam,
  sideBarRef,
  isLoggedIn
}: SideBarProps) {
  useEffect(() => {
    if (!openHam) {
      sideBarRef.current?.style.setProperty('left', '-100rem');
    } else {
      sideBarRef.current?.style.setProperty('left', '0');
    }
  }, [openHam]);

  return (
    <SideBarContainer ref={sideBarRef}>
      <Header>
        <Hamburger setOpenHam={setOpenHam} />
        <TitleBox setOpenHam={setOpenHam} />
        <MenuGroup setOpenHam={setOpenHam} />
      </Header>
      <Footer setOpenHam={setOpenHam} isLoggedIn={isLoggedIn} />
    </SideBarContainer>
  );
}
const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 2rem;
  gap: 1rem;
`;
const SideBarContainer = styled.div`
  position: fixed;
  z-index: 10;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 2px 3.8px 0px rgba(0, 0, 0, 0.25);
  min-height: 100dvh;
  min-width: 80vw;
  padding: 0 2rem;
  left: -38rem;
  transition: left 0.3s ease-in-out;
  z-index: 200;

  @media screen and (min-width: 320px) {
    left: 0;
    min-width: 25.4rem;
  }

  @media screen and (min-width: 1024px) {
    min-width: 32rem;
    padding: 0 2rem;
  }
`;
