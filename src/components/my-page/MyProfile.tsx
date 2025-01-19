import styled from 'styled-components';
import { ReactComponent as CakeIcon } from 'assets/icons/my-page/cake.svg';
import { ReactComponent as EmailIcon } from 'assets/icons/my-page/email.svg';
import { ReactComponent as PersonIcon } from 'assets/icons/my-page/person.svg';
import { ReactComponent as MajorIcon } from 'assets/icons/my-page/major.svg';
import { ReactComponent as MBTIIcon } from 'assets/icons/my-page/mbti.svg';
import { ReactComponent as LanguageIcon } from 'assets/icons/my-page/language.svg';
import {
  changeSex,
  findCountryname,
  findLanguage,
  findMajor
} from 'utils/my-page/findInfos';
import { useParams } from 'react-router-dom';
import ToChatButton from './ToChatButton';

export interface ProfileProps {
  birth: string;
  email: string;
  end_date: string;
  start_date: string;
  followings: number[];
  followers_count: number;
  id: number;
  introduce: string;
  languages: string;
  major: string;
  mbti: string;
  nationality: string;
  nickname: string;
  profile_image: string;
  sex: string;
  univ_certified: boolean;
}

export default function MyProfile(profileData: ProfileProps) {
  const { userId } = useParams();

  return (
    <Section>
      <header>
        <HeaderProfileBox>
          <figure>
            <img src={`${profileData.profile_image}`} alt="profile" />
          </figure>
          <div>
            <h1>
              {profileData.nickname}
              {profileData.univ_certified && (
                <>
                  <img src="/images/my-page/certified.png" alt="certified" />
                  <span>Certified User</span>
                </>
              )}
            </h1>
            <p>{findCountryname(profileData.nationality)}</p>
          </div>
        </HeaderProfileBox>
        {userId ? null : (
          // <ToChatButton
          //   userId={Number(userId)}
          //   userName={profileData.nickname}
          // />
          // ToChatButton은 타인의 프로필에서 채팅을 거는 버튼임
          <button>edit</button>
        )}
      </header>
      <DetailInfo>
        <div>
          <span>
            <CakeIcon />
            {profileData.birth ? profileData.birth : 'Unknown'}
          </span>
          <span>
            <EmailIcon />
            {profileData.email}
          </span>
          <span>
            <PersonIcon />
            {changeSex(profileData.sex)}
          </span>
        </div>
        <div>
          <span>
            <MajorIcon />
            {findMajor(profileData.major)}
          </span>
          <span>
            <MBTIIcon />
            {profileData.mbti}
          </span>
          <span>
            <LanguageIcon />
            {findLanguage(profileData.languages)}
          </span>
        </div>
        <div className="marginTop">
          <p>i will be in sogang for</p>
          {/* <span>2025.03.02~2025.12.02</span> */}
          <span>
            {profileData.start_date} ~ {profileData.end_date}
          </span>
        </div>
        <div className="marginTop">
          <p>introduce</p>
          <span>{profileData.introduce}</span>
        </div>
      </DetailInfo>
    </Section>
  );
}

const DetailInfo = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 14rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  div {
    display: flex;
    gap: 2rem;
    font-size: 1.7rem;
    font-weight: 200;
    color: var(--secondary-text);
    &.marginTop {
      margin-top: 1rem;
    }
    span {
      display: flex;
      align-items: center;
      gap: 1rem;
      color: var(--main-text);
      max-width: 50%;
      svg {
        color: var(--secondary-text);
        stroke-width: 1.5px;
        width: 1.7rem;
        height: 1.7rem;
      }
    }
  }
  @media screen and (max-width: 430px) {
    padding-left: 1rem;
    margin-top: 2rem;
    div {
      gap: 1rem 2rem;
      font-size: 1.4rem;
      flex-wrap: wrap;
      span {
        max-width: 70%;
      }
      p {
        font-size: 1.3rem;
      }
      &.marginTop {
        width: 70vw;
      }
    }
  }
`;

const HeaderProfileBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 3rem;
  figure {
    flex-shrink: 0;
    overflow: hidden;
    width: fit-content;
    height: fit-content;
    border: 3px solid transparent;
    border-radius: 50%;
    background-image: linear-gradient(#fff, #fff), var(--vertical-gradient);
    background-origin: border-box;
    background-clip: content-box, border-box;
    img {
      scale: 1.3;
      width: 10rem;
      height: 10rem;
    }
    @media screen and (max-width: 430px) {
      img {
        width: 7.2rem;
        height: 7rem;
      }
    }
  }
  div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-top: 1rem;
    h1 {
      color: var(--primary-color);
      font-size: 2.5rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 1rem;
      img {
        width: 1.7rem;
        height: 1.7rem;
        position: relative;
        cursor: pointer;
        &:hover ~ span {
          opacity: 1;
        }
      }
      span {
        font-weight: 200;
        font-size: 1.2rem;
        color: var(--secondary-text);
        opacity: 0;
        transition: opacity 0.3s;
      }
    }
    p {
      font-weight: 300;
      font-size: 2rem;
    }
  }
  @media screen and (max-width: 430px) {
    margin-top: 2rem;
    gap: 1rem;
    /* align-items: flex-end; */
  }
`;

const Section = styled.section`
  width: 100%;
  height: 100%;
  padding: 3rem 5rem;
  letter-spacing: -0.5px;
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 3rem;
    button {
      width: 10rem;
      height: 3.5rem;
      font-size: 1.6rem;
      border-radius: 4px;
      border: 1px solid var(--hover-bg);
      cursor: pointer;
      transition:
        background-color 0.3s,
        color 0.3s;
      &:hover {
        background-color: var(--hover-bg);
        color: var(--hover-text);
      }
    }
  }
  @media screen and (max-width: 430px) {
    padding: 3rem 2rem;
    header {
      align-items: flex-end;
      button {
        margin-bottom: 2rem;
        width: 7rem;
        height: 3rem;
        font-size: 1.4rem;
      }
    }
  }
`;
