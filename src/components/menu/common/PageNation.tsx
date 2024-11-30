import { hover } from '@testing-library/user-event/dist/hover';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface PageNationProps {
  boardType: string;
  pageName: string;
  lastPage: number;
  currentPage: number;
  startPage: number;
  endPage: number;
  handleNextGroup: () => void;
  handlePrevGroup: () => void;
  handlePageChange: (page: number) => void;
}

export default function PageNation({
  boardType,
  pageName,
  lastPage,
  currentPage,
  startPage,
  endPage,
  handleNextGroup,
  handlePrevGroup,
  handlePageChange
}: PageNationProps) {
  const navigate = useNavigate();
  const pageLength = lastPage < 5 ? lastPage : endPage - startPage + 1;
  return (
    <BottomBox>
      <div></div>
      <PageNationContainer>
        {startPage > 1 && (
          <div
            style={{ cursor: 'pointer' }}
            onClick={handlePrevGroup}
          >{`<`}</div>
        )}

        {Array.from(
          { length: pageLength },
          (value, index) => startPage + index
        ).map((page) => (
          <div
            key={page}
            onClick={() => handlePageChange(page)}
            style={{
              color: currentPage === page ? 'var(--primary-color)' : 'gray',
              fontWeight: currentPage === page ? 'bold' : 'normal',
              cursor: 'pointer'
            }}
          >
            {page}
          </div>
        ))}

        {endPage < lastPage && (
          <div
            style={{ cursor: 'pointer' }}
            onClick={handleNextGroup}
          >{`>`}</div>
        )}
      </PageNationContainer>
      <WriteButton
        onClick={() =>
          navigate('/writing-post', {
            state: { boardType: boardType, pageName: pageName }
          })
        }
      >
        write
      </WriteButton>
    </BottomBox>
  );
}
const BottomBox = styled.div`
  > div {
    width: 8rem;
  }
  position: absolute;
  padding: 0 2rem;
  justify-content: space-between;
  left: 0;
  width: 100%;
  bottom: 0.5rem;
  display: flex;

  @media screen and (min-width: 768px) {
    bottom: 1.5rem;
    padding: 0 4.5rem;
  }
`;

const PageNationContainer = styled.div`
  color: gray;
  display: flex;
  align-items: center;
  gap: 2rem;
  font-size: 1.3rem;
`;

const WriteButton = styled.button`
  background: var(
    --vertical-gradient,
    linear-gradient(180deg, #b21f7c 22.5%, #4c0d0f 100%)
  );
  border-radius: 0.5rem;
  border: 1px solid #d6d6d6;
  color: white;
  width: 8rem;
  height: 3.5rem;
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;
`;
