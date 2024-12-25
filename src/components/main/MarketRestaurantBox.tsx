import { postings } from 'constants/posting';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as PlusSVG } from '../../assets/icons/plus.svg';
import { ReactComponent as SparkleSVG } from '../../assets/icons/main/sparkle.svg';
import { useNavigate } from 'react-router-dom';
import { Posting } from 'types/posting';
import { getPostingList } from 'utils/common/getPostingList';
import Loading from 'components/common/Loading';

export default function MarketRestaurantBox() {
  const navigate = useNavigate();
  const [restaurantPostings, setRestaurantPostings] = useState<Posting[]>([]);
  const [marketPostings, setMarketPostings] = useState<Posting[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      // 레스토랑 데이터 가져오기
      await getPostingList('restaurant', setRestaurantPostings, 1, setLoading);
      // 마켓 데이터 가져오기
      await getPostingList('market', setMarketPostings, 1, setLoading);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        console.log('Page restored from cache. Fetching new data...');
        fetchData(); // 페이지가 캐시에서 복원될 때 데이터를 다시 가져오기
      }
    };

    // 브라우저 `pageshow` 이벤트 리스너 등록
    window.addEventListener('pageshow', handlePageShow);

    // 컴포넌트가 처음 마운트될 때 데이터 패칭
    fetchData();

    // 언마운트 시 이벤트 리스너 정리
    return () => {
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, []);
  return (
    <MarketRestaurant>
      <Restaurent>
        <div>
          <SquareRestaurantPlus>
            <div>
              <SparkleSVG />
              <p>Restaurant</p>
            </div>
            <Plus onClick={() => navigate('/menu/restaurant')}>
              <PlusSVG />
            </Plus>
          </SquareRestaurantPlus>
        </div>

        <List>
          {loading ? (
            <Loading></Loading>
          ) : (
            <>
              {restaurantPostings.map((post, index2) => (
                <CircleTitleCreatedAt key={index2}>
                  <CircleTitle>
                    <Circle></Circle>
                    <Title
                      onClick={() =>
                        navigate(`/posting/${post.id}`, {
                          state: {
                            posting: post,
                            boardType: 'restaurant',
                            pageName: 'Restaurants'
                          }
                        })
                      }
                    >
                      {post.title}
                    </Title>
                  </CircleTitle>
                  <CreatedAt>{`${post.created_at.split('T')[0]}`}</CreatedAt>
                </CircleTitleCreatedAt>
              ))}
            </>
          )}
        </List>
      </Restaurent>
      <Market>
        <div>
          <SquareRestaurantPlus>
            <div>
              {/* <Square></Square> */}
              <SparkleSVG />
              <p>Market</p>
            </div>
            <Plus onClick={() => navigate('/menu/market')}>
              <PlusSVG />
            </Plus>
          </SquareRestaurantPlus>
        </div>

        <List>
          {loading ? (
            <Loading></Loading>
          ) : (
            <>
              {marketPostings.map((post, index2) => (
                <CircleTitleCreatedAt key={index2}>
                  <CircleTitle>
                    <Circle></Circle>
                    <Title
                      onClick={() =>
                        navigate(`/posting/${post.id}`, {
                          state: {
                            posting: post,
                            boardType: 'market',
                            pageName: 'Markets'
                          }
                        })
                      }
                    >
                      {post.title}
                    </Title>
                  </CircleTitle>
                  <CreatedAt>{`${post.created_at.split('T')[0]}`}</CreatedAt>
                </CircleTitleCreatedAt>
              ))}
            </>
          )}
        </List>
      </Market>
    </MarketRestaurant>
  );
}

const MarketRestaurant = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  width: 100%;
  height: auto; /* 높이를 자식 요소에 따라 조정 */
  padding: 0 3rem 0rem 3rem;

  @media screen and (min-width: 320px) and (max-width: 768px) {
    margin-top: 10rem;
  }

  @media screen and (min-width: 768px) {
    position: absolute;
    bottom: 0;
    flex-direction: row;
    align-items: stretch;
    margin: 0;
  }
`;

const Restaurent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Market = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SquareRestaurantPlus = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  letter-spacing: -1px;
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
    svg {
      width: 2rem;
      height: 2rem;
      @media screen and (min-width: 1024px) {
        width: 2.4rem;
        height: 2.4rem;
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
  &:hover {
    opacity: 0.8;
    color: var(--border-color);
  }
`;

const List = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 5px 5px 0 0;
  padding: 2rem;
  background: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  font-size: 1.2rem;
  overflow: hidden;
  @media screen and (max-width: 768px) {
    border-radius: 5px;
  }
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

  @media screen and (min-width: 768px) {
    width: 7rem;
  }

  @media screen and (min-width: 850px) {
    width: 11rem;
  }
  @media screen and (min-width: 1024px) {
    width: 14rem;
  }

  @media screen and (min-width: 1280px) {
    width: auto;
  }

  &:hover {
    color: var(--primary-color);
    text-decoration: underline 1px solid var(--primary-color);
  }
`;

const CreatedAt = styled.div`
  font-size: 1.1rem;
`;

const Circle = styled.div`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background: black;
`;
