import Footer from 'components/common/Footer';
import MenuGroup from 'components/common/MenuGroup';
import TitleBox from 'components/common/TitleBox';
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
  // position: fixed;
  z-index: 10;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 2px 3.8px 0px rgba(0, 0, 0, 0.25);
  min-height: 100vh;
  min-width: 29.4rem;
  padding: 0 0.6rem;
  @media screen and (min-width: 1024px) {
    min-width: 34.4rem;
    padding: 0 2rem;
  }
`;
