import { useEffect, useState } from 'react';
import MyProfile, { ProfileProps } from 'components/my-page/MyProfile';
import styled from 'styled-components';
import { jwtDecode } from 'jwt-decode';
import Loading from 'components/common/Loading';
import { instance } from 'api/instance';
import { useNavigate, useParams } from 'react-router-dom';
import MyDatas, { MyCagegoryDatasProps } from 'components/my-page/MyDatas';

interface DecodedToken {
  user_id: number;
}

//MyProfile에 넘겨줄 키값들이다.
const profileKeys: Array<keyof ProfileProps> = [
  'birth',
  'email',
  'end_date',
  'start_date',
  'followings',
  'followers_count',
  'id',
  'introduce',
  'languages',
  'major',
  'mbti',
  'nationality',
  'nickname',
  'profile_image',
  'sex',
  'univ_certified'
];

const categoryKeys: Array<keyof MyCagegoryDatasProps> = [
  'comments',
  'postings',
  'scraps'
];

export default function MyPage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<number | null>(null);
  const [myprofileData, setMyProfileData] = useState<ProfileProps | null>(null);
  const [myCategoryDatas, setMyCategoryDatas] =
    useState<MyCagegoryDatasProps | null>(null);
  const [selectedTab, setSelectedTab] = useState<
    'postings' | 'comments' | 'bookmarks'
  >('postings');
  const { category } = useParams();

  //초기 세팅 : JWT 토큰, 탭 설정
  useEffect(() => {
    //JWT 토큰을 사용해서 현 로그인 유저의 유저 아이디를 가져온다.
    try {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
        setUserId(decoded.user_id);
      }
    } catch (error) {
      console.error('JWT decoding error:', error);
    }

    //탭 설정
    if (category) {
      setSelectedTab(category as 'postings' | 'comments' | 'bookmarks');
      navigate(`/my-page/${category}`);
    } else {
      setSelectedTab('postings');
      navigate(`/my-page/posts`);
    }
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }
    // 유저 아이디를 사용해서 유저 정보를 가져온다.
    const findUser = async () => {
      try {
        const response = await instance.get(`/user/${userId}`);
        // 마이 프로필 컴포넌트에 넘겨줄 데이터를 설정
        //Partial을 쓰면 일부값만 있어도 된다.
        const filteredData = profileKeys.reduce(
          (acc: Partial<ProfileProps>, key) => {
            if (key in response.data) {
              acc[key] = response.data[key];
            }
            return acc;
          },
          {} as Partial<ProfileProps>
        );
        setMyProfileData(filteredData as ProfileProps);

        // 마이 카테고리 데이터를 설정
        const filterdCategoryData = categoryKeys.reduce(
          (acc: Partial<MyCagegoryDatasProps>, key) => {
            if (key in response.data) {
              acc[key] = response.data[key];
            }
            return acc;
          },
          {} as Partial<MyCagegoryDatasProps>
        );
        setMyCategoryDatas(filterdCategoryData as MyCagegoryDatasProps);
      } catch (e) {
        console.error('findUser error:', e);
      }
    };
    findUser();
  }, [userId]);

  //로그인이 안되어있을 경우
  if (userId === null) {
    return <NeedLogin>You have to Sign in</NeedLogin>;
  }

  const handleTabChange = (tab: 'postings' | 'comments' | 'bookmarks') => {
    setSelectedTab(tab);
    navigate(`/my-page/${tab}`);
  };

  return (
    <Main>
      {myprofileData ? <MyProfile {...myprofileData} /> : <Loading />}
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
