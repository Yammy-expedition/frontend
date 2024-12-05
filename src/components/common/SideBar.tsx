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
}

export default function SideBar({
  openHam,
  setOpenHam,
  sideBarRef
}: SideBarProps) {
  useEffect(() => {
    if (!openHam) {
      sideBarRef.current?.style.setProperty('left', '-38rem');
    } else {
      sideBarRef.current?.style.setProperty('left', '0');
    }
  }, [openHam]);

  return (
    <SideBarContainer ref={sideBarRef}>
      <Hamburger setOpenHam={setOpenHam} />
      <TitleBox />
      <MenuGroup />
      <Footer />
    </SideBarContainer>
  );
}

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
  min-width: 15.4rem;
  padding: 0 0.6rem;
  left: -38rem;
  transition: left 0.3s ease-in-out;
  z-index: 200;
  @media screen and (min-width: 768px) {
    left: 0;
    min-width: 25.4rem;
  }

  @media screen and (min-width: 1024px) {
    min-width: 34.4rem;
    padding: 0 2rem;
  }
`;
