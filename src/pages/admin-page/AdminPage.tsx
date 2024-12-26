import AdminSideBar from 'components/admin/AdminSideBar';
import TipsRestaurants from 'components/admin/TipsRestaurants';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

export default function AdminPage() {
  return (
    <Main>
      <AdminSideBar />
      <Outlet />
    </Main>
  );
}

const Main = styled.main`
  width: 100vw;
  height: 100vh;
  letter-spacing: -1px;
`;
