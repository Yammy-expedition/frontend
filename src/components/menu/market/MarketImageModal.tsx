import React, { useState } from 'react';
import styled from 'styled-components';

import { ReactComponent as PrevSVG } from '../../../assets/icons/menu/prev.svg';
import { ReactComponent as NextSVG } from '../../../assets/icons/menu/next.svg';

interface MarketImageModalProps {
  images: ImagesResponse[];
  openImageIndex: number;
  setOpenMarketImgageModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ImagesResponse {
  id: number;
  image: string;
  post: number;
}

export default function MarketImageModal({
  images,
  openImageIndex,
  setOpenMarketImgageModal
}: MarketImageModalProps) {
  console.log(openImageIndex);

  const [currentIndex, setCurrentIndex] = useState<number>(openImageIndex);
  return (
    <ModalWrppaer onClick={() => setOpenMarketImgageModal(false)}>
      <CurrentImageIndicator>
        {currentIndex + 1}/{images.length}
      </CurrentImageIndicator>
      <ImageWrapper onClick={(e) => e.stopPropagation()}>
        {currentIndex !== 0 && (
          <>
            <PrevImageBox>
              <figure>
                <img
                  src={images[currentIndex - 1].image}
                  alt="prev-stuff-image"
                />
              </figure>
            </PrevImageBox>
            <PrevButton onClick={() => setCurrentIndex((prev) => prev - 1)}>
              <PrevSVG></PrevSVG>
            </PrevButton>
          </>
        )}

        <CurrentImageBox>
          <figure>
            <img src={images[currentIndex].image} alt="-current-stuff-image" />
          </figure>
        </CurrentImageBox>

        {currentIndex !== images.length - 1 && (
          <>
            <NextButton onClick={() => setCurrentIndex((prev) => prev + 1)}>
              <NextSVG></NextSVG>
            </NextButton>
            <NextImageBox>
              <figure>
                <img
                  src={images[currentIndex + 1].image}
                  alt="prev-stuff-image"
                />
              </figure>
            </NextImageBox>
          </>
        )}
      </ImageWrapper>
    </ModalWrppaer>
  );
}

const ModalWrppaer = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`;
const CurrentImageIndicator = styled.p`
  position: fixed;
  color: white;
  font-size: 3rem;
  left: 50%;
  top: 10%;
`;

const ImageBox = styled.div`
  width: 50rem;
  height: 50rem;
  position: absolute;
  background: rgba(0, 0, 0, 0.2);
  > figure {
    width: 100%;
    height: 100%;
    margin: 0;

    > img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;

const PrevImageBox = styled(ImageBox)`
  left: -10%;
  transform: translate(-50%, -50%);
`;
const CurrentImageBox = styled(ImageBox)`
  left: 50%;
  transform: translate(-50%, -50%);
`;
const NextImageBox = styled(ImageBox)`
  right: -10%;
  transform: translate(50%, -50%);
`;

const Button = styled.button`
  position: absolute;
  background: none;
  border: none;
  curosr: pointer;
`;

const PrevButton = styled(Button)`
  left: 20%;
  transform: translate(-50%, -50%);
`;

const NextButton = styled(Button)`
  right: 20%;
  transform: translate(50%, -50%);
`;
