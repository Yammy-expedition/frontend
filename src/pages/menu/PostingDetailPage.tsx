import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Posting } from 'types/posting';
import { getPostingDetail } from 'utils/menu/getPostingDetail';
import { postPostingViewCount } from 'utils/menu/postPostingViewCount';
import { patchPosting } from 'utils/menu/patchPosting';
import PostInfoTitle from './PostInfoTitle';
import PostContent from './PostContent';
import PostComment from './PostComment';

export default function PostingDetailPage() {
  const location = useLocation();
  const state = location.state as {
    posting: Posting;
    boardType: string;
    pageName: string;
  };

  const { postingId } = useParams();
  const [posting, setPosting] = useState<Posting>();
  const [comments, setComments] = useState<Posting['comments']>([]);
  const [like, setLike] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  const [editting, setEditting] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  const [comment, setComment] = useState<string>('');

  useEffect(() => {
    getPostingDetail(postingId, setPosting).then((result) => {
      console.log(result);
      setComments(result.comments);
      setLike(result.is_liked),
        setLikeCount(result.like_count),
        setTitle(result.title);
      setContent(result.content);
    });
    postPostingViewCount(postingId);
  }, []);

  const onClickSave = () => {
    patchPosting(postingId, title, content, price).then(() =>
      window.location.reload()
    );
  };

  if (!posting) {
    return <></>;
  }
  return (
    <PostingDetailContainer>
      <PageNameBox>
        <p>{state.pageName}</p>
      </PageNameBox>

      <PostInfoTitle
        posting={posting}
        editting={editting}
        title={title}
        setTitle={setTitle}
        setEditting={setEditting}
      ></PostInfoTitle>

      {!editting && <LineGradient></LineGradient>}

      <PostContent
        posting={posting}
        editting={editting}
        content={content}
        setContent={setContent}
        like={like}
        setLike={setLike}
        likeCount={likeCount}
        setLikeCount={setLikeCount}
        setEditting={setEditting}
        onClickSave={onClickSave}
      ></PostContent>

      {!editting && <LineGradient></LineGradient>}
      {!editting && (
        <PostComment
          posting={posting}
          comments={comments}
          comment={comment}
          setComment={setComment}
          setComments={setComments}
        ></PostComment>
      )}
    </PostingDetailContainer>
  );
}

const PostingDetailContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 5.5rem 4.5rem;
`;

const PageNameBox = styled.div`
  > p {
    font-family: var(--sub-font);
    color: var(--primary-color);
    font-weight: 600;
    font-size: 5rem;
  }
`;

const LineGradient = styled.div`
  margin-top: 5rem;
  height: 0.1rem;
  background-image: var(--line-gradient);
  transform: rotate(180deg);
`;
