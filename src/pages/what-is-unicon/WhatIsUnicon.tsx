import styled from 'styled-components';

export default function WhatIsUnicon() {
  return (
    <Main>
      <img src="https://i.imgur.com/tlgKwJi.jpeg" alt="" />
    </Main>
  );
}

const Main = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  overflow-y: scroll;
  img {
    width: 90%;
    object-fit: contain;
  }
`;
