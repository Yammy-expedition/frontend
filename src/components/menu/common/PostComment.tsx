import HeadComment from 'components/menu/common/HeadComment';
import React, { useRef } from 'react';
import styled from 'styled-components';
import { Comment } from 'types/comment';
import { Posting } from 'types/posting';
import { postCommentReply } from 'utils/menu/postCommentReply';

interface PostCommentProps {
  posting: Posting;
  comments: Comment[];
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

export default function PostComment({
  posting,
  comments,
  comment,
  setComment,
  setComments
}: PostCommentProps) {
  const textarea = useRef<HTMLTextAreaElement>(null);

  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textarea.current) {
      textarea.current.style.height = 'auto';
      textarea.current.style.height = textarea.current.scrollHeight + 'px';
    }
    setComment(e.target.value);
  };

  const onKeyDownTextArea = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onClickSubmitComment();
    }
  };

  const onClickSubmitComment = () => {
    postCommentReply(posting.id.toString(), comment).then((newComment) => {
      setComments((prevComments) => [...prevComments, newComment]);
      setComment('');
    });
  };

  return (
    <PostCommentBox>
      <p>
        Comment <span>{posting.comment_count}</span>
      </p>
      {comments.map((comment, index) => (
        <React.Fragment key={index}>
          <HeadComment
            key={comment.id}
            comment={comment}
            postingId={posting.id.toString()}
          ></HeadComment>
        </React.Fragment>
      ))}
      <div>
        <textarea
          ref={textarea}
          value={comment}
          onChange={onChangeTextArea}
          onKeyDown={onKeyDownTextArea} // onKeyDown 핸들러 추가
        />
        <SubmitButton onClick={onClickSubmitComment}>Submit</SubmitButton>
      </div>
    </PostCommentBox>
  );
}

const PostCommentBox = styled.div`
  margin-top: 3rem;
  padding: 1.5rem 2.5rem;

  > p {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: 300;

    > span {
      color: var(--primary-color);
      font-weight: 400;
    }
  }

  > div {
    display: flex;
    > textarea {
      overflow-y: hidden;
      font-size: 1.6rem;
      padding: 1rem;
      width: 100%;
      height: 8.9rem;
      resize: none;
    }
  }
`;

const SubmitButton = styled.button`
  color: white;
  width: 10rem;
  height: 9rem;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #d6d6d6;
  background: var(
    --vertical-gradient,
    linear-gradient(180deg, #b21f7c 22.5%, #4c0d0f 100%)
  );
`;
