import Loading from 'components/common/Loading';
import { useState } from 'react';
import styled from 'styled-components';

export default function WhatIsUnicon() {
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
`;
