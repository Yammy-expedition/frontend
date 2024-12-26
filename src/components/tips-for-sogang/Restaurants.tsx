import { instance } from 'api/instance';
import Loading from 'components/common/Loading';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

interface Restaurant {
  name: string;
  location: string;
  short_intro: string;
  photo: string;
  naver_map_link: string;
  google_map_link: string;
}

const locationList = ['All', 'MAIN_GATE', 'BACK_GATE', 'WEST_GATE', 'SINCHON'];
const locationList2 = ['All', 'Main gate', 'Back gate', 'West gate', 'Sinchon'];

export default function Restaurants() {
  //기본 데이터
  const [restaurantList, setRestaurantList] = useState<Restaurant[]>([]);
  //필터링된 데이터
  const [filteredRestaurantList, setFilteredRestaurantList] =
    useState<Restaurant[]>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [location, setLocation] = useState<string>('All');

  const handleTabClick = (location: string) => {
    setSearchParams({ location: location });
    setLocation(location);
  };

  //레스토랑 데이터 가져오기
  useEffect(() => {
    const getPostList = async () => {
      try {
        const response = await instance.get('/tips/tips-restaurants');
        if (response.status === 200) {
          setRestaurantList(response.data.reverse());
        }
      } catch (e) {
        console.error(e);
      }
    };
    getPostList();
  }, []);

  useEffect(() => {
    if (searchParams.has('location')) {
      const selectedLocation = searchParams.get('location');
      if (selectedLocation) setLocation(selectedLocation);
      const filtered =
        selectedLocation === 'All'
          ? restaurantList
          : restaurantList?.filter(
              (restaurant) => restaurant.location === selectedLocation
            );
      setFilteredRestaurantList(filtered);
    } else {
      setLocation('All');
      setFilteredRestaurantList(restaurantList);
    }
  }, [searchParams, location, restaurantList]);

  return (
    <Section>
      <LocationTab>
        {locationList.map((el, key) => (
          <li
            className={location === el ? 'selected' : ''}
            onClick={() => handleTabClick(el)}
            key={key}
          >
            {locationList2[key]}
          </li>
        ))}
      </LocationTab>
      <PostList>
        {filteredRestaurantList ? (
          filteredRestaurantList?.map((el, key) => (
            <li key={key}>
              <figure>
                <img src={`${el.photo}`} alt="restaurant img" />
              </figure>
              <figcaption>
                <div>
                  <h1>{el.name}</h1>
                  <h3>{el.short_intro}</h3>
                </div>
                <div>
                  <MapLink target="blank" href={`${el.naver_map_link}`}>
                    <img
                      className="mapImg"
                      src="/images/tips-for-sogang/naver-map.png"
                      alt="naver"
                    />
                  </MapLink>
                  <MapLink target="blank" href={`${el.google_map_link}`}>
                    <img
                      className="mapImg"
                      src="/images/tips-for-sogang/google-map.png"
                      alt="google"
                    />
                  </MapLink>
                </div>
              </figcaption>
            </li>
          ))
        ) : (
          <Loading />
        )}
      </PostList>
    </Section>
  );
}

const MapLink = styled.a`
  img {
    width: 3rem;
    height: 3rem;
    margin-right: 1rem;
    cursor: pointer;
    border-radius: 50%;
    filter: hue-rotate(120deg);
    &:hover {
      opacity: 0.8;
    }
  }
`;

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
  flex-wrap: wrap;
  padding: 2rem 0;
  li {
    width: 15rem;
    flex-shrink: 0;
    background-color: var(--main-gray);
    color: var(--secondary-text);
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
    &.selected {
      color: white;
      background-color: var(--primary-color);
    }
  }
  @media (max-width: 430px) {
    padding: 2rem 1rem;
    overflow-x: scroll;
    flex-wrap: nowrap;
    width: 100vw;
    li {
      width: 14rem;
      font-size: 1.5rem;
    }
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;

const PostList = styled.ul`
  height: 62vh;
  overflow-y: scroll;
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
  @media (max-width: 430px) {
    &::-webkit-scrollbar-thumb {
      background-color: var(--hover-bg);
    }
  }
`;
