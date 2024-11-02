import React from 'react';
import styled from 'styled-components';

export default function Footer() {
  return (
    <FooterContainer>
      <div>chat</div>
      <p>|</p>
      <div>mypage</div>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  margin: 4rem 0;
  display: flex;
  gap: 0.5rem;
  font-size: 2rem;

  > div {
    cursor: pointer;
  }
`;
