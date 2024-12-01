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
          {boardType === 'market' && (
            <RepresentImage>
              {posting.images.length !== 0 ? (
                <div>
                  <img src={posting.images[0].image} />
                </div>
              ) : (
                <div></div>
              )}
            </RepresentImage>
          )}

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
                  <StyledHeartSVG></StyledHeartSVG> {posting.like_count}
                </span>
                {boardType !== 'market' && (
                  <>
                    <span>
                      <StyledEyeSVG></StyledEyeSVG> {posting.view_count}
                    </span>
                    <span>
                      <StyledCommentSVG></StyledCommentSVG>
                      {posting.comment_count}
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
    min-height: 8rem;
    cursor: pointer;

    @media screen and (min-width: 768px) {
      min-height: 9rem;
    }
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
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 10rem;
        font-weight: 500;
        font-size: 1.6rem;
        @media screen and (min-width: 330px) {
          width: 12rem;
        }
        @media screen and (min-width: 768px) {
          font-size: 2rem;
          width: 15rem;
        }

        @media screen and (min-width: 1024px) {
          width: auto;
        }
      }

      > div {
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--primary-color);
        color: white;

        width: 5rem;
        height: 1.75rem;
        font-size: 1.2rem;

        border-radius: 40rem;

        @media screen and (min-width: 768px) {
          width: 7rem;
          height: 2rem;
          font-size: 1.5rem;
        }
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
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    @media screen and (min-width: 768px) {
      font-size: 1.6rem;
    }
  }
`;

const PriceBox = styled.div`
  color: #2b2b2b;
  font-size: 1.6rem;
  font-weight: 500;

  @media screen and (min-width: 768px) {
    font-size: 2rem;
  }
`;

const RepresentImage = styled.div`
  width: 10rem;
  height: 10rem;
  @media screen and (min-width: 768px) {
    width: 13rem;
    height: 13rem;
  }
  background: lightGray;
  > div {
    > img {
      object-fit: cover;
      width: 10rem;
      height: 10rem;
      @media screen and (min-width: 768px) {
        width: 13rem;
        height: 13rem;
      }
    }
  }
`;

const StyledHeartSVG = styled(HeartSVG)`
  width: 1.6rem;

  @media screen and (min-width: 768px) {
    width: 2rem;
  }
`;

const StyledEyeSVG = styled(EyeSVG)`
  width: 1.6rem;

  @media screen and (min-width: 768px) {
    width: 2rem;
  }
`;

const StyledCommentSVG = styled(CommentSVG)`
  width: 1.6rem;

  @media screen and (min-width: 768px) {
    width: 2rem;
  }
`;
