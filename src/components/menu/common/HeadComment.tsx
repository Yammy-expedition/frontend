import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Comment } from 'types/comment';
import { ReactComponent as EmptyLikeSVG } from '../../../assets/icons/menu/emptyLike.svg';
import { ReactComponent as FilledLikeSVG } from '../../../assets/icons/menu/filledLike.svg';
import { ReactComponent as CommentSVG } from '../../../assets/icons/menu/comment.svg';
import { ReactComponent as SmallMoreSVG } from '../../../assets/icons/menu/smallMore.svg';
import { postCommentLike } from 'utils/menu/postCommentLike';

interface HeadCommentProps {
  comment: Comment;
}

export default function HeadComment({ comment }: HeadCommentProps) {
  const [like, setLike] = useState<boolean>(false);
  const [likeCont, setLikeCount] = useState<number>(comment.like_count);

  const onClickCommentLike = () => {
    setLike((prev) => !prev);
    if (like) {
      setLikeCount((prev) => prev - 1);
    } else setLikeCount((prev) => prev + 1);

    postCommentLike(comment.id);
  };

  useEffect(() => {
    setLike(comment.is_liked);
  }, []);
  return (
    <CommentContainer>
      <ProfileBox>프로필 이미지</ProfileBox>
      <div>
        <CommentInfoBox>
          <UserName>{comment.user_name}</UserName>
          <Content>{comment.content}</Content>
          <CreatedAt>{comment.created_at.split('T')[0]}</CreatedAt>
        </CommentInfoBox>
        <InteractingBox>
          <LikeDiv onClick={onClickCommentLike}>
            {like ? (
              <FilledLikeSVG style={{ width: '1.5rem' }}></FilledLikeSVG>
            ) : (
              <EmptyLikeSVG style={{ width: '1.5rem' }}></EmptyLikeSVG>
            )}
            <div>{likeCont}</div>
          </LikeDiv>

          <CommentSVGWrapper>
            <CommentSVG style={{ width: '1.5rem' }}></CommentSVG>
          </CommentSVGWrapper>

          <MoreSVGWrapper>
            <SmallMoreSVG style={{ height: '1.5rem' }}></SmallMoreSVG>
          </MoreSVGWrapper>
        </InteractingBox>
      </div>
    </CommentContainer>
  );
}

const CommentContainer = styled.div`
  margin-bottom: 1rem;
`;

const ProfileBox = styled.div``;

const CommentInfoBox = styled.div``;

const InteractingBox = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const UserName = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 3rem;
  color: var(--primary-color);
  font-size: 1.5rem;
  font-weight: 300;
`;

const Content = styled.div`
  height: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 300;
`;
const CreatedAt = styled.div`
  display: flex;
  height: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #979797;
  font-size: 1.1rem;
  font-weight: 300;
`;

const LikeDiv = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CommentSVGWrapper = styled.div`
  cursor: pointer;
`;

const MoreSVGWrapper = styled.div`
  cursor: pointer;
`;