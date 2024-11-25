import { postings } from 'constants/posting';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as PlusSVG } from '../../assets/icons/plus.svg';
import { useNavigate } from 'react-router-dom';
import { Posting } from 'types/posting';
import { getPostingList } from 'utils/getPostingList';

export default function MarketRestaurantBox() {
  const navigate = useNavigate();
  const [restaurantPostings, setRestaurantPostings] = useState<Posting[]>();
  const [marketPostings, setMarketPostings] = useState<Posting[]>();

  useEffect(() => {
    getPostingList('restaurant', setRestaurantPostings);
    getPostingList('market', setMarketPostings);
  }, []);
  return (
    <MarketRestaurant>
      <Restaurent>
        <div>
          <SquareRestaurantPlus>
            <div>
              <Square></Square>
              <p>Restaurant</p>
            </div>
            <Plus onClick={() => navigate('/menu/restaurants')}>
              <PlusSVG />
            </Plus>
          </SquareRestaurantPlus>
        </div>

        <List>
          {restaurantPostings
            ?.filter((item, index1) => index1 <= 4)
            .map((post, index2) => (
              <CircleTitleCreatedAt key={index2}>
                <CircleTitle>
                  <Circle></Circle>
                  <Title>{post.title}</Title>
                </CircleTitle>
                <CreatedAt>{`${post.created_at.split('T')[0]}`}</CreatedAt>
              </CircleTitleCreatedAt>
            ))}
        </List>
      </Restaurent>
      <Market>
        <div>
          <SquareRestaurantPlus>
            <div>
              <Square></Square>
              <p>Market</p>
            </div>
            <Plus onClick={() => navigate('/menu/markets')}>
              <PlusSVG />
            </Plus>
          </SquareRestaurantPlus>
        </div>

        <List>
          {postings
            .filter((item, index1) => index1 <= 4)
            .map((post, index2) => (
              <CircleTitleCreatedAt key={index2}>
                <CircleTitle>
                  <Circle></Circle>
                  <Title>{post.title}</Title>
                </CircleTitle>
                <CreatedAt>{`${post.created_at.getMonth() + 1} / ${post.created_at.getDate()}`}</CreatedAt>
              </CircleTitleCreatedAt>
            ))}
        </List>
      </Market>
    </MarketRestaurant>
  );
}

const MarketRestaurant = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 25rem;
`;

const Restaurent = styled.div`
  width: 48rem;
  min-width: 23rem;
  display: flex;
  flex-direction: column;
  padding: 0 1rem 0 2rem;
`;

const Market = styled.div`
  width: 48rem;
  min-width: 23rem;
  display: flex;
  flex-direction: column;
  padding: 0 2rem 0 1rem;
`;

const SquareRestaurantPlus = styled.div`
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  > div {
    display: flex;
    align-items: center;
    gap: 1rem;

    > p {
      font-size: 2rem;
      @media screen and (min-width: 1024px) {
        font-size: 2.4rem;
      }
    }
  }
`;

const Square = styled.div`
  width: 2rem;
  height: 2rem;
  background: black;
  border-radius: 0.75rem;
  @media screen and (min-width: 1024px) {
    width: 2rem;
    height: 2rem;
  }
`;

const Plus = styled.div`
  cursor: pointer;
`;

const List = styled.div`
  border: 2px solid #97979780;
  border-radius: 0.5rem;
  padding: 2rem;
  background: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  font-size: 1.2rem;
  overflow: hidden;
`;

const CircleTitleCreatedAt = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
`;

const CircleTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Title = styled.div`
  cursor: pointer;
  border-bottom: 1px solid white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
  color: black;
  text-decoration: underline 1px white;
  transition: 0.3s ease;

  width: 11rem;
  @media screen and (min-width: 1024px) {
    width: 15rem;
  }

  @media screen and (min-width: 1280px) {
    width: auto;
  }

  &:hover {
    color: var(--primary-color);
    text-decoration: underline 1px solid var(--primary-color);
  }
`;

const CreatedAt = styled.div``;

const Circle = styled.div`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background: black;
`;
