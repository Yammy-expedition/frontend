import { postings } from 'constants/posting';
import React from 'react';
import styled from 'styled-components';

export default function MarketRestaurantBox() {
  return (
    <MarketRestaurant>
      <Restaurent>
        <div>
          <SquareRestaurantPlus>
            <div>
              <Square></Square>
              <p>Restaurant</p>
            </div>
            <Plus>plus</Plus>
          </SquareRestaurantPlus>
        </div>

        <List>
          {postings
            .filter((item, index1) => index1 <= 4)
            .map((post, index2) => (
              <CircleTitleCreatedAt key={index2}>
                <CircleTitle>
                  <Circle></Circle>
                  {post.title}
                </CircleTitle>
                <CreatedAt>{`${post.created_at.getMonth() + 1} / ${post.created_at.getDate()}`}</CreatedAt>
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
            <Plus>plus</Plus>
          </SquareRestaurantPlus>
        </div>

        <List>
          {postings
            .filter((item, index1) => index1 <= 4)
            .map((post, index2) => (
              <CircleTitleCreatedAt key={index2}>
                <CircleTitle>
                  <Circle></Circle>
                  {post.title}
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
  gap: 4rem;
  bottom: 0;
  padding: 0 4rem;
  height: 25rem;
`;

const Restaurent = styled.div`
  width: 48rem;
  min-width: 28rem;
  display: flex;
  flex-direction: column;
`;

const Market = styled.div`
  width: 48rem;
  min-width: 28rem;
  display: flex;
  flex-direction: column;
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
      font-size: 2.4rem;
    }
  }
`;

const Square = styled.div`
  width: 2rem;
  height: 2rem;
  background: black;
  border-radius: 0.75rem;
`;

const Plus = styled.div``;

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
`;

const CircleTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CreatedAt = styled.div``;

const Circle = styled.div`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background: black;
`;
