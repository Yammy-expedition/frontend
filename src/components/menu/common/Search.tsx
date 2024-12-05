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
  margin: 3rem 0 2rem 0;
  border-bottom: 1px solid var(--line-gradient);
  > div {
    display: flex;
    gap: 1rem;
  }
  @media screen and (min-width: 430px) {
    padding: 0 2rem;
  }
`;

const SearchBox = styled.div`
  > select {
    width: 13rem;
    height: 3rem;
    text-align: center;
    border-radius: 5px;
    border: 1px solid var(--border-color);
  }
`;

const SearchBar = styled.div`
  position: relative;
  > input {
    width: 100%;
    height: 3rem;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    padding: 0 3rem 0 1rem;
    &:focus {
      outline: none;
    }
  }

  > button {
    height: 3rem;
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
    height: 3rem;
    text-align: center;
    border-radius: 5px;
    border: 1px solid var(--border-color);
  }
`;
