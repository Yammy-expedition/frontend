import { ReactComponent as CafeIcon } from '../../assets/icons/tips-for-sogang/cafe.svg';
// import { ReactComponent as PrinterIcon } from '../../assets/icons/tips-for-sogang/printer.svg';
import { ReactComponent as BookIcon } from '../../assets/icons/tips-for-sogang/book.svg';
import styled from 'styled-components';
import KakaoMap from './KakaoMap';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import SearchBox from './SearchBox';

export default function SogangMap() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [modalOpen, setModalOpen] = useState(false);

  const handleTabClick = (spot: string) => {
    setSearchParams({ spot: spot });
    setModalOpen(false);
  };

  return (
    <Section>
      <LocationTab>
        <LocationElement
          style={{ backgroundColor: 'var(--primary-color)' }}
          onClick={() => handleTabClick('all')}
        >
          All
        </LocationElement>
        <LocationElement
          style={{ backgroundColor: '#9190C0' }}
          onClick={() => handleTabClick('study')}
        >
          <BookIcon /> studying spot
        </LocationElement>
        {/* <LocationElement>
          <PrinterIcon />
          printer
        </LocationElement> */}
        <LocationElement
          style={{ backgroundColor: '#28B5B1' }}
          onClick={() => handleTabClick('cafe')}
        >
          <CafeIcon />
          cafeteria
        </LocationElement>
        <SearchBox />
      </LocationTab>
      <div className="mapWrapper">
        <KakaoMap modalOpen={modalOpen} setModalOpen={setModalOpen} />
      </div>
    </Section>
  );
}

const Section = styled.section`
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  .mapWrapper {
    width: 100%;
    height: 100%;
  }
`;

const LocationTab = styled.ul`
  z-index: 50;
  position: absolute;
  top: 10px;
  left: 5px;
  display: flex;
  gap: 1rem;
  list-style: none;
  font-size: 1.6rem;
  /* overflow-x: hidden; */
`;

const LocationElement = styled.li`
  width: fit-content;
  height: 5rem;
  background-color: var(--main-gray);
  color: var(--hover-text);
  border-radius: 2.5rem;
  padding: 1.2rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  letter-spacing: -0.5px;
  transition:
    color 0.3s,
    background-color 0.3s;
  svg path {
    stroke: white;
  }
  &.search {
    padding: 0.5rem 2rem;
    svg path {
      stroke: none;
      fill: var(--hover-bg);
    }
  }
  &:not(.search):hover {
    filter: brightness(0.8);
  }
  svg {
    width: 1.8rem;
    height: 1.8rem;
    margin-right: 0.5rem;
  }
  path {
    transition: stroke 0.3s;
  }
`;
