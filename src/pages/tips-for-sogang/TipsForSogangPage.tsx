import Restaurants from 'components/tips-for-sogang/Restaurants';
import SogangMap from 'components/tips-for-sogang/SogangMap';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

export default function TipsForSogangPage() {
  const [selectedCategory, setSelectedCategory] = useState('restaurants');
  const { category } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!category) {
      navigate('/tips-for-sogang/restaurants');
    } else {
      setSelectedCategory(category);
    }
  }, [category]);

  function handleCategoryChange(category: string) {
    setSelectedCategory(category);
    navigate(`/tips-for-sogang/${category}`);
  }

  return (
    <Wrapper>
      <Header>
        <div>Tips for Sogang Life</div>
        <p>
          Tips for Sogang Life is what Unicon managements collected directly!
        </p>
      </Header>
      <Nav>
        <NavBtn
          $current={selectedCategory === 'restaurants'}
          onClick={() => handleCategoryChange('restaurants')}
        >
          Restaurants
        </NavBtn>
        <NavBtn
          $current={selectedCategory === 'sogang-map'}
          onClick={() => handleCategoryChange('sogang-map')}
        >
          Sogang Map
        </NavBtn>
      </Nav>
      <div style={{ height: '100%' }}>
        {selectedCategory === 'sogang-map' ? <SogangMap /> : <Restaurants />}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  width: 100%;
  height: 100vh;
  padding-left: 3rem;
  display: flex;
  flex-direction: column;
  @media (max-width: 430px) {
    padding-left: 0;
  }
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid;
  border-image: var(--line-gradient) 1;
  font-family: var(--sub-font);
  letter-spacing: -1px;
  div {
    font-size: 3.5rem;
  }
  p {
    font-size: 1.6rem;
    color: var(--secondary-text);
  }
  @media (max-width: 430px) {
    padding-top: 4rem;
    padding-left: 2rem;
    gap: 1rem;
    div {
      font-size: 2.5rem;
    }
    p {
      font-size: 1.3rem;
    }
  }
`;

const NavBtn = styled.div<{ $current: boolean }>`
  width: 15rem;
  background-color: ${({ $current }) =>
    $current ? 'var(--hover-bg)' : 'var(--main-gray)'};
  color: ${({ $current }) =>
    $current ? 'var(--hover-text)' : 'var(--secondary-text)'};
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
  @media (max-width: 430px) {
    width: 14rem;
    padding: 1.2rem 3rem;
    font-size: 1.5rem;
  }
`;

const Nav = styled.nav`
  padding: 2rem 0;
  display: flex;
  gap: 1rem;
  letter-spacing: -0.5px;
  @media (max-width: 430px) {
    padding-left: 1rem;
    border-bottom: 1px solid var(--border-color);
  }
`;
