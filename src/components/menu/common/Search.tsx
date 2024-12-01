import React from 'react';
import styled from 'styled-components';
import { ReactComponent as SearchSVG } from '../../../assets/icons/search.svg';

interface SearchProps {
  searchType: string | undefined;
  setSearchType: React.Dispatch<React.SetStateAction<string>>;
  orderType: string | undefined;
  setOrderType: React.Dispatch<React.SetStateAction<string>>;
  searchContent: string;
  setSearchContent: React.Dispatch<React.SetStateAction<string>>;
  onClickSearch: () => void;
}

export default function Search({
  searchType,
  setSearchType,
  orderType,
  setOrderType,
  searchContent,
  setSearchContent,
  onClickSearch
}: SearchProps) {
  return (
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
          <input
            type="text"
            value={searchContent}
            onChange={(e) => {
              console.log(e.target.value);
              setSearchContent(e.target.value);
            }}
          />
          <button onClick={onClickSearch}>
            <SearchSVG></SearchSVG>
          </button>
        </SearchBar>
      </SearchBox>
      <FilteringBox>
        <select
          value={orderType}
          onChange={(e) => {
            setOrderType(e.target.value);
          }}
        >
          <option value="latest">Latest</option>
          <option value="likes">Likes</option>
          <option value="comments">Comments</option>
        </select>
      </FilteringBox>
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin: 4rem 0 2rem 0;
  border-bottom: 1px solid var(--line-gradient);
  > div {
    display: flex;
    gap: 1rem;
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
    width: 100%;
    height: 2.5rem;
    padding-right: 3rem;
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

const FilteringBox = styled.div`
  > select {
    width: 13rem;
    height: 2.5rem;
    text-align: center;
  }
`;
