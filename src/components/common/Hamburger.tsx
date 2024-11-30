import React from 'react';
import styled from 'styled-components';
import { ReactComponent as HamburgerMenu } from '../../assets/icons/common/hamburgermenu.svg';

interface HamburgerProps {
  setOpenHam: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Hamburger({ setOpenHam }: HamburgerProps) {
  return (
    <HamburgerWrapper>
      <StyledHamburgerMenu onClick={() => setOpenHam((prev) => !prev)} />
    </HamburgerWrapper>
  );
}

const HamburgerWrapper = styled.div`
  position: relative;
  height: 0;
  width: 100%;
`;

const StyledHamburgerMenu = styled(HamburgerMenu)`
  position: absolute;
  right: 1rem;
  top: 1rem;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;
