import styled from 'styled-components';
import SideBar from 'components/common/SideBar';
import './App.css';
import Router from 'Router';
import './style/color.css';
import './style/font.css';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  const location = useLocation();

  return (
    <AppContainer className="App">
      {location.pathname !== '/admin' && location.pathname !== '/sign-up' ? (
        <SideBar></SideBar>
      ) : null}
      <Router />
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-color: #eeeeee;

  > *:not(:first-child) {
    margin-left: 28rem;

    @media screen and (min-width: 1024px) {
      margin-left: 34rem;
    }
  }
`;
