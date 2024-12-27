import AdminSideBar from 'components/admin/AdminSideBar';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function AdminPage() {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = 'Admin 유니콘';
    navigate('/admin/users');
  }, []);
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
  display: grid;
  grid-template-columns: 20rem 80%;
  letter-spacing: -1px;
`;
