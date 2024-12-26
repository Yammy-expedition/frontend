import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as UserIcon } from 'assets/icons/admin/user.svg';
import { ReactComponent as ReportsIcon } from 'assets/icons/admin/report.svg';
import { ReactComponent as MinusUserIcon } from 'assets/icons/admin/minusUser.svg';

export default function AdminSideBar() {
  const navigate = useNavigate();
  return (
    <Section>
      <TitleBox>
        <img
          src="https://img.freepik.com/premium-vector/man-professional-business-casual-young-avatar-icon-illustration_1277826-622.jpg"
          alt="profile"
        />
        <span>관리자</span>
      </TitleBox>
      <Nav>
        <ul>
          <li>
            <span>
              <UserIcon />
              회원가입 관리
            </span>
          </li>
          <li>
            <span>
              <ReportsIcon />
              신고 관리
            </span>
          </li>
          <li>
            <span>
              <MinusUserIcon />
              신고 회원 관리
            </span>
          </li>
        </ul>
      </Nav>
    </Section>
  );
}

const Nav = styled.nav`
  ul {
    list-style: none;
    li {
      font-size: 1.6rem;
      padding: 2rem;
      cursor: pointer;
      border-bottom: 1px solid var(--border-color);
      transition: background-color 0.3s;
      cursor: pointer;
      &:hover {
        background-color: var(--border-color);
      }
      span {
        display: flex;
        gap: 1rem;
        align-items: center;
      }
      svg {
        fill: var(--secondary-color);
        width: 2rem;
        height: 2rem;
      }
    }
  }
`;

const TitleBox = styled.div`
  width: 100%;
  height: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: 2rem;
  background-color: var(--secondary-color);
  img {
    border: 1px solid var(--hover-bg);
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
  }
`;

const Section = styled.section`
  background-color: var(--hover-text);
  width: 20rem;
  height: 100vh;
  box-shadow: rgba(99, 99, 99, 0.1) 0px 2px 8px 0px;
`;
