import Restaurants from 'components/tips-for-sogang/Restaurants';
import SogangMap from 'components/tips-for-sogang/SogangMap';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

export default function TipsForSogangPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category');

  const handleCategoryChange = (category: string) => {
    setSearchParams({ category });
  };

  return (
    <Wrapper>
      <Header>
        <div>Tips for Sogang Life</div>
        <p>
          Tips for Sogang Life is what Unicon managements collected directly!
        </p>
      </Header>
      <Nav>
        <div onClick={() => handleCategoryChange('restaurants')}>
          Restaurants
        </div>
        <div onClick={() => handleCategoryChange('sogang-map')}>Sogang Map</div>
      </Nav>
      {category === 'sogang-map' ? <SogangMap /> : <Restaurants />}
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
  padding-bottom: 2rem;
  border-bottom: 1px solid;
  border-image: var(--line-gradient) 1;
  font-family: var(--sub-font);
  letter-spacing: -1px;
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
  letter-spacing: -0.5px;
  div {
    width: 10vw;
    background-color: var(--main-gray);
    color: var(--secondary-text);
    border-radius: 6.5rem;
    padding: 1.5rem 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.6rem;
    cursor: pointer;
    transition:
      color 0.3s,
      background-color 0.3s;
    &:hover {
      background-color: var(--hover-bg);
      color: var(--hover-text);
    }
  }
`;
