import { useEffect } from 'react';
import styled from 'styled-components';

export default function MyProfile() {
  //유저 정보 가져오기
  //   useEffect(() => {}, []);
  return (
    <Section>
      <header>
        <HeaderProfileBox>
          <figure>
            <img src="" alt="profile" />
          </figure>
          <div>
            <h1>닉네임</h1>
            <p>국적</p>
          </div>
        </HeaderProfileBox>
        <button>edit</button>
      </header>
      <DetailInfo></DetailInfo>
    </Section>
  );
}

const HeaderProfileBox = styled.div``;

const Section = styled.section`
  width: 100%;
  height: 40%;
  background-color: red;
  padding: 2rem 3rem;
`;

const DetailInfo = styled.div``;
