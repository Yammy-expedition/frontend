import React from 'react';
import styled from 'styled-components';
import { ReactComponent as HeartSVG } from '../../../assets/icons/menu/heart.svg';
import { ReactComponent as EyeSVG } from '../../../assets/icons/menu/eye.svg';
import { ReactComponent as CommentSVG } from '../../../assets/icons/menu/comment.svg';
import { useNavigate } from 'react-router-dom';
import { Posting } from 'types/posting';

interface PostingListProps {
  postings: Posting[] | undefined;
}

export default function PostingList({ postings }: PostingListProps) {
  const navigate = useNavigate();
  return (
    <PostingContainer>
      {postings?.map((posting, index) => (
        <EachPost
          key={index}
          onClick={() =>
            navigate(`/posting-detail/${posting.id}`, {
              state: { boardType: 'General Dicsussion', posting: posting }
            })
          }
        >
          <p>{posting.title}</p>
          <PostInfo>
            <span>{posting.writer_nickname}</span>
            <span>{posting.created_at.split('T')[0]}</span>
            <span>
              <HeartSVG></HeartSVG> {posting.like_count}
            </span>
            <span>
              <EyeSVG></EyeSVG> {posting.view_count}
            </span>
            <span>
              <CommentSVG></CommentSVG> {posting.comment_count}
            </span>
          </PostInfo>
        </EachPost>
      ))}
    </PostingContainer>
  );
}

const PostingContainer = styled.div``;

const EachPost = styled.div`
  padding: 2rem 0;
  border-bottom: 1px solid var(--secondary-text);
  font-family: var(--main-font);
  cursor: pointer;
  > p {
    width: 50rem;
    height: 3rem;
    font-size: 2rem;
    font-weight: 500;
  }
`;

const PostInfo = styled.div`
  color: var(--secondary-text);
  display: flex;
  align-items: center;
  gap: 1rem;
  > span {
    font-size: 1.6rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;
