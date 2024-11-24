import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Posting } from 'types/posting';
import { getPostingDetail } from 'utils/getPostingDetail';
import { ReactComponent as EyeSVG } from '../../assets/icons/eye.svg';
import { ReactComponent as MoreSVG } from '../../assets/icons/more.svg';
import { ReactComponent as LikeSVG } from '../../assets/icons/like.svg';
import { postPostingViewCount } from 'utils/postPostingViewCount';
import { postPostingLike } from 'utils/postPostingLike';
import '../../../node_modules/react-quill-new/dist/quill.snow.css';
import ReactQuill from 'react-quill-new';

export default function PostingDetailPage() {
  const location = useLocation();
  const state = location.state as { boardType: string; posting: Posting };
  const { postingId } = useParams();
  const [posting, setPosting] = useState<Posting>();
  const [like, setLike] = useState<boolean>(false);

  useEffect(() => {
    getPostingDetail(postingId, setPosting);
    postPostingViewCount(postingId);
  }, []);

  if (!posting) {
    return <></>;
  }
  return (
    <PostingDetailContainer>
      <PageNameBox>
        <p>{state.boardType}</p>
      </PageNameBox>

      <PostHeader>
        <PostTitle>{posting.title}</PostTitle>

        <PostInfo>
          <div>
            <span>{posting.writer_nickname}</span>
            <span>{posting.created_at.split('T')[0]}</span>
            <span>
              <EyeSVG></EyeSVG> {posting.view_count}
            </span>
          </div>
          <div>
            <span style={{ cursor: 'pointer' }}>
              <MoreSVG></MoreSVG>
            </span>
          </div>
        </PostInfo>
      </PostHeader>

      <LineGradient></LineGradient>

      <PostContentBox>
        <Content>
          <CustomReactQuill
            value={posting.content}
            readOnly={true}
            theme="snow"
            modules={{ toolbar: false }}
            style={{ border: 'none' }}
          />
        </Content>
        <LikeWrapper>
          <div onClick={() => postPostingLike(postingId, setLike)}>
            <LikeSVG></LikeSVG>
          </div>
          <p>{posting.like_count}</p>
        </LikeWrapper>
      </PostContentBox>

      <LineGradient></LineGradient>

      <PostCommentBox>
        <p>
          Comment <span>{posting.comment_count}</span>
        </p>
      </PostCommentBox>
    </PostingDetailContainer>
  );
}

const PostingDetailContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 6.5rem 4.5rem;
`;

const PageNameBox = styled.div`
  > p {
    font-family: var(--sub-font);
    color: var(--primary-color);
    font-weight: 600;
    font-size: 5rem;
  }
`;

const PostHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 6rem;
  margin-bottom: 3rem;
`;

const PostTitle = styled.p`
  font-size: 2.5rem;
  font-weight: 500;
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

const LineGradient = styled.div`
  height: 0.1rem;
  background-image: var(--line-gradient);
  transform: rotate(180deg);
`;

const PostContentBox = styled.div`
  margin-top: 3.5rem;
  margin-bottom: 3.5rem;
  font-size: 3rem;
`;

const Content = styled.div`
  margin-bottom: 6rem;
`;

const LikeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 7.5rem;
    height: 7.5rem;
    background: #979797;
    border-radius: 100%;
  }

  > p {
    font-size: 1.6rem;
    font-weight: 600;
  }
`;

const PostCommentBox = styled.div`
  padding: 1.5rem 2.5rem;

  > p {
    font-size: 1.5rem;
    font-weight: 300;

    > span {
      color: var(--primary-color);
      font-weight: 400;
    }
  }
`;

const CustomReactQuill = styled(ReactQuill)`
  & .ql-container {
    border: none;
  }

  & .ql-editor strong {
    font-weight: bold;
  }

  & .ql-editor em {
    font-style: italic;
  }
`;
