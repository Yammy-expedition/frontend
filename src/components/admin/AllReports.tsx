import { instance } from 'api/instance';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export interface ReportType {
  id: number;
  reporter: number;
  target_user: number;
  report_type: string;
  content_type: string;
  object_id: number;
  reason: string;
  reported_at: string;
  status: string;
}

export default function AllReports() {
  const [reports, setReports] = useState<ReportType[]>([]);
  const [reportType, setReportType] = useState<string>('yes');
  const navigate = useNavigate();

  useEffect(() => {
    const getAllReports = async () => {
      const response = await instance.get('/admin-api/report');
      setReports(response.data);
    };
    const getNoReports = async () => {
      const response = await instance.get('/admin-api/report?all=no');
      setReports(response.data);
    };

    if (reportType === 'yes' || !reportType) {
      setReportType('yes');
      getAllReports();
    } else {
      setReportType('no');
      getNoReports();
    }
  }, [reportType]);
  const handleTabClick = (value: string) => {
    setReportType(value);
    setReportType(value);
  };
  return (
    <Wrapper>
      <h1>신고내역 관리</h1>
      <Buttons>
        <Button
          $islocation={reportType === 'yes'}
          onClick={() => handleTabClick('yes')}
        >
          전체 신고
        </Button>
        <Button
          $islocation={reportType === 'no'}
          onClick={() => handleTabClick('no')}
        >
          미처리 신고
        </Button>
      </Buttons>
      <div>
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>신고한 유저</th>
              <th>신고대상 유저</th>
              <th>신고유형</th>
              <th>카테고리</th>
              <th>신고 일시</th>
            </tr>
          </thead>
          <tbody>
            {reports?.map((report, idx) => (
              <tr
                onClick={() => navigate(`/admin/reports/${report.id}`)}
                key={idx}
              >
                <td>{idx + 1}</td>
                <td>{report.reporter}</td>
                <td>{report.target_user}</td>
                <td>{report.report_type}</td>
                <td>{report.content_type}</td>
                <td>{dayjs(report.reported_at).format('YY-MM-DD HH:mm')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
}

const Button = styled.button<{ $islocation?: boolean }>`
  padding: 1rem 3rem;
  background-color: ${({ $islocation }) =>
    $islocation ? 'var(--secondary-color)' : 'var(--main-gray)'};
  border: none;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 1rem;
`;
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
