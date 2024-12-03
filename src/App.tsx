import styled from 'styled-components';
import SideBar from 'components/common/SideBar';
import './App.css';
import Router from 'Router';
import './style/color.css';
import './style/font.css';
import { useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { ReactComponent as HamburgerMenuSVG } from './assets/icons/common/hamburgermenu.svg';

function App() {
  const location = useLocation();
  const [openHam, setOpenHam] = useState<boolean>(false);
  const sideBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpenHam(true); // 768px 이상에서 사이드바 열기
      } else {
        setOpenHam(false); // 768px 미만에서 사이드바 닫기
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        window.innerWidth < 768 &&
        sideBarRef.current &&
        !sideBarRef.current.contains(event.target as Node)
      ) {
        setOpenHam(false); // SideBar 닫기
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sideBarRef]);

  return (
    <AppContainer className="App">
      {location.pathname !== '/admin' && location.pathname !== '/sign-up' && (
        <div className="Hamburger">
          <HamburgerMenuSVGWrapper onClick={() => setOpenHam((prev) => !prev)}>
            <HamburgerMenuSVG />
          </HamburgerMenuSVGWrapper>

          <SideBar
            openHam={openHam}
            setOpenHam={setOpenHam}
            sideBarRef={sideBarRef}
          />
        </div>
      )}

      <Router />
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-color: #eeeeee;

  > *:not(:first-child) {
    @media screen and (min-width: 768px) {
      margin-left: 25.4rem;
    }

    @media screen and (min-width: 1024px) {
      margin-left: 34.4rem;
    }
  }
`;

const HamburgerMenuSVGWrapper = styled.div`
  z-index: 5;
  position: absolute;
  left: 1rem;
  top: 1rem;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;
