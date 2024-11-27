import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Posting } from 'types/posting';
import { getPostingDetail } from 'utils/menu/getPostingDetail';
import { ReactComponent as EyeSVG } from '../../assets/icons/menu/eye.svg';
import { ReactComponent as MoreSVG } from '../../assets/icons/menu/more.svg';
import { ReactComponent as LikeSVG } from '../../assets/icons/menu/like.svg';
import { postPostingViewCount } from 'utils/menu/postPostingViewCount';
import { postPostingLike } from 'utils/menu/postPostingLike';
import '../../../node_modules/react-quill-new/dist/quill.snow.css';
import ReactQuill from 'react-quill-new';
import { patchPosting } from 'utils/menu/patchPosting';
import { postComment } from 'utils/menu/postComment';
import { deletePosting } from 'utils/menu/deletePosting';
import Comment from 'components/menu/common/HeadComment';
import HeadComment from 'components/menu/common/HeadComment';

export default function PostingDetailPage() {
  const location = useLocation();
  const state = location.state as { boardType: string; posting: Posting };
  console.log(state.boardType);

  const { postingId } = useParams();
  const [posting, setPosting] = useState<Posting>();
  const [like, setLike] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  const [more, setMore] = useState<boolean>(false);
  const moreRef = useRef<HTMLDivElement>(null);

  const [editting, setEditting] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  const textarea = useRef<HTMLTextAreaElement>(null);
  const [comment, setComment] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    getPostingDetail(postingId, setPosting).then((result) => {
      console.log(result);
      setLike(result.is_liked),
        setLikeCount(result.like_count),
        setTitle(result.title);
      setContent(result.content);
    });
    postPostingViewCount(postingId);

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

  const onclickLikeButton = () => {
    postPostingLike(postingId, setLike);
    if (like) {
      setLikeCount((prev) => prev - 1);
    } else setLikeCount((prev) => prev + 1);
  };

  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textarea.current) {
      textarea.current.style.height = 'auto';
      textarea.current.style.height = textarea.current.scrollHeight + 'px';
    }
    setComment(e.target.value);
  };

  const onClickDelete = () => {
    deletePosting(postingId);
    window.location.href = `/menu/${posting?.board_type}`;
  };

  const onClickSave = () => {
    patchPosting(postingId, title, content, price).then((_) =>
      window.location.reload()
    );
  };

  const onClickCancle = () => {
    setEditting(false);
    if (posting) {
      setContent(posting.content);
    }
  };

  const onClickSubmit = () => {
    postComment(postingId, comment);
    setComment('');
  };
  if (!posting) {
    return <></>;
  }
  return (
    <PostingDetailContainer>
      <PageNameBox>
        <p>{state.boardType}</p>
      </PageNameBox>

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
              {more && (
                <div>
                  <div onClick={() => setEditting(true)}>Edit</div>
                  <div onClick={onClickDelete}>Delete</div>
                </div>
              )}
            </MoreDiv>
          </PostInfo>
        )}
      </PostHeader>

      {!editting && <LineGradient></LineGradient>}

      <PostContentBox>
        <Content>
          <CustomReactQuill
            $editting={editting}
            value={editting ? content : posting.content}
            readOnly={!editting}
            theme="snow"
            modules={{ toolbar: true }}
            onChange={(value) => editting && setContent(value)}
          />
        </Content>
        {!editting && (
          <LikeWrapper $like={like}>
            <div onClick={onclickLikeButton}>
              <LikeSVG></LikeSVG>
            </div>
            <p>{likeCount}</p>
          </LikeWrapper>
        )}
        {editting && (
          <ButtonWrapper>
            <Button onClick={onClickCancle}>Cancel</Button>
            <Button onClick={onClickSave}>Save</Button>
          </ButtonWrapper>
        )}
      </PostContentBox>

      {!editting ? (
        <>
          <LineGradient></LineGradient>

          <PostCommentBox>
            <p>
              Comment <span>{posting.comment_count}</span>
            </p>
            <>{console.log(posting.comments)}</>
            {posting.comments.map((comment, index) => (
              <HeadComment key={index} comment={comment}></HeadComment>
            ))}
            <div>
              <textarea
                ref={textarea}
                value={comment}
                onChange={onChangeTextArea}
              />
              <SubmitButton onClick={onClickSubmit}>Submit</SubmitButton>
            </div>
          </PostCommentBox>
        </>
      ) : (
        ''
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

const LineGradient = styled.div`
  margin-top: 5rem;
  height: 0.1rem;
  background-image: var(--line-gradient);
  transform: rotate(180deg);
`;

const PostContentBox = styled.div`
  margin-top: 3.5rem;

  font-size: 3rem;
`;

const Content = styled.div`
  margin-bottom: 6rem;
`;

const LikeWrapper = styled.div<{ $like: boolean }>`
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
    background: ${(props) =>
      props.$like ? 'var(--vertical-gradient)' : '#979797'};
    border-radius: 100%;
  }

  > p {
    font-size: 1.6rem;
    font-weight: 600;
  }
`;

const PostCommentBox = styled.div`
  diaplay: flex;

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

const CustomReactQuill = styled(ReactQuill)<{ $editting: boolean }>`
  & .ql-container {
    ${(props) =>
      props.$editting
        ? 'background: white; min-height: 26rem;'
        : 'border: none;'}
  }

  & .ql-toolbar {
    ${(props) => (props.$editting ? 'background: white;' : 'display: none;')}
  }

  & .ql-editor strong {
    font-weight: bold;
  }

  & .ql-editor em {
    font-style: italic;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 0rem;
  display: flex;
  justify-content: end;
  gap: 4rem;
`;

const Button = styled.button`
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
