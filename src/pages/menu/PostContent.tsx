import { modules } from 'constants/quillModules';
import React from 'react';
import ReactQuill from 'react-quill-new';
import styled from 'styled-components';
import { Posting } from 'types/posting';
import { postPostingLike } from 'utils/menu/postPostingLike';
import { ReactComponent as LikeSVG } from '../../assets/icons/menu/like.svg';
import '../../../node_modules/react-quill-new/dist/quill.snow.css';

interface PostContentProps {
  posting: Posting;
  editting: boolean;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  like: boolean;
  setLike: React.Dispatch<React.SetStateAction<boolean>>;
  likeCount: number;
  setLikeCount: React.Dispatch<React.SetStateAction<number>>;
  setEditting: React.Dispatch<React.SetStateAction<boolean>>;
  onClickSave: () => void;
}

export default function PostContent({
  posting,
  editting,
  content,
  setContent,
  like,
  setLike,
  likeCount,
  setLikeCount,
  setEditting,
  onClickSave
}: PostContentProps) {
  const onclickLikeButton = () => {
    postPostingLike(posting.id.toString(), setLike);
    if (like) {
      setLikeCount((prev) => prev - 1);
    } else setLikeCount((prev) => prev + 1);
  };
  const onClickCancle = () => {
    setEditting(false);
    if (posting) {
      setContent(posting.content);
    }
  };
  return (
    <PostContentBox>
      <Content>
        <CustomReactQuill
          $editting={editting}
          value={editting ? content : posting.content}
          readOnly={!editting}
          theme="snow"
          modules={modules}
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
  );
}

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
