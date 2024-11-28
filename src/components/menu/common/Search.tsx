import React from 'react';
import styled from 'styled-components';
import { ReactComponent as SearchSVG } from '../../../assets/icons/search.svg';

interface SearchProps {
  searchType: string | undefined;
  setSearchType: React.Dispatch<React.SetStateAction<string | undefined>>;
  orderType: string | undefined;
  setOrderType: React.Dispatch<React.SetStateAction<string | undefined>>;
  searchContent: string | undefined;
  setSearchContent: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function Search({
  searchType,
  setSearchType,
  orderType,
  setOrderType,
  searchContent,
  setSearchContent
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
            onChange={(e) => setSearchContent(e.target.value)}
          />
          <button>
            <SearchSVG></SearchSVG>
          </button>
        </SearchBar>
      </SearchBox>
      <FilteringBox>
        <select
          value={orderType}
          onChange={(e) => setOrderType(e.target.value)}
        >
          <option value="latest">Recent</option>
          <option value="likes">Popular</option>
          <option value="comments">Popular</option>
        </select>
      </FilteringBox>
    </SearchContainer>
  );
}

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

const FilteringBox = styled.div`
  > select {
    width: 13rem;
    height: 2.5rem;
    text-align: center;
  }
`;
