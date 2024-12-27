import Loading from 'components/common/Loading';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function WhatIsUnicon() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 5000);
  // if (loading) {
  // return <Loading />;
  // }
  return (
    <Main>
      <img src="https://i.imgur.com/MKUTMQp.png" alt="" />
      <img src="https://i.imgur.com/k9d4wgP.png" alt="" />
      <img src="https://i.imgur.com/vTZu3bm.png" alt="" />
      <img src="https://i.imgur.com/KnkGW04.png" alt="" />
      <img src="https://i.imgur.com/OiNLLjO.png" alt="" />
      <div>
        <h1>Friends are waiting you!</h1>
        <button onClick={() => navigate('/')}>{"Let's find!"}</button>
      </div>
    </Main>
  );
}

const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-y: scroll;
  img {
    width: 100%;
    object-fit: contain;
  }
  div {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    h1 {
      font-size: 5rem;
      letter-spacing: -2px;
      font-weight: 500;
      color: var(--primary-color);
      margin-bottom: 1rem;
      font-style: italic;
    }
    button {
      border: none;
      padding: 1rem 3rem;
      background: var(--main-gradient);
      color: white;
      font-size: 3rem;
      border-radius: 2rem;
      cursor: pointer;
      transition: background 0.3s;
      box-shadow:
        rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
        rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
        rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset,
        rgba(0, 0, 0, 0.06) 0px 2px 1px;
      &:hover {
        background: var(--secondary-color);
      }
      &:active {
        transform: scale(0.9);
      }
    }
  }
`;
