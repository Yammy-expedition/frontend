import { ReactComponent as CafeIcon } from '../../assets/icons/tips-for-sogang/cafe.svg';
import { ReactComponent as PrinterIcon } from '../../assets/icons/tips-for-sogang/printer.svg';
import { ReactComponent as BookIcon } from '../../assets/icons/tips-for-sogang/book.svg';
import { ReactComponent as HospitalIcon } from '../../assets/icons/tips-for-sogang/hospital.svg';
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
          <BookIcon /> <span>studying spot</span>
        </LocationElement>
        <LocationElement
          style={{ backgroundColor: '#28B5B1' }}
          onClick={() => handleTabClick('cafe')}
        >
          <CafeIcon />
          <span>cafeteria</span>
        </LocationElement>
        <LocationElement style={{ backgroundColor: '#C3D350' }}>
          <PrinterIcon />
          <span>printer</span>
        </LocationElement>
        <LocationElement style={{ backgroundColor: '#003F91' }}>
          <HospitalIcon />
          <span>hospital</span>
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
  flex-wrap: wrap;
  /* overflow-x: hidden; */
`;

const LocationElement = styled.li`
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  overflow: hidden;
  max-width: 10rem;
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
    background-color 0.3s,
    max-width 1s;
  svg path {
    stroke-width: 2;
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
    max-width: 20rem;
  }
  svg {
    width: 1.8rem;
    height: 1.8rem;
    stroke-width: 2;
    flex-shrink: 0;
  }
  path {
    transition: stroke 0.3s;
  }
  span {
    margin-left: 0.5rem;
    display: none;
    opacity: 0;
    transition-delay: 0.5s;
    transition:
      opacity 0.2s,
      visibility 0.2s,
      display 0.2s;
    flex-shrink: 0;
  }
  &:hover > span {
    display: inline;
    opacity: 1;
  }
  &:active {
    scale: 0.9;
  }
`;
