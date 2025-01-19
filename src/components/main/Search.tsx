import styled from 'styled-components';
import { countries } from 'constants/countries';
import * as d3 from 'd3-geo';
import SearchBar from './SearchBar';
import { useEffect, useState } from 'react';
import { User } from 'types/user';
import { getUserList } from 'utils/main/getUserList';
import { majors } from 'constants/majors';

interface SearchBarProps {
  beforeSelectedCountryRef: React.MutableRefObject<SVGPathElement | null>;
  showUserList: boolean;
  selectedCountryName: string | null;
  setSelectedCountryName: React.Dispatch<React.SetStateAction<string | null>>;
  svgRef: React.RefObject<SVGSVGElement>;
  mapBoxRef: React.RefObject<HTMLDivElement>;
  setSelectedCountry: React.Dispatch<
    React.SetStateAction<SVGPathElement | null>
  >;
  setShowUserList: React.Dispatch<React.SetStateAction<boolean>>;
  userList: User[];
  setUserList: React.Dispatch<React.SetStateAction<User[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Search({
  beforeSelectedCountryRef,
  selectedCountryName,
  setSelectedCountryName,
  svgRef,
  mapBoxRef,
  setSelectedCountry,
  showUserList,
  setShowUserList,
  userList,
  setUserList,
  loading,
  setLoading
}: SearchBarProps) {
  const [selectedMajorName, setSelectedMajorName] = useState<string | null>(
    null
  );

  useEffect(() => {
    setUserList([]);
  }, [selectedCountryName, selectedMajorName]);

  const onClickSearchButton = () => {
    setShowUserList(true);

    const nationalityArr = countries.filter(
      (country) => country.name === (selectedCountryName as string)
    );

    const majorArr = majors.filter(
      (major) => major.name === (selectedMajorName as string)
    );

    const nationality =
      nationalityArr.length === 0 ? '' : nationalityArr[0].code;
    const major = majorArr.length === 0 ? '' : majorArr[0].code;

    getUserList(setLoading, nationality, major).then((result) =>
      setUserList(result)
    );

    if (mapBoxRef.current && svgRef.current) {
      const countryPath = svgRef.current.querySelector(
        `.country[title="${selectedCountryName}"]`
      ) as SVGPathElement;

      if (countryPath) {
        countryPath.style.fill = '#B6AFE3';
        setSelectedCountry((prev) => {
          beforeSelectedCountryRef.current = prev;
          return countryPath;
        });
      }
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
        selectedMajorName={selectedMajorName}
        setSelectedMajorName={setSelectedMajorName}
        userList={userList}
        loading={loading}
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
