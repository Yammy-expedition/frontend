import React from 'react';
import styled from 'styled-components';

const locationList = [
  'All',
  'In Sogang',
  'Main Gate',
  'Back Gate',
  'West Gate',
  'Sinchon'
];

export default function TipsForSogangPage() {
  return (
    <Wrapper>
      <Header>
        <div>Tips for Sogang Life</div>
        <p>
          Tips for Sogang Life is what Unicon managements collected directly!
        </p>
      </Header>
      <Nav>
        <div>Restaurants</div>
        <div>Sogang Map</div>
      </Nav>
      <section>
        <LocationTab>
          {locationList.map((el, key) => (
            <li key={key}>{el}</li>
          ))}
        </LocationTab>
        <PostList>
          <li>
            <figure>
              <img src="" alt="" />
            </figure>
            <figcaption>
              <div>
                <h1>Gonzaga Plaza</h1>
                <h3>variety of food in buffet style</h3>
              </div>
              <div>
                <img src="" alt="" />
                <img src="" alt="" />
              </div>
            </figcaption>
          </li>
        </PostList>
      </section>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  width: 100%;
  height: 100vh;
  padding-left: 3rem;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 5rem;
  padding-bottom: 3rem;
  div {
    font-size: 4rem;
  }
  p {
    font-size: 2rem;
    color: var(--secondary-text);
  }
`;

const Nav = styled.nav`
  padding: 2rem 0;
  display: flex;
  gap: 2rem;
  div {
    background-color: var(--main-gray);
    color: var(--secondary-text);
    border-radius: 6.5rem;
    padding: 1.5rem 3rem;
    font-size: 1.6rem;
    cursor: pointer;
    &:hover {
      background-color: var(--hover-bg);
      color: var(--hover-text);
    }
  }
`;

const LocationTab = styled.ul`
  display: flex;
  gap: 1rem;
  list-style: none;
  font-size: 1.6rem;
  li {
    background-color: var(--main-gray);
    color: var(--main-text);
    border-radius: 6.5rem;
    padding: 1rem 3rem;
    cursor: pointer;
    &:hover {
      color: var(--hover-text);
      background-color: var(--primary-color);
    }
  }
`;

const PostList = styled.ul`
  margin-top: 3rem;
  border-top: 1px solid var(--border-color);
  li {
    display: flex;
    padding: 2% 0;
    list-style: none;
    border-bottom: 1px solid var(--border-color);
    figure {
      width: 20rem;
      height: 20rem;
    }
    figcaption {
      background-color: darkorange;
      h1 {
      }
    }
  }
`;
