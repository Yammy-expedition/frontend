import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Posting } from 'types/posting';
import { getPostingList } from 'utils/common/getPostingList';
import { useSearchParams } from 'react-router-dom';
import Search from 'components/menu/common/Search';
import PostingList from 'components/menu/common/PostingList';
import PageNation from 'components/menu/common/PageNation';
import Loading from 'components/common/Loading';

interface RestaurantsPageProps {
  boardType: string;
}

export default function RestaurantsPage({ boardType }: RestaurantsPageProps) {
  const pageName =
    boardType === 'restaurant'
      ? 'Restaurants'
      : boardType === 'market'
        ? 'Markets'
        : boardType === 'general'
          ? 'General-Discussion'
          : '';

  const [postings, setPostings] = useState<Posting[]>();
  const [searchParams, setSearchParams] = useSearchParams();

  // 검색 조건을 URL에서 복원
  const currentPage = Number(searchParams.get('page')) || 1;
  const [searchType, setSearchType] = useState<string>(
    searchParams.get('searchType') || 'all'
  );
  const [orderType, setOrderType] = useState<string>(
    searchParams.get('orderType') || 'latest'
  );
  const [searchContent, setSearchContent] = useState<string>(
    searchParams.get('searchContent') || ''
  );

  const [lastPage, setLastPage] = useState<number>(1);
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(5);
  const [loading, setLoading] = useState<boolean>(false);

  const mountRef = useRef<boolean>(false);

  // URL 변경에 따른 상태 복원
  useEffect(() => {
    if (!mountRef.current) {
      mountRef.current = true;
      return;
    }
    const newSearchType = searchParams.get('searchType') || 'all';
    const newOrderType = searchParams.get('orderType') || 'latest';
    const newSearchContent = searchParams.get('searchContent') || '';
    setSearchType(newSearchType);
    setOrderType(newOrderType);
    setSearchContent(newSearchContent);
  }, [searchParams]);

  // orderType 변경 시 데이터 로드
  useEffect(() => {
    getPostingList(
      boardType,
      setPostings,
      currentPage,
      setLoading,
      orderType,
      searchType,
      searchContent
    ).then((result) => {
      setLastPage(Math.ceil(result / 5));
      console.log(Math.ceil(result / 5));
    });
  }, [boardType, currentPage, orderType]);

  const handlePageChange = (page: number) => {
    setSearchParams((prevParams) => ({
      ...Object.fromEntries(prevParams),
      page: page.toString()
    }));
  };

  const handleSearch = () => {
    // 검색 버튼 클릭 시 상태를 URL에 반영
    setSearchParams({
      page: '1',
      searchType,
      orderType,
      searchContent
    });

    window.location.reload();
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
    <PageContainer>
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
        onClickSearch={handleSearch}
      />

      <LineGradient />

      {loading ? (
        <Loading />
      ) : (
        <PostingList
          postings={postings}
          boardType={boardType}
          pageName={pageName}
        />
      )}

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
    </PageContainer>
  );
}

const PageContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 5rem 3rem;
  @media screen and (min-width: 768px) {
    padding: 6.5rem 4.5rem;
  }
`;

const PageNameBox = styled.div`
  > p {
    font-family: var(--main-font);
    color: var(--primary-color);
    font-weight: 500;
    font-size: 3rem;
    letter-spacing: -2px;
    @media screen and (min-width: 768px) {
      font-size: 3rem;
    }
    @media screen and (min-width: 430px) {
      padding: 0 2rem;
    }
  }
`;

const LineGradient = styled.div`
  height: 0.2rem;
  background-image: var(--line-gradient);
`;
