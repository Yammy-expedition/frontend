import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Posting } from 'types/posting';
import { getPostingList } from 'utils/common/getPostingList';
import { useSearchParams } from 'react-router-dom';
import Search from 'components/menu/common/Search';
import PostingList from 'components/menu/common/PostingList';
import PageNation from 'components/menu/common/PageNation';

interface RestaurantsPageProps {
  boardType: string;
}

export default function RestaurantsPage({ boardType }: RestaurantsPageProps) {
  console.log(boardType);
  const pageName =
    boardType === 'restaurant'
      ? 'Restaurants'
      : boardType === 'market'
        ? 'Markets'
        : boardType === 'general'
          ? 'General-Disccusion'
          : '';

  const [postings, setPostings] = useState<Posting[]>();
  const [searchType, setSearchType] = useState<string>();
  const [orderType, setOrderType] = useState<string>();
  const [searchContent, setSearchContent] = useState<string>();

  const [lastPage, setLastPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;

  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(5);

  const mountRef = useRef<boolean>(false);

  useEffect(() => {
    if (!mountRef.current) {
      return;
    }
    getPostingList(boardType, setPostings, 1);
  }, [orderType]);

  useEffect(() => {
    getPostingList(boardType, setPostings, currentPage).then((result) =>
      setLastPage(Math.ceil(result / 5))
    );
  }, [boardType, currentPage]);

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  // 다음 페이지 그룹으로 이동
  const handleNextGroup = () => {
    if (endPage < lastPage) {
      setStartPage(startPage + 5);
      setEndPage(Math.min(endPage + 5, lastPage));
      handlePageChange(startPage + 5);
    }
  };

  // 이전 페이지 그룹으로 이동
  const handlePrevGroup = () => {
    if (startPage > 1) {
      setStartPage(startPage - 5);
      setEndPage(startPage - 1);
      handlePageChange(startPage - 5);
    }
  };

  return (
    <RestaurantsPageContainer>
      <PageNameBox>
        <p>{pageName}</p>
      </PageNameBox>

      <Search
        searchType={searchType}
        setSearchType={setSearchType}
        orderType={orderType}
        setOrderType={setOrderType}
        searchContent={searchContent}
        setSearchContent={setSearchContent}
      ></Search>

      <LineGradient />

      <PostingList
        postings={postings}
        boardType={boardType}
        pageName={pageName}
      ></PostingList>

      <PageNation
        boardType={boardType}
        pageName={pageName}
        lastPage={lastPage}
        currentPage={currentPage}
        startPage={startPage}
        endPage={endPage}
        handleNextGroup={handleNextGroup}
        handlePrevGroup={handlePrevGroup}
        handlePageChange={handlePageChange}
      />
    </RestaurantsPageContainer>
  );
}

const RestaurantsPageContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 6.5rem 4.5rem;
`;

const PageNameBox = styled.div`
  > p {
    font-family: var(--sub-font);
    color: var(--primary-color);
    font-weight: 600;
    font-size: 5rem;
  }
`;

const LineGradient = styled.div`
  height: 0.1rem;
  background-image: var(--line-gradient);
`;
