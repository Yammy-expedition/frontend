import React from 'react';
import styled from 'styled-components';
import { countries } from 'constants/countries';
import { majors } from 'constants/majors';

interface SearchBarProps {
  selectedCountryName: string | null;
  setSelectedCountryName: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function SearchBar({
  selectedCountryName,
  setSelectedCountryName
}: SearchBarProps) {
  return (
    <SearchContainer>
      {"Let's looking for friends in Sogang!"}
      <div>
        <select
          name="countries"
          id=""
          value={selectedCountryName || ''}
          onChange={(e) => setSelectedCountryName(e.target.value)}
        >
          <option disabled hidden value="">
            Select Country
          </option>
          {countries.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select name="major" id="">
          <option disabled hidden selected>
            Select Major
          </option>
          {majors.map((item, index) => (
            <option key={index}>{item}</option>
          ))}
        </select>
        <SearchButton>Search</SearchButton>
      </div>
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

const SearchButton = styled.button`
  padding:0.75rem;
  width: 7rem;
  height: 4.2rem;
  color: white;
  font-style: italic;
  cursor:pointer;
  background-image: linear-gradient(to top, #000000, green);
  border:none;
  border-radius: 0.5rem;
};
`;
