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
      <img src="https://i.imgur.com/4OaiP1I.jpeg" alt="" />
    </Main>
  );
}

const Main = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  overflow-y: scroll;
  img {
    width: 100%;
    object-fit: contain;
  }
`;
