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
  /* background-color: aquamarine; */
  width: 100%;
  height: 100vh;
  padding-left: 3rem;
`;

const Header = styled.header`
  padding-top: 5rem;
  padding-bottom: 3rem;
  background-color: aliceblue;
  div {
    font-size: 4rem;
  }
  p {
    font-size: 2rem;
  }
`;

const Nav = styled.nav`
  background-color: bisque;
  padding: 2rem 0;
  display: flex;
  gap: 2rem;
  div {
    background-color: #d9d9d9;
    color: #717171;
    border-radius: 6.5rem;
    padding: 1.5rem 3rem;
    font-size: 2rem;
    cursor: pointer;
    &:hover {
      background-color: black;
      color: white;
    }
  }
`;

const LocationTab = styled.ul`
  padding: 0;
  background-color: cadetblue;
  display: flex;
  gap: 1rem;
  list-style: none;
  font-size: 2rem;
  li {
    background-color: #d9d9d9;
    border-radius: 6.5rem;
    padding: 1rem 3rem;
    cursor: pointer;
    &:hover {
      color: white;
      background-color: var(--primary-color);
    }
  }
`;

const PostList = styled.ul`
  border-top: 1px solid #979797;
  padding: 0;
  li {
    display: flex;
    padding: 2% 0;
    list-style: none;
    border-bottom: 1px solid #979797;
    figure {
      margin: 0;
      width: 20rem;
      height: 20rem;
      background-color: black;
    }
    figcaption {
      background-color: darkorange;
      h1 {
      }
    }
  }
`;
