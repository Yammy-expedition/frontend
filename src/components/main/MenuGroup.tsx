import React, { useState } from 'react';
import styled from 'styled-components';
import { openableBoxList } from 'constants/openableBox';
import { ReactComponent as PlusSVG } from '../../assets/icon/plus.svg';

export default function MenuGroup() {
  const [OpenIndex, setOpenIndex] = useState<number | null>(null);
  const [closing, setClosing] = useState(false);

  const toggleBox = (index: number) => {
    if (OpenIndex === index) {
      // 이미 열린 항목을 클릭했을 때는 그냥 닫기
      setOpenIndex(null);
    } else {
      if (OpenIndex !== null) {
        // 다른 항목이 열려 있는 경우 빠르게 닫기
        setClosing(true);
        setTimeout(() => {
          setClosing(false);
          setOpenIndex(index);
        }, 400); // 빠르게 닫힌 후 열리는 시간을 설정 (100ms)
      } else {
        setOpenIndex(index);
      }
    }
  };

  return (
    <OpenableBoxList>
      {openableBoxList.map((item, index) => (
        <div key={index}>
          <OpenableBox
            onClick={() => toggleBox(index)}
            $isOpen={OpenIndex === index && !closing}
          >
            <IconWrapper $isOpen={OpenIndex === index && !closing}>
              <PlusSVG />
            </IconWrapper>
            <p>{item.parent}</p>
          </OpenableBox>
          <ChildList $isVisible={OpenIndex === index && !closing}>
            {item.child.map((childItem, childIndex) => (
              <ChildItem key={childIndex} href={childItem.link}>
                {childItem.name}
              </ChildItem>
            ))}
          </ChildList>
        </div>
      ))}
    </OpenableBoxList>
  );
}

const OpenableBoxList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  font-size: 1.8rem;
  @media screen and (min-width: 1024px) {
    font-size: 2.2rem;
  }
`;

const OpenableBox = styled.div<{ $isOpen: boolean }>`
  padding: 0 1.25rem;

  background: white;
  border-radius: 1rem;
  border: 1px solid #888888;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;

  background-image: ${({ $isOpen }) =>
    $isOpen ? 'linear-gradient(to left, #000000, green)' : 'white'};
  color: ${({ $isOpen }) => ($isOpen ? 'white' : 'black')};

  height: 5.5rem;
  @media screen and (min-width: 1024px) {
    height: 6.2rem;
  }

  > p {
    font-weight: 600;
  }
`;

const IconWrapper = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(45deg)' : 'rotate(0deg)')};
`;

const ChildList = styled.div<{ $isVisible: boolean }>`
  overflow: hidden;
  max-height: ${({ $isVisible }) =>
    $isVisible ? '20rem' : '0'}; /* 애니메이션을 위해 최대 높이 설정 */
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition:
    opacity 0.4s ease,
    max-height 0.4s ease;
  margin-left: 4rem;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ChildItem = styled.a`
  display: inline-flex;
  align-items: center;
  font-size: 1.8rem;
  color: green;
  text-decoration: none;
  padding: 0.2rem 0;
  &:hover {
    text-decoration: underline;
    color: var(--primary-color);
  }
  transition: 0.3s ease;
`;
