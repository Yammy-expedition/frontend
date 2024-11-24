import styled from 'styled-components';

const locationList = [
  'All',
  'In Sogang',
  'Main Gate',
  'Back Gate',
  'West Gate',
  'Sinchon'
];

const testData = [
  {
    name: 'Gonzaga Plaza',
    desc: 'variety of food in buffet style',
    imgLink: '/images/tips-for-sogang/res1.jpg',
    naverLink: 'https://naver.com',
    googleLink: 'https://google.com'
  },
  {
    name: 'Mibundang',
    desc: 'Vietnamese rice noodles',
    imgLink: '/images/tips-for-sogang/res2.jpg',
    naverLink: 'https://naver.com',
    googleLink: 'https://google.com'
  },
  {
    name: 'The TOL',
    desc: 'Japanese food',
    imgLink: '/images/tips-for-sogang/res2.jpg',
    naverLink: 'https://naver.com',
    googleLink: 'https://google.com'
  }
];

export default function Restaurants() {
  return (
    <Section>
      <LocationTab>
        {locationList.map((el, key) => (
          <li key={key}>{el}</li>
        ))}
      </LocationTab>
      <PostList>
        {testData.map((el, key) => (
          <li key={key}>
            <figure>
              <img src={`${el.imgLink}`} alt="restaurant img" />
            </figure>
            <figcaption>
              <div>
                <h1>{el.name}</h1>
                <h3>{el.desc}</h3>
              </div>
              <div>
                <img src={`${el.naverLink}`} alt="naver" />
                <img src={`${el.googleLink}`} alt="google" />
              </div>
            </figcaption>
          </li>
        ))}
      </PostList>
    </Section>
  );
}

const Section = styled.section`
  overflow-x: hidden;
  width: 100%;
`;

const LocationTab = styled.ul`
  display: flex;
  gap: 1rem;
  list-style: none;
  font-size: 1.6rem;
  overflow-x: hidden;
  li {
    width: 10vw;
    background-color: var(--main-gray);
    color: var(--main-text);
    border-radius: 6.5rem;
    padding: 1.2rem 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    letter-spacing: -0.5px;
    transition:
      color 0.3s,
      background-color 0.3s;
    &:hover {
      color: var(--hover-text);
      background-color: var(--primary-color);
    }
  }
`;

const PostList = styled.ul`
  height: 60vh;
  overflow-y: scroll;
  margin-top: 3rem;
  border-top: 1px solid var(--border-color);
  li {
    display: flex;
    padding: 2% 0;
    list-style: none;
    border-bottom: 1px solid var(--border-color);
    gap: 2rem;
    figure {
      width: 12rem;
      height: 12rem;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    figcaption {
      max-width: 50vw;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      div:first-child {
        color: var(--main-text);
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      h1 {
        letter-spacing: -1px;
        font-size: 2rem;
      }
      h3 {
        font-weight: 200;
        font-size: 1.6rem;
      }
    }
  }
`;
