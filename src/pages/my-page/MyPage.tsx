import MyProfile from 'components/my-page/MyProfile';
import styled from 'styled-components';

export default function MyPage() {
  return (
    <Main>
      <MyProfile />
      <NavTabs></NavTabs>
      <></>
    </Main>
  );
}

const Main = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const NavTabs = styled.nav``;
