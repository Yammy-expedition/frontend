import React, { useEffect, useState } from 'react';
import MyProfile, { ProfileProps } from 'components/my-page/MyProfile';
import styled from 'styled-components';
import { jwtDecode } from 'jwt-decode';
import Loading from 'components/common/Loading';
import { instance } from 'api/instance';

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

export default function MyPage() {
  const [userId, setUserId] = useState<number | null>(null);
  const [myprofileData, setMyProfileData] = useState<ProfileProps | null>(null);

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
      } catch (e) {
        console.error('findUser error:', e);
      }
    };
    findUser();
  }, [userId]);

  if (userId === null) {
    return <>로그인을 해주세요</>;
  }

  return (
    <Main>
      {myprofileData ? <MyProfile {...myprofileData} /> : <Loading />}
      <section>
        <NavTabs></NavTabs>
      </section>
    </Main>
  );
}

const Main = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const NavTabs = styled.nav``;
