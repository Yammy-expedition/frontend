import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Posting } from 'types/posting';
import { ReactComponent as EyeSVG } from '../../assets/icons/menu/eye.svg';
import { ReactComponent as MoreSVG } from '../../assets/icons/menu/more.svg';
import ReportModalPortal from 'components/portal/ReportModalPortal';
import { deletePosting } from 'utils/menu/deletePosting';
import { useNavigate } from 'react-router-dom';
import { postReport } from 'utils/common/postReport';

interface PostInfoTitleProps {
  posting: Posting;
  editting: boolean;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setEditting: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PostInfoTitle({
  posting,
  editting,
  title,
  setTitle,
  setEditting
}: PostInfoTitleProps) {
  const [more, setMore] = useState<boolean>(false);
  const moreRef = useRef<HTMLDivElement>(null);

  const [openReport, setOpenReport] = useState<boolean>(false);
  const [reportType, setReportType] = useState<string>('');
  const [reportReason, setReportReason] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMore(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (openReport) {
      document.body.style.overflow = 'hidden'; // 스크롤 비활성화
    } else {
      document.body.style.overflow = 'auto'; // 스크롤 활성화
    }

    return () => {
      document.body.style.overflow = 'auto'; // 컴포넌트 언마운트 시 스크롤 복원
    };
  }, [openReport]);

  const onClickReportInMore = () => {
    setOpenReport((prev) => !prev);
    setMore(false);
  };

  const onClickDelete = () => {
    deletePosting(posting.id.toString()).then(() => {
      navigate(`/menu/${posting.board_type}`, { replace: true });
    });
  };

  return (
    <PostHeader>
      <PostTitle>
        {editting ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <span>{posting.title}</span>
        )}
      </PostTitle>

      {!editting && (
        <PostInfo>
          <div>
            <span>{posting.writer_nickname}</span>
            <span>{posting.created_at.split('T')[0]}</span>
            <span>
              <EyeSVG></EyeSVG> {posting.view_count}
            </span>
          </div>
          <MoreDiv ref={moreRef} onClick={() => setMore((prev) => !prev)}>
            <span style={{ cursor: 'pointer' }}>
              <MoreSVG></MoreSVG>
            </span>
            {more &&
              (posting.is_mine ? (
                <div>
                  <div onClick={() => setEditting(true)}>Edit</div>
                  <div onClick={onClickDelete}>Delete</div>
                </div>
              ) : (
                <div>
                  <div onClick={onClickReportInMore}>Report</div>
                </div>
              ))}
          </MoreDiv>
        </PostInfo>
      )}

      {openReport && (
        <ReportModalPortal>
          <ReportModal onClick={() => setOpenReport(false)}>
            <div onClick={(e) => e.stopPropagation()}>
              <p>Report</p>
              <div>
                <div>Please select report type</div>
                <RadioWrapper>
                  <label>
                    <input
                      type="radio"
                      name="report_type"
                      value="SPAM"
                      onChange={(e) => setReportType(e.target.value)}
                    />
                    <span>Spam</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="report_type"
                      value="ABUSE"
                      onChange={(e) => setReportType(e.target.value)}
                    />
                    <span>Abuse</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="report_type"
                      value="ADULT"
                      onChange={(e) => setReportType(e.target.value)}
                    />
                    <span>Adult</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="report_type"
                      value="ILLEGAL"
                      onChange={(e) => setReportType(e.target.value)}
                    />
                    <span>Illegal</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="report_type"
                      value="OTHER"
                      onChange={(e) => setReportType(e.target.value)}
                    />
                    <span>Other</span>
                  </label>
                </RadioWrapper>

                <WriteReason>
                  <p>Reason</p>
                  <textarea
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                  ></textarea>
                </WriteReason>
              </div>

              <ReportButtonWrapper>
                <ReportButton
                  onClick={() =>
                    postReport(
                      'POSTING',
                      posting.id.toString(),
                      reportType,
                      reportReason,
                      setOpenReport
                    )
                  }
                >
                  Submit
                </ReportButton>
              </ReportButtonWrapper>
            </div>
          </ReportModal>
        </ReportModalPortal>
      )}
    </PostHeader>
  );
}

const PostHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 6rem;
`;

const PostTitle = styled.p`
  font-size: 2.5rem;
  font-weight: 500;

  > input {
    font-size: 2.5rem;
    width: 100%;
    height: 5rem;
    padding: 1.3rem;
  }
`;

const PostInfo = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--secondary-text);

  > div {
    display: flex;
    gap: 2rem;
    > span {
    font-size: 1.6rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const MoreDiv = styled.div`
  position: relative;

  > div {
    background: white;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    top: 2.5rem;
    right: 0;
    width: 5rem;

    > div {
      &:hover {
        background: var(--main-gray);
      }
      border: 1px solid var(--border-color);
      cursor: pointer;
      display: flex;

      align-items: center;
      height: 100%;
      padding: 0.75rem;
    }
  }
`;

const ReportModal = styled.div`
  position: fixed;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
  width: 100vw;
  height: 100vh;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 0.5rem;
    width: 40rem;
    height: 50rem;
    padding: 3rem;
    background: white;

    > p {
      font-family: var(--sub-font);
      color: var(--primary-color);
      font-size: 4rem;
      font-weight: 600;
      margin-bottom: 4rem;
    }

    > div {
      width: 100%;
      font-size: 2.5rem;
      > div {
        margin-bottom: 1rem;
      }
    }
  }
`;

const RadioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  font-size: 1.5rem;
  > label {
    display: block;
  }
`;

const WriteReason = styled.div`
  > p {
    margin-bottom: 1rem;
  }
  > textarea {
    resize: none;
    width: 100%;
    height: 7rem;
  }
`;

const ReportButtonWrapper = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
`;

const ReportButton = styled.button`
  width: 12rem;
  height: 5rem;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #d6d6d6;
  background: var(
    --vertical-gradient,
    linear-gradient(180deg, #b21f7c 22.5%, #4c0d0f 100%)
  );
  color: white;
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;
`;
