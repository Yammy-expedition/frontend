import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as SearchSVG } from '../../assets/icons/search.svg';
import { ReactComponent as HeartSVG } from '../../assets/icons/heart.svg';
import { ReactComponent as EyeSVG } from '../../assets/icons/eye.svg';
import { ReactComponent as CommentSVG } from '../../assets/icons/coment.svg';
import { Posting } from 'types/posting';
import { getPostingList } from 'utils/getPostingList';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function RestaurantsPage() {
  const [postings, setPostings] = useState<Posting[]>();
  const [searchType, setSearchType] = useState<string>();
  const [orderType, setOrderType] = useState<string>();

  const [lastPage, setLastPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;

  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(5);

  const navigate = useNavigate();
  const mountRef = useRef<boolean>(false);

  useEffect(() => {
    if (!mountRef.current) {
      return;
    }
    getPostingList('restaurant', setPostings, 1);
  }, [orderType]);

  useEffect(() => {
    getPostingList('restaurant', setPostings, currentPage).then((result) =>
      setLastPage(Math.ceil(result / 5))
    );
  }, [currentPage]);

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
        <p>Restaurant</p>
      </PageNameBox>

      <SearchContainer>
        <SearchBox>
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="all">All</option>
            <option value="title">Title</option>
            <option value="content">Content</option>
          </select>
          <SearchBar>
            <input value="" readOnly />
            <button>
              <SearchSVG />
            </button>
          </SearchBar>
        </SearchBox>
        <FilteringBox>
          <select
            value={orderType}
            onChange={(e) => setOrderType(e.target.value)}
          >
            <option value="">Recent</option>
            <option value="">Popular</option>
          </select>
        </FilteringBox>
      </SearchContainer>

      <LineGradient />

      <PostingContainer>
        {postings?.map((posting, index) => (
          <EachPost
            key={index}
            onClick={() =>
              navigate(`/posting-detail/${posting.id}`, {
                state: { boardType: 'Restaurant', posting: posting }
              })
            }
          >
            <p>{posting.title}</p>
            <PostInfo>
              <span>{posting.writer_nickname}</span>
              <span>{posting.created_at.split('T')[0]}</span>
              <span>
                <HeartSVG /> {posting.like_count}
              </span>
              <span>
                <EyeSVG /> {posting.view_count}
              </span>
              <span>
                <CommentSVG /> {posting.comment_count}
              </span>
            </PostInfo>
          </EachPost>
        ))}
      </PostingContainer>

      <BottomBox>
        <div></div>
        <PageNation>
          {startPage > 1 && <div onClick={handlePrevGroup}>{`<`}</div>}

          {Array.from(
            { length: endPage - startPage + 1 },
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
        </PageNation>
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

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 4rem 0 2rem 0;
  border-bottom: 1px solid var(--line-gradient);
  > div {
    display: flex;
    gap: 1rem;
  }
`;

const LineGradient = styled.div`
  height: 0.1rem;
  background-image: var(--line-gradient);
`;

const FilteringBox = styled.div`
  > select {
    width: 13rem;
    height: 2.5rem;
    text-align: center;
  }
`;

const SearchBox = styled.div`
  > select {
    width: 13rem;
    height: 2.5rem;
    text-align: center;
  }
`;

const SearchBar = styled.div`
  position: relative;
  > input {
    width: 30rem;
    height: 2.5rem;
  }

  > button {
    height: 2.5rem;
    position: absolute;
    top: 0;
    right: 0;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
`;

const PostingContainer = styled.div``;

const EachPost = styled.div`
  padding: 2rem 0;
  border-bottom: 1px solid var(--secondary-text);
  font-family: var(--main-font);
  cursor: pointer;
  > p {
    width: 50rem;
    height: 3rem;
    font-size: 2rem;
    font-weight: 500;
  }
`;

const PostInfo = styled.div`
  color: var(--secondary-text);
  display: flex;
  align-items: center;
  gap: 1rem;
  > span {
    font-size: 1.6rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const BottomBox = styled.div`
  position: absolute;
  padding: 0 4.5rem;
  justify-content: space-between;
  left: 0;
  width: 100%;
  bottom: 2.5rem;
  display: flex;
`;

const PageNation = styled.div`
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
