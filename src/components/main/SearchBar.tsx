import { countries } from 'constants/countries';
import { majors } from 'constants/majors';
import React from 'react';
import styled from 'styled-components';
import EachUserBox from './EachUserBox';
import { User } from 'types/user';
import Loading from 'components/common/Loading';

interface SearchBarProps {
  showUserList: boolean;
  selectedCountryName: string | null;
  setSelectedCountryName: React.Dispatch<React.SetStateAction<string | null>>;
  onClickSearchButton: () => void;
  setShowUserList: React.Dispatch<React.SetStateAction<boolean>>;
  selectedMajorName: string | null;
  setSelectedMajorName: React.Dispatch<React.SetStateAction<string | null>>;
  userList: User[];
  loading: boolean;
}

export default function SearchBar({
  setShowUserList,
  showUserList,
  selectedCountryName,
  setSelectedCountryName,
  onClickSearchButton,
  selectedMajorName,
  setSelectedMajorName,
  userList,
  loading
}: SearchBarProps) {
  const onChangeSelectedMajorName = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedMajorName(e.target.value);
    setShowUserList(false);
  };

  return (
    <>
      <div>
        <Select
          style={{ paddingLeft: '1rem', fontWeight: '100' }}
          name="countries"
          id=""
          value={selectedCountryName || ''}
          onChange={(e) => setSelectedCountryName(e.target.value)}
        >
          <option disabled hidden value="">
            Select Country
          </option>
          {countries?.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        </Select>
        <Select
          style={{ paddingLeft: '1rem', fontWeight: '100' }}
          name="major"
          id=""
          value={selectedMajorName || ''}
          onChange={onChangeSelectedMajorName}
        >
          <option disabled hidden value="">
            Select Major
          </option>
          {majors?.map((item, index) => (
            <option key={index}>{item.name}</option>
          ))}
        </Select>
        <SearchButton onClick={onClickSearchButton}>Search</SearchButton>
      </div>
      <LineGradient />
      <div>
        {showUserList && (
          <SearchResult $isEmpty={userList.length === 0}>
            {loading ? (
              <Loading></Loading>
            ) : (
              <>
                {userList.length === 0 ? (
                  <div>No User Exists OTL</div>
                ) : (
                  userList?.map((item, index) => {
                    return <EachUserBox key={index} user={item}></EachUserBox>;
                  })
                )}
              </>
            )}
          </SearchResult>
        )}
      </div>
    </>
  );
}

const LineGradient = styled.div`
  height: 0.2rem;
  margin-top: 1rem;
  background-image: var(--line-gradient);
`;

const Select = styled.select`
  border: 1px solid var(--border-color);
`;

const SearchButton = styled.button`
  padding: 0.75rem;

  color: white;
  font-style: italic;
  cursor: pointer;
  background-image: var(--vertical-gradient);
  border: none;
  border-radius: 0.5rem;

  width: ${(7 * 5) / 6}rem;
  height: ${(4.2 * 5) / 6}rem;

  @media screen and (min-width: 1024px) {
    width: 7rem;
    height: 4.2rem;
  }
`;

const SearchResult = styled.div<{ $isEmpty: boolean }>`
  background: white;
  border-radius: 0.5rem;
  margin-top: 1.5rem;
  width: 29rem;

  @media screen and (min-width: 768px) {
    width: 100%;
  }
  overflow: auto;
  border: 1.5px solid var(--primary-color);
  display: flex;
  flex-direction: column;
  gap: 0rem;
  ${(props) =>
    props.$isEmpty ? 'text-align: center; justify-content:center;' : ''}

  height: 36.5rem;

  @media screen and (min-width: 1024px) and (max-height: 768px) {
    height: 25.5rem;
  }

  @media screen and (min-width: 1024px) and (max-height: 644px) {
    height: 14.5rem;
  }

  @media screen and (max-width: 1023px) and (max-height: 767px) {
    height: 18.5rem;
  }

  @media screen and (max-width: 1023px) and (min-height: 768px) {
    height: 27.5rem;
  }
`;
