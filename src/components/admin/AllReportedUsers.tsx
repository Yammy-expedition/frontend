import { instance } from 'api/instance';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface ReportedUserType {
  user_id: number;
  nickname: string;
  email: string;
  report_count: number;
  latest_report: string;
}

export default function AllReportedUsers() {
  const [reportedUsers, setReportedUsers] = useState<ReportedUserType[]>([]);
  useEffect(() => {
    const getAllReportedUsers = async () => {
      const response = await instance.get('/admin-api/report/statistics');
      setReportedUsers(response.data);
    };
    getAllReportedUsers();
  }, []);

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
              <th>신고 횟수</th>
              <th>신고 일시</th>
              <th>이메일</th>
            </tr>
          </thead>
          <tbody>
            {reportedUsers?.map((user, idx) => (
              <tr key={user.user_id}>
                <td>{idx + 1}</td>
                <td>{user.user_id}</td>
                <td>{user.nickname}</td>
                <td>{user.report_count}</td>
                <td>{dayjs(user.latest_report).format('YY-MM-DD HH:mm')}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
