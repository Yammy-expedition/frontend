import styled, { keyframes } from 'styled-components';
import { BuildsDataType } from './KakaoMap';
import { ReactComponent as ExitIcon } from 'assets/icons/tips-for-sogang/exit.svg';

interface MapModalProps {
  setModalOpen: (value: boolean) => void;
  modalOpen: boolean;
  selectedBuildingData: BuildsDataType | null;
}

export default function MapModal({
  modalOpen,
  setModalOpen,
  selectedBuildingData
}: MapModalProps) {
  return (
    <ModalWrapper modalopen={modalOpen.toString()}>
      <ExitIcon className="exit" onClick={() => setModalOpen(false)} />
      <h1>{selectedBuildingData?.building_name}</h1>
      <div>
        <h2>Entrance</h2>
        <p>{selectedBuildingData?.entrance}</p>
      </div>
      <div>
        <h2>Mainly used by</h2>
        <p>{selectedBuildingData?.departments}</p>
      </div>
      <StudyingSpotDiv>
        <h2>Studying spots</h2>
        {selectedBuildingData?.studying_spots.map((spot) => (
          <div key={spot.id}>
            <figure>
              {spot.photo && <img src={spot.photo} alt="studying spot" />}
              <figcaption>
                <h3>{spot.name}</h3>
                <p>{spot.location}</p>
                <p>{spot.open_hours}</p>
                <Tags>
                  {spot.tags.map((tag) => (
                    <span key={tag.id}>{tag.name} </span>
                  ))}
                </Tags>
              </figcaption>
            </figure>
          </div>
        ))}
      </StudyingSpotDiv>
      <StudyingSpotDiv>
        <h2>Cafeterias</h2>
        {selectedBuildingData?.cafeterias.map((spot) => (
          <div key={spot.id}>
            <figure>
              {spot.photo && <img src={spot.photo} alt="studying spot" />}
              <figcaption>
                <h3>{spot.name}</h3>
                <p>{spot.location}</p>
                <p>{spot.open_hours}</p>
                <Tags>
                  {spot.tags.map((tag) => (
                    <span key={tag.id}>{tag.name} </span>
                  ))}
                </Tags>
              </figcaption>
            </figure>
          </div>
        ))}
      </StudyingSpotDiv>
    </ModalWrapper>
  );
}

const Tags = styled.span`
  display: flex;
  gap: 0.5rem;
  span {
    background-color: var(--primary-color);
    color: var(--hover-text);
    padding: 0.2rem 0.5rem;
    border-radius: 5px;
  }
`;

const StudyingSpotDiv = styled.div`
  img {
    width: 8rem;
    height: 8rem;
  }
  h2 {
    font-size: 1.3rem;
    font-weight: 100;
    color: var(--secondary-text);
  }
  h3 {
    font-size: 1.6rem;
    font-weight: 300;
  }
  div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-bottom: 1px solid var(--main-gray);
    padding: 2rem 0;
  }
  figure {
    display: flex;
    gap: 1rem;
    figcaption {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      p {
        font-size: 1.3rem;
        font-weight: 200;
      }
    }
  }
`;

const ModalWrapper = styled.div<{ modalopen: string }>`
  z-index: 100;
  overflow-y: scroll;
  position: absolute;
  right: 10px;
  background-color: white;
  width: 40%;
  height: 90%;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  animation: ${({ modalopen }) => (modalopen === 'true' ? fadeIn : fadeOut)}
    0.3s ease forwards;
  visibility: ${({ modalopen }) =>
    modalopen === 'true' ? 'visible' : 'visible'};
  h1 {
    font-size: 2.5rem;
    font-weight: 400;
  }
  div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    h2 {
      font-size: 1.3rem;
      font-weight: 100;
      color: var(--secondary-text);
    }
    p {
      font-size: 1.8rem;
      font-weight: 300;
    }
  }
  svg {
    cursor: pointer;
    width: 2rem;
    height: 2rem;
    &.exit {
      position: absolute;
      top: 1rem;
      right: 1rem;
    }
    &:hover {
      fill: black;
    }
  }
`;

// 등장 애니메이션
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// 사라짐 애니메이션
const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
`;
