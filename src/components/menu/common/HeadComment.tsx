import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Comment } from 'types/comment';
import { ReactComponent as EmptyLikeSVG } from '../../../assets/icons/menu/emptyLike.svg';
import { ReactComponent as FilledLikeSVG } from '../../../assets/icons/menu/filledLike.svg';
import { ReactComponent as CommentSVG } from '../../../assets/icons/menu/comment.svg';
import { ReactComponent as SmallMoreSVG } from '../../../assets/icons/menu/smallMore.svg';
import { postCommentLike } from 'utils/menu/postCommentLike';
import { postCommentReply } from 'utils/menu/postCommentReply';
import ReplyComment from './ReplyComment';
import { ReactComponent as ReplySVG } from '../../../assets/icons/menu/reply.svg';

interface HeadCommentProps {
  comment: Comment;
  postingId: string | undefined;
}

export default function HeadComment({ comment, postingId }: HeadCommentProps) {
  const [like, setLike] = useState<boolean>(false);
  const [likeCont, setLikeCount] = useState<number>(comment.like_count);
  const [showReplyBox, setShowReplyBox] = useState<boolean>(false);
  const [reply, setReply] = useState<string>('');
  const [replies, setReplies] = useState<Comment[]>(comment.replies);

  const onClickCommentLike = () => {
    setLike((prev) => !prev);
    if (like) {
      setLikeCount((prev) => prev - 1);
    } else setLikeCount((prev) => prev + 1);

    postCommentLike(comment.id);
  };

  const onClickSubmitComment = () => {
    postCommentReply(postingId, reply, comment.id).then((newReply) => {
      setReplies((prevReplies) => [...prevReplies, newReply]);
      setReply('');
      setShowReplyBox(false);
    });
  };

  const onKeyDownReply = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // 줄바꿈 방지
      onClickSubmitComment(); // 댓글 제출
    }
  };

  useEffect(() => {
    setLike(comment.is_liked);
  }, []);
  return (
    <CommentContainer>
      <div>
        <ProfileBox>
          <figure>
            <div>
              <img src={`${comment.profile_image}`} />
            </div>
          </figure>
        </ProfileBox>
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

            <CommentSVGWrapper onClick={() => setShowReplyBox((prev) => !prev)}>
              <CommentSVG style={{ width: '1.5rem' }}></CommentSVG>
            </CommentSVGWrapper>

            <MoreSVGWrapper>
              <SmallMoreSVG style={{ height: '1.5rem' }}></SmallMoreSVG>
            </MoreSVGWrapper>
          </InteractingBox>
          {showReplyBox && (
            <ReplyBoxWrapper onClick={(e) => e.stopPropagation()}>
              <ReplyBox>
                <textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  onKeyDown={onKeyDownReply}
                />
                <button onClick={onClickSubmitComment}>submit</button>
              </ReplyBox>
            </ReplyBoxWrapper>
          )}
          {replies.map((replaycomment) => (
            <ReplyComment
              key={replaycomment.id}
              postingId={postingId}
              parentId={comment.id}
              comment={replaycomment}
            ></ReplyComment>
          ))}
        </div>
      </div>
    </CommentContainer>
  );
}

const CommentContainer = styled.div`
  flex-direction: column;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--hover-text);
  > div {
    display: flex;
    gap: 1rem;
  }
`;

const ProfileBox = styled.div`
  > figure {
    margin: 0;
    width: 3rem;
    height: 3rem;
    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background: white;
      border-radius: 5rem;
      > img {
        width: 80%;
        height: 80%;
        object-fit: cover;
        border-radius: 100%;
      }
    }

    border-radius: 5rem;
    border: 1.5px solid transparent;
    background: linear-gradient(to top, black, var(--primary-color)) border-box;
  }
`;

const CommentInfoBox = styled.div``;

const InteractingBox = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1.5rem;
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

const ReplyBoxWrapper = styled.div``;

const ReplyBox = styled.div`
  display: flex;

  > textarea {
    overflow-y: hidden;
    width: 100%;
    padding: 1rem;
    resize: none;
    padding: 1rem;
  }

  > button {
    color: white;
    background: var(--vertical-gradient);
    border: 1px solid var(--border-color);
    border-radius: 0.5rem;
  }
`;
