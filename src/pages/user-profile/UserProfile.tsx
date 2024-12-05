import Loading from 'components/common/Loading';
import MyDatas from 'components/my-page/MyDatas';
import MyProfile from 'components/my-page/MyProfile';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getUserInfo } from 'utils/common/getUserInfo';

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

export interface MyCagegoryDatasProps {
  comments: {
    id: number;
    content: string;
    created_at: string;
    board_type: string;
    like_count: number;
  }[];
  postings: {
    id: number;
    title: string;
    created_at: string;
    like_count: number;
    board_type: string;
    view_count: number;
  }[];
  scraps: {
    id: number;
    title: string;
    created_at: string;
    like_count: number;
    board_type: string;
    view_count: number;
  }[];
}

const categoryKeys: Array<keyof MyCagegoryDatasProps> = [
  'comments',
  'postings',
  'scraps'
];

export default function UserProfile() {
  const { userId } = useParams() as { userId: string };
  const [userProfileData, setUserProfileData] = useState<ProfileProps>();
  const [selectedTab, setSelectedTab] = useState<
    'postings' | 'comments' | 'bookmarks'
  >('postings');
  const navigate = useNavigate();
  const { category } = useParams();
  const [myCategoryDatas, setMyCategoryDatas] =
    useState<MyCagegoryDatasProps | null>(null);

  useEffect(() => {
    getUserInfo(Number(userId)).then((userInfo) => {
      if (!userInfo) {
        console.error('유저 정보가 없습니다.');
        return;
      }

      setUserProfileData(userInfo);
      console.log(userInfo);

      const filterdCategoryData = categoryKeys.reduce(
        (acc: Partial<MyCagegoryDatasProps>, key) => {
          if (userInfo[key]) {
            // userInfo[key]가 있는지 확인
            acc[key] = userInfo[key].reverse();
          }
          console.log(acc);
          return acc;
        },
        {} as Partial<MyCagegoryDatasProps>
      );

      setMyCategoryDatas(filterdCategoryData as MyCagegoryDatasProps);
    });

    if (category) {
      setSelectedTab(category as 'postings' | 'comments' | 'bookmarks');
      navigate(`/user-profile/${userId}/${category}`);
    } else {
      setSelectedTab('postings');
      navigate(`/user-profile/posts`);
    }
  }, [userId, category, navigate]);

  useEffect(() => {
    console.log(userProfileData);
  }, [userProfileData]);

  const handleTabChange = (tab: 'postings' | 'comments' | 'bookmarks') => {
    setSelectedTab(tab);
    navigate(`/user-profile/${userId}/${tab}`);
  };

  return (
    <Main>
      {userProfileData ? (
        <MyProfile {...userProfileData}></MyProfile>
      ) : (
        <Loading></Loading>
      )}
      <section>
        <NavTabs>
          <li
            onClick={() => handleTabChange('postings')}
            className={selectedTab === 'postings' ? 'isSelected' : ''}
          >
            My Posts
          </li>
          <li
            onClick={() => handleTabChange('comments')}
            className={selectedTab === 'comments' ? 'isSelected' : ''}
          >
            My Comments
          </li>
          <li
            onClick={() => handleTabChange('bookmarks')}
            className={selectedTab === 'bookmarks' ? 'isSelected' : ''}
          >
            My Bookmarks
          </li>
        </NavTabs>
        <CategoryWrapper>
          {myCategoryDatas ? (
            <MyDatas
              selectedTab={selectedTab}
              myCategoryDatas={myCategoryDatas}
            />
          ) : (
            <Loading />
          )}
        </CategoryWrapper>
      </section>
    </Main>
  );
}

const CategoryWrapper = styled.div`
  height: 100%;
  background-color: var(--hover-text);
`;

const NeedLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  font-size: 2rem;
`;

const Main = styled.main`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr 1.5fr;
  section {
    height: 100%;
  }
`;

const NavTabs = styled.ul`
  display: flex;
  padding-left: 5rem;
  li {
    width: 15rem;
    height: 4rem;
    border-radius: 5px 5px 0 0;
    color: var(--secondary-text);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.4rem;
    cursor: pointer;
    transition:
      background-color 0.3s,
      color 0.3s;
    &:hover {
      background-color: var(--hover-text);
      color: var(--primary-color);
    }
    &.isSelected {
      background-color: var(--hover-text);
      color: var(--primary-color);
    }
  }
`;
