import styled from 'styled-components';
import { countries } from 'constants/countries';
import * as d3 from 'd3-geo';
import SearchBar from './SearchBar';

interface SearchBarProps {
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
    setShowUserList(true);
    if (mapBoxRef.current && svgRef.current) {
      const mapBoxRect = mapBoxRef.current.getBoundingClientRect();
      const svgRect = svgRef.current.getBoundingClientRect();
      const projection = d3
        .geoMercator()
        .scale(100)
        .translate([svgRect.width / 2 + 200, svgRect.height / 2 + 200]);

      const countryData = countries.find(
        (country) => country.name === selectedCountryName
      );

      const countryPath = svgRef.current.querySelector(
        `.country[title="${selectedCountryName}"]`
      ) as SVGPathElement;

      if (countryPath) {
        countryPath.style.fill = 'orange';
        setSelectedCountry(countryPath);
      }

      if (countryData) {
        const projectedCoordinates = projection([
          countryData.longitude,
          countryData.latitude
        ]);

        if (projectedCoordinates) {
          const [x, y] = projectedCoordinates;
          const translateX = mapBoxRect.width / 2 - x;
          const translateY = mapBoxRect.height / 2 - y;
          setTransform(`scale(1) translate(${translateX}px, ${translateY}px)`);
        }
      }
    }
  };

  return (
    <SearchContainer>
      {"Let's looking for friends in Sogang!"}
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
  position: absolute;
  top: 5rem;
  right: 10rem;
  font-size: 2.4rem;
  font-weight: 600;

  > div {
    margin-top: 1rem;
    > * {
      margin-left: 0.5rem;
    }

    > select {
      width: 16rem;
      height: 4.2rem;
      padding: 0.5rem;
      border-radius: 0.5rem;
    }
  }
`;
