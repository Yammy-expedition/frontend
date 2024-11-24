import React from 'react';
import styled from 'styled-components';
import { ReactComponent as SearchSVG } from '../../assets/icons/search.svg';
import { ReactComponent as HeartSVG } from '../../assets/icons/heart.svg';
import { ReactComponent as EyeSVG } from '../../assets/icons/eye.svg';
import { ReactComponent as CommentSVG } from '../../assets/icons/coment.svg';

export default function GeneralDiscussionPage() {
  return (
    <RestaurantsPageContainer>
      <PageNameBox>
        <p>General Discussion</p>
      </PageNameBox>

      <SearchContainer>
        <SearchBox>
          <select>
            <option value="all">All</option>
            <option value="title">Title</option>
            <option value="content">Content</option>
          </select>
          <SearchBar>
            <input value="" readOnly />
            <button>
              <SearchSVG></SearchSVG>
            </button>
          </SearchBar>
        </SearchBox>
        <FilteringBox>
          <select>
            <option value="">Recent</option>
            <option value="">Popular</option>
          </select>
        </FilteringBox>
      </SearchContainer>

      <LineGradient></LineGradient>

      <PostingContainer>
        <EachPost>
          <p>This is title1</p>
          <PostInfo>
            <span>Writer </span>
            <span>24.10.01 </span>
            <span>
              <HeartSVG></HeartSVG> 0
            </span>
            <span>
              <EyeSVG></EyeSVG> 0
            </span>
            <span>
              <CommentSVG></CommentSVG> 0
            </span>
          </PostInfo>
        </EachPost>

        <EachPost>
          <p>This is title2</p>
          <PostInfo>
            <span>Writer </span>
            <span>24.10.01 </span>
            <span>
              <HeartSVG></HeartSVG> 0
            </span>
            <span>
              <EyeSVG></EyeSVG> 0
            </span>
            <span>
              <CommentSVG></CommentSVG> 0
            </span>
          </PostInfo>
        </EachPost>
      </PostingContainer>

      <BottomBox>
        <div></div>
        <PageNation>페이지 네이션 위치</PageNation>
        <WriteButton>write</WriteButton>
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
  bottom: 4rem;
  display: flex;
`;

const PageNation = styled.div`
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
