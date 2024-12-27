import { instance } from 'api/instance';
import AdminModalPortal from 'components/portal/AdminModalPortal';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import AdminModal from './AdminModal';

interface UserType {
  id: number;
  image: string;
  created_at: string;
  status: string;
  user: {
    nickname: string;
  };
}

export default function AllUsers() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [sendData, setSendData] = useState({
    id: 0,
    image: ''
  });
  useEffect(() => {
    const getUserList = async () => {
      const response = await instance.get('/admin-api/verify');
      setUsers(response.data);
    };
    getUserList();
  }, []);

  const handleBtnClick = (id: number, image: string) => {
    setIsModalOpen(true);
    setSendData({
      id: id,
      image: image
    });
  };

  return (
    <Wrapper>
      <h1>회원가입 관리</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>ID</th>
              <th>실명</th>
              <th>증명사진</th>
              <th>가입일시</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, idx) => (
              <tr key={user.id}>
                <td>{idx + 1}</td>
                <td>{user.id}</td>
                <td>{user.user.nickname}</td>
                <td>
                  <button onClick={() => handleBtnClick(user.id, user.image)}>
                    확인
                  </button>
                </td>
                <td>{dayjs(user.created_at).format('YY-MM-DD HH:mm')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <AdminModalPortal>
          <AdminModal sendData={sendData} setIsModalOpen={setIsModalOpen} />
        </AdminModalPortal>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 2rem;
    font-weight: 300;
    padding: 4rem 0 1rem 4rem;
  }
  div {
    width: 100%;
    padding: 1rem 4rem;
    table {
      width: 85%;
      thead {
        border-top: 1px solid #333;
        border-bottom: 1px solid #333;
        th {
          font-size: 1.5rem;
          padding: 2rem 1rem;
          text-align: left;
          background-color: var(--secondary-color);
        }
      }
      tr {
        font-size: 1.6rem;
        &:hover {
          background-color: var(--hover-text);
        }
      }
      td {
        border-bottom: 1px solid #333;
        padding: 2rem 1rem;
        text-align: left;
        button {
          background-color: var(--secondary-color);
          border: none;
          padding: 0.5rem 2rem;
          border-radius: 5px;
          cursor: pointer;
          &:hover {
            color: white;
            background-color: var(--hover-bg);
          }
          &:active {
            scale: 0.9;
          }
        }
      }
    }
  }
`;
