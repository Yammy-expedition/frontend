import { instance } from 'api/instance';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import Loading from 'components/common/Loading';
import { ReactComponent as LinkIcon } from 'assets/icons/admin/link.svg';
import AdminModalPortal from 'components/portal/AdminModalPortal';
import ReportModal from './ReportModal';

export interface ReportDetailType {
  id: number;
  reporter: number;
  target_user: number;
  report_type: string;
  content_type: string;
  object_id: number;
  reason: string;
  reported_at: string;
  status: string;
  reported_object: {
    board_type: string;
    bookmark_count: number;
    comment_count: number;
    comments: [];
    content: string;
    created_at: string;
    id: number;
    images: { id: number; image: string }[];
    is_bookmarked: boolean;
    is_liked: boolean;
    is_mine: boolean;
    like_count: number;
    price: number;
    status: string;
    title: string;
    view_count: number;
    writer_id: number;
    writer_nickname: string;
  };
}

export default function ReportDetail() {
  const { reportId } = useParams();
  const [report, setReport] = useState<ReportDetailType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSubmitClick = async (Bool: boolean) => {
    if (Bool) {
      setIsModalOpen(true);
    } else {
      try {
        setIsLoading(true);
        await instance.post(`/admin-api/report/${reportId}`, {
          approve: Bool,
          detail: ''
        });
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    const getReportDetail = async () => {
      try {
        const response = await instance.get(`/admin-api/report/${reportId}`);
        console.log(response.data);
        setReport(response.data);
      } catch (e) {
        console.error(e);
      }
    };
    getReportDetail();
  }, []);

  return (
    <Wrapper>
      <h1>◼︎ 신고 세부 내용</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>신고 ID</th>
              <th>신고한 유저</th>
              <th>신고대상 유저</th>
              <th>신고유형</th>
              <th>카테고리</th>
              <th>신고 일시</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{report?.id}</td>
              <td>{report?.reporter}</td>
              <td>{report?.target_user}</td>
              <td>{report?.report_type}</td>
              <td>{report?.content_type}</td>
              <td>{dayjs(report?.reported_at).format('YY-MM-DD HH:mm')}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <ContentDetail>
        <h2>
          ◼︎ 신고 받은 게시글{' '}
          <a
            target="blank"
            href={`https://unicon-one.vercel.app/posting/${report?.object_id}`}
          >
            <LinkIcon />
          </a>
        </h2>
        <div>
          <DetailTable>
            <tbody>
              <tr>
                <th>게시글 ID</th>
                <td>{report?.reported_object.id}</td>
              </tr>
              <tr>
                <th>게시글 제목</th>
                <td>{report?.reported_object.title}</td>
              </tr>
              <tr>
                <th>게시글 내용</th>
                <td>{report?.reported_object.content}</td>
              </tr>
              <tr>
                <th>작성자</th>
                <td>{report?.reported_object.writer_nickname}</td>
              </tr>
              <tr>
                <th>작성일</th>
                <td>
                  {dayjs(report?.reported_object.created_at).format(
                    'YY-MM-DD HH:mm'
                  )}
                </td>
              </tr>
              <tr>
                <th>조회수</th>
                <td>{report?.reported_object.view_count}</td>
              </tr>
              <tr>
                <th>좋아요 수</th>
                <td>{report?.reported_object.like_count}</td>
              </tr>
              <tr>
                <th>댓글 수</th>
                <td>{report?.reported_object.comment_count}</td>
              </tr>
              <tr>
                <th>북마크 수</th>
                <td>{report?.reported_object.bookmark_count}</td>
              </tr>
            </tbody>
          </DetailTable>
        </div>
      </ContentDetail>
      <ReportReason>
        <h2>◼︎ 신고 사유</h2>
        <p>{report?.reason}</p>
      </ReportReason>
      <Buttons>
        <button onClick={() => handleSubmitClick(true)}>
          {isLoading ? <Loading /> : '신고 접수'}
        </button>
        <button onClick={() => handleSubmitClick(false)}>신고 반려</button>
      </Buttons>
      {isModalOpen && (
        <AdminModalPortal>
          <ReportModal setIsModalOpen={setIsModalOpen} reportId={reportId} />
        </AdminModalPortal>
      )}
    </Wrapper>
  );
}

const Buttons = styled.div`
  display: flex;
  gap: 1rem;
  button {
    padding: 1rem 2rem;
    background-color: #f0f0f0;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    font-weight: 700;
    &:first-child {
      background-color: var(--secondary-color);
    }
    &:last-child {
      background-color: var(--main-gray);
    }
    &:hover {
      color: var(--hover-text);
      background-color: var(--hover-bg);
    }
    &:active {
      scale: 0.95;
    }
  }
`;
const ReportReason = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  h2 {
    font-size: 2rem;
    font-weight: 300;
  }
  p {
    border-radius: 5px;
    width: 85%;
    background-color: var(--main-gray);
    font-size: 1.6rem;
    padding: 2rem 2rem;
  }
`;

const Wrapper = styled.div`
  overflow-y: scroll;
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
      }
      td {
        border-bottom: 1px solid #333;
        padding: 2rem 1rem;
        text-align: left;
      }
    }
  }
`;

const DetailTable = styled.table`
  width: 100%;
  display: flex;
  padding: 0;
  border: 1px solid var(--hover-bg);
  border-bottom: none;
  tbody {
    width: 100%;
    tr {
      display: grid;
      grid-template-columns: 10rem 3fr;
      th {
        display: flex;
        border-right: 1px solid var(--hover-bg);
        border-bottom: 1px solid var(--hover-bg);
        padding: 1rem 1rem;
        font-size: 1.6rem;
        font-weight: 700;
      }
      td {
        display: flex;
        align-items: center;
        padding: 0.5rem 1rem;
        font-size: 1.6rem;
        word-wrap: break-word;
      }
    }
  }
`;

const ContentDetail = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 1rem;
  h2 {
    display: flex;
    gap: 1rem;
    align-items: center;
    font-size: 2rem;
    font-weight: 300;
    svg {
      width: 1.8rem;
      height: 1.8rem;
      cursor: pointer;
      &:hover {
        opacity: 0.7;
      }
    }
  }
  div {
    display: flex;
    border-radius: 5px;
    max-width: 85%;
    font-size: 1.6rem;
    padding: 2rem 0rem;
  }
`;
