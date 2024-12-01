import styled from 'styled-components';
import { countries } from 'constants/countries';
import * as d3 from 'd3-geo';
import SearchBar from './SearchBar';

interface SearchBarProps {
  beforeSelectedCountryRef: React.MutableRefObject<SVGPathElement | null>;
  showUserList: boolean;
  selectedCountryName: string | null;
  setSelectedCountryName: React.Dispatch<React.SetStateAction<string | null>>;
  svgRef: React.RefObject<SVGSVGElement>;
  mapBoxRef: React.RefObject<HTMLDivElement>;
  setTransform: React.Dispatch<React.SetStateAction<string>>;
  setSelectedCountry: React.Dispatch<
    React.SetStateAction<SVGPathElement | null>
  >;
  setShowUserList: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Search({
  beforeSelectedCountryRef,
  selectedCountryName,
  setSelectedCountryName,
  svgRef,
  mapBoxRef,
  setTransform,
  setSelectedCountry,
  showUserList,
  setShowUserList
}: SearchBarProps) {
  const onClickSearchButton = () => {
    if (!selectedCountryName) return;
    setShowUserList(true);
    if (mapBoxRef.current && svgRef.current) {
      // const mapBoxRect = mapBoxRef.current.getBoundingClientRect();
      // const svgRect = svgRef.current.getBoundingClientRect();
      // const projection = d3
      //   .geoMercator()
      //   .scale(100)
      //   .translate([svgRect.width / 2 + 150, svgRect.height / 2 + 200]);

      // const projectionScaled = d3
      //   .geoMercator()
      //   .scale(100)
      //   .translate([svgRect.width / 2, (svgRect.height * 1.1) / 2]);

      // const countryData = countries.find(
      //   (country) => country.name === selectedCountryName
      // );

      const countryPath = svgRef.current.querySelector(
        `.country[title="${selectedCountryName}"]`
      ) as SVGPathElement;

      if (countryPath) {
        console.log(countryPath);
        countryPath.style.fill = 'orange';
        setSelectedCountry((prev) => {
          beforeSelectedCountryRef.current = prev;
          return countryPath;
        });
      }

      // if (countryData) {
      //   const projectedCoordinates =
      //     beforeSelectedCountryRef.current === null
      //       ? projection([countryData.longitude, countryData.latitude])
      //       : projectionScaled([countryData.longitude, countryData.latitude]);
      //   console.log(projectedCoordinates);
      //   console.log(beforeSelectedCountryRef.current);

      //   if (projectedCoordinates) {
      //     const [x, y] = projectedCoordinates;
      //     const translateX = mapBoxRect.width / 2 - x;
      //     const translateY = mapBoxRect.height / 2 - y;
      //     setTransform(`scale(1) translate(${translateX}px, ${translateY}px)`);
      //   }
      // }
    }
  };

  return (
    <SearchContainer>
      {"Let's look for friends in Sogang!"}
      <SearchBar
        showUserList={showUserList}
        selectedCountryName={selectedCountryName}
        setSelectedCountryName={setSelectedCountryName}
        onClickSearchButton={onClickSearchButton}
        setShowUserList={setShowUserList}
      />
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  margin-top: 2rem;
  position: absolute;
  top: 4rem;
  right: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2rem;

  @media screen and (min-width: 320px) and (max-width: 767px) {
    margin-top: 0;
    font-size: 2rem;
    left: 0;
    right: 0;
  }
  @media screen and (min-width: 768px) {
    margin-top: 0;
    font-size: 2.4rem;
    top: 4rem;
    right: 1rem;
  }

  @media screen and (min-width: 1024px) {
    margin-top: 0;
    font-size: 2.4rem;
    top: 4rem;
    right: 1rem;
  }

  font-weight: 600;

  > div {
    width: 100%;
    padding: 0 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1rem;
    > * {
    }

    > select {
      padding: 0.5rem;
      border-radius: 0.5rem;
      width: 11rem;
      height: 3rem;
      font-size: 1.1rem;

      @media screen and (min-width: 768px) {
        width: 14.3rem;
        height: 3.5rem;
        font-size: 1.6rem;
      }

      @media screen and (min-width: 1024px) {
        width: 16rem;
        height: 4.2rem;
      }
    }
  }
`;
