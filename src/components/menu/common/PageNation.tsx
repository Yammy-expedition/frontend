import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface PageNationProps {
  lastPage: number;
  currentPage: number;
  startPage: number;
  endPage: number;
  handleNextGroup: () => void;
  handlePrevGroup: () => void;
  handlePageChange: (page: number) => void;
}

export default function PageNation({
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
        {startPage > 1 && <div onClick={handlePrevGroup}>{`<`}</div>}

        {Array.from(
          { length: pageLength },
          (value, index) => startPage + index
        ).map((page) => (
          <div
            key={page}
            onClick={() => handlePageChange(page)}
            style={{
              fontWeight: currentPage === page ? 'bold' : 'normal',
              cursor: 'pointer'
            }}
          >
            {page}
          </div>
        ))}

        {endPage < lastPage && <div onClick={handleNextGroup}>{`>`}</div>}
      </PageNationContainer>
      <WriteButton
        onClick={() =>
          navigate('/writing-post', {
            state: { boardType: { name: 'Restaurant', code: 'restaurant' } }
          })
        }
      >
        write
      </WriteButton>
    </BottomBox>
  );
}
const BottomBox = styled.div`
  position: absolute;
  padding: 0 4.5rem;
  justify-content: space-between;
  left: 0;
  width: 100%;
  bottom: 2.5rem;
  display: flex;
`;

const PageNationContainer = styled.div`
  display: flex;
  gap: 2rem;
  background: pink;
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
