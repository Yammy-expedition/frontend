import React, { useState } from 'react';
import styled from 'styled-components';
import { openableBoxList } from 'constants/openableBox';
import { ReactComponent as PlusSVG } from '../../assets/icons/plus.svg';
import { ReactComponent as NotiSVG } from '../../assets/icons/main/notification.svg';
import { useNavigate } from 'react-router-dom';

interface MenuGroupProps {
  setOpenHam: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MenuGroup({ setOpenHam }: MenuGroupProps) {
  const [OpenIndex, setOpenIndex] = useState<number | null>(null);
  const [closing, setClosing] = useState(false);
  const navigate = useNavigate();

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

  const onClickBox = (
    item: {
      parent: string;
      child: {
        name: string;
        link: string;
      }[];
      ownLink: string;
    },
    index: number
  ) => {
    toggleBox(index);
    if (item.parent === 'What is Unicon') {
      if (window.innerWidth <= 768) setOpenHam(false);
    }
    if (item.parent === 'Notification') {
      const token = window.localStorage.getItem('accessToken');
      if (!token) {
        alert('You need to log in');
        return;
      }
    }
    navigate(item.ownLink);
  };

  const onClickChildItem = (childItem: { name: string; link: string }) => {
    navigate(childItem.link);
    if (window.innerWidth <= 768) setOpenHam(false);
  };

  return (
    <OpenableBoxList>
      {openableBoxList?.map((item, index) => (
        <div key={index}>
          <OpenableBox
            onClick={() => onClickBox(item, index)}
            $isOpen={OpenIndex === index && !closing}
          >
            <IconWrapper
              $isOpen={OpenIndex === index && !closing}
              $parent={item.parent}
            >
              {item.parent === 'Notification' ? <NotiSVG /> : <PlusSVG />}
            </IconWrapper>
            <p>{item.parent}</p>
          </OpenableBox>
          <ChildList $isVisible={OpenIndex === index && !closing}>
            {item.child?.map((childItem, childIndex) => (
              <ChildItem
                key={childIndex}
                onClick={() => onClickChildItem(childItem)}
              >
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
  width: 100%;
  flex-direction: column;
  gap: 2rem;
  font-size: 1.8rem;
  @media screen and (min-width: 1024px) {
    font-size: 2.2rem;
  }
`;

const OpenableBox = styled.div<{ $isOpen: boolean }>`
  padding: 0 1rem;
  border-radius: 4px;
  border: 0.7px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  background-image: ${({ $isOpen }) =>
    $isOpen ? 'var(--main-gradient)' : 'white'};
  color: ${({ $isOpen }) => ($isOpen ? 'white' : 'black')};
  height: 5.5rem;
  position: relative;
  overflow: hidden;
  transition: color 0.4s ease-in;
  @media screen and (min-width: 1024px) {
    height: 5.5rem;
  }
  > p {
    letter-spacing: -1px;
    font-weight: 500;
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-image: var(--main-gradient);
    opacity: 0;
  }
  &:hover::after {
    opacity: 1;
    transition: opacity 0.4s ease-in;
  }
  &:hover {
    color: white;
  }
`;

const IconWrapper = styled.div<{ $isOpen: boolean; $parent: string }>`
  display: flex;
  align-items: center;
  justify-content: center;

  transition: transform 0.4s ease;
  ${(props) => {
    if (props.$parent !== 'Notification')
      return ` transform: ${props.$isOpen ? 'rotate(45deg)' : 'rotate(0deg)'};`;
    else return '';
  }}
  svg {
    width: 1.8rem;
    height: 1.8rem;
    path {
      color: ${(props) => (props.$isOpen ? 'white' : 'var(--primary-color)')};
    }
  }
`;

const ChildList = styled.div<{ $isVisible: boolean }>`
  overflow: hidden;
  max-height: ${({ $isVisible }) =>
    $isVisible ? '20rem' : '0'}; /* 애니메이션을 위해 최대 높이 설정 */
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition:
    opacity 0.4s ease,
    max-height 0.9s ease;
  margin-left: 4rem;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

const ChildItem = styled.a`
  display: inline-flex;
  align-items: center;
  font-size: 1.8rem;
  color: var(--main-text);
  text-decoration: underline 1px solid white;
  padding: 0.2rem 0;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    color: var(--primary-color);
  }
  transition:
    color 0.3s ease,
    text-decoration 0.3s ease;
`;
