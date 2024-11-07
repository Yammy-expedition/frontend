import { countries } from 'constants/countries';
import { majors } from 'constants/majors';
import { peopleData } from 'constants/peopleMockData';
import React, { useState } from 'react';
import styled from 'styled-components';
import EachUserBox from './EachUserBox';

interface SearchBarProps {
  showUserList: boolean;
  selectedCountryName: string | null;
  setSelectedCountryName: React.Dispatch<React.SetStateAction<string | null>>;
  onClickSearchButton: () => void;
  setShowUserList: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchBar({
  setShowUserList,
  showUserList,
  selectedCountryName,
  setSelectedCountryName,
  onClickSearchButton
}: SearchBarProps) {
  const [selectedMajorName, setSelectedMajorName] = useState<string | null>(
    null
  );

  const filteredUser = peopleData.filter(
    (item) =>
      item.nationality === selectedCountryName &&
      item.major === selectedMajorName
  );

  const onChangeSelectedMajorName = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedMajorName(e.target.value);
    setShowUserList(false);
  };

  return (
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
          <option key={index} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
      <select
        name="major"
        id=""
        value={selectedMajorName || ''}
        onChange={onChangeSelectedMajorName}
      >
        <option disabled hidden value="">
          Select Major
        </option>
        {majors.map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </select>
      <SearchButton onClick={onClickSearchButton}>Search</SearchButton>
      {showUserList && (
        <SearchResult $isEmpty={filteredUser.length === 0}>
          {filteredUser.length === 0 ? (
            <div>No User Exists TT</div>
          ) : (
            filteredUser.map((item, index) => {
              return <EachUserBox key={index} user={item}></EachUserBox>;
            })
          )}
          {}
        </SearchResult>
      )}
    </div>
  );
}

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

const SearchResult = styled.div<{ $isEmpty: boolean }>`
  background: white;
  border-radius: 0.5rem;
  margin-top: 1.5rem;
  padding: 3rem;
  width: 100%;
  height: 33rem;
  overflow: auto;
  border: 2.5px solid green;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  ${(props) =>
    props.$isEmpty ? 'text-align: center; justify-content:center;' : ''}
`;
