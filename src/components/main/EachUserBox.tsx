import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { User } from 'types/user';

interface EachUserBoxProps {
  user: User;
}

export default function EachUserBox({ user }: EachUserBoxProps) {
  const navigate = useNavigate();
  console.log(user);

  return (
    <EachUserBoxContainer
      onClick={() => navigate(`/user-profile/${user.id}/postings`)}
    >
      <ProfileImage>
        <figure>
          <img src={`${user.profile_image}`} alt="temp_img" />
        </figure>
      </ProfileImage>
      <div>
        <Nickname>{user.nickname}</Nickname>
        <Languages>
          <span>languages</span> {user.languages}
        </Languages>
        <CreatedAt>
          <span>created at</span> {user.created_at.split('T')[0]}
        </CreatedAt>
      </div>
    </EachUserBoxContainer>
  );
}

const EachUserBoxContainer = styled.div`
  padding: 2rem 2rem;
  cursor: pointer;
  display: flex;
  gap: 2rem;
  letter-spacing: -0.5px;
  transition: background 0.3s;
  &:hover {
    background: var(--bg-gray);
    > span {
      color: var(--hover-text);
    }
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const Nickname = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--primary-color);
  @media screen and (min-width: 1024px) {
    font-size: 2rem;
  }
`;

const Languages = styled.p`
  font-weight: 200;
  font-size: 1.2rem;
  margin-top: 0.5rem;
  display: flex;
  gap: 1rem;
  span {
    color: var(--main-gray);
  }
  @media screen and (min-width: 1024px) {
    font-size: 1.4rem;
  }
`;

const CreatedAt = styled.p`
  margin-top: 0.3rem;
  font-weight: 200;
  font-size: 1.2rem;
  display: flex;
  gap: 1rem;
  span {
    color: var(--main-gray);
  }
  @media screen and (min-width: 1024px) {
    font-size: 1.4rem;
  }
`;

const ProfileImage = styled.div`
  > figure {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    overflow: hidden;
    border-radius: 50%;
    background-color: var(--hover-text);
    > img {
      border-radius: 50%;
      width: 5rem;
      height: 5rem;
      scale: 1.2;
      @media screen and (min-width: 1024px) {
        width: 6rem;
        height: 6rem;
      }
    }
  }
  border-radius: 5rem;
  border: 2px solid transparent;
  background: linear-gradient(to top, black, var(--primary-color)) border-box;
`;
