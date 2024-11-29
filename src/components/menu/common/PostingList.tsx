import React from 'react';
import styled from 'styled-components';
import { ReactComponent as HeartSVG } from '../../../assets/icons/menu/heart.svg';
import { ReactComponent as EyeSVG } from '../../../assets/icons/menu/eye.svg';
import { ReactComponent as CommentSVG } from '../../../assets/icons/menu/comment.svg';
import { useNavigate } from 'react-router-dom';
import { Posting } from 'types/posting';

interface PostingListProps {
  postings: Posting[] | undefined;
  boardType: string;
  pageName: string;
}

export default function PostingList({
  postings,
  boardType,
  pageName
}: PostingListProps) {
  const navigate = useNavigate();

  return (
    <PostingContainer>
      {postings?.map((posting, index) => (
        <div
          key={index}
          onClick={() =>
            navigate(`/posting-detail/${posting.id}`, {
              state: {
                posting: posting,
                boardType: boardType,
                pageName: pageName
              }
            })
          }
        >
          {boardType === 'market' && <RepresentImage></RepresentImage>}

          <EachPost>
            <div>
              <div>
                <p>{posting.title}</p>
                {posting.board_type === 'market' && (
                  <div>
                    {posting.status === 'FOR_SALE' ? 'on sale' : 'sold out'}
                  </div>
                )}
              </div>

              <PostInfo>
                <span>{posting.writer_nickname}</span>
                <span>{posting.created_at.split('T')[0]}</span>
                <span>
                  <HeartSVG></HeartSVG> {posting.like_count}
                </span>
                {boardType !== 'market' && (
                  <>
                    <span>
                      <EyeSVG></EyeSVG> {posting.view_count}
                    </span>
                    <span>
                      <CommentSVG></CommentSVG> {posting.comment_count}
                    </span>
                  </>
                )}
              </PostInfo>
            </div>
            {boardType === 'market' && (
              <PriceBox>
                {Number(posting.price).toLocaleString('ko-KR')}won
              </PriceBox>
            )}
          </EachPost>
        </div>
      ))}
    </PostingContainer>
  );
}

const PostingContainer = styled.div`
  > div {
    display: flex;
    border-bottom: 1px solid var(--secondary-text);
    gap: 1.5rem;
    padding: 1rem 0;
    min-height: 9rem;
    cursor: pointer;
  }
`;

const EachPost = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  font-family: var(--main-font);
  cursor: pointer;
  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    > div {
      display: flex;
      align-items: center;

      gap: 1rem;
      > p {
        font-size: 2rem;
        font-weight: 500;
      }

      > div {
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--primary-color);
        color: white;
        width: 7rem;
        height: 2rem;
        font-size: 1.5rem;
        border-radius: 40rem;
      }
    }
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

const PriceBox = styled.div`
  color: #2b2b2b;
  font-size: 2rem;
  font-weight: 500;
`;

const RepresentImage = styled.div`
  min-width: 13rem;
  height: 13rem;
  background: pink;
`;
