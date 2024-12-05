import { modules } from 'constants/quillModules';
import React, { useState } from 'react';
import ReactQuill from 'react-quill-new';
import styled from 'styled-components';
import { Posting } from 'types/posting';
import { postPostingLike } from 'utils/menu/postPostingLike';
import { ReactComponent as LikeSVG } from '../../../assets/icons/menu/like.svg';
import { ReactComponent as BookmarkSVG } from '../../../assets/icons/menu/bookmark.svg';
import '../../../../node_modules/react-quill-new/dist/quill.snow.css';
import { postBookmark } from 'utils/menu/postBookmark';
import MarketImagePortal from 'components/portal/MarketImagePortal';
import MarketImageModal from '../market/MarketImageModal';

interface PostContentProps {
  posting: Posting;
  editting: boolean;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  like: boolean;
  setLike: React.Dispatch<React.SetStateAction<boolean>>;
  bookmark: boolean;
  setBookmark: React.Dispatch<React.SetStateAction<boolean>>;
  likeCount: number;
  setLikeCount: React.Dispatch<React.SetStateAction<number>>;
  bookmarkCount: number;
  setBookmarkCount: React.Dispatch<React.SetStateAction<number>>;
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
  bookmark,
  setBookmark,
  likeCount,
  setLikeCount,
  bookmarkCount,
  setBookmarkCount,
  setEditting,
  onClickSave
}: PostContentProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onclickLikeButton = () => {
    if (isLoading) return;
    postPostingLike(posting.id.toString(), setLike, isLoading, setIsLoading);
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

  const onClickBookmarkButton = () => {
    if (isLoading) return;
    postBookmark(posting.id.toString(), setBookmark, isLoading, setIsLoading);
    if (bookmark) {
      setBookmarkCount((prev) => prev - 1);
    } else setBookmarkCount((prev) => prev + 1);
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

      {posting.board_type === 'market' && (
        <>
          {!editting && (
            <BookmarkWrapper $bookmark={bookmark}>
              <div onClick={onClickBookmarkButton}>
                <BookmarkSVG></BookmarkSVG>
              </div>
              <p>{bookmarkCount}</p>
            </BookmarkWrapper>
          )}
        </>
      )}

      {posting.board_type !== 'market' && (
        <>
          {!editting && (
            <LikeWrapper $like={like}>
              <div onClick={onclickLikeButton}>
                <LikeSVG></LikeSVG>
              </div>
              <p>{likeCount}</p>
            </LikeWrapper>
          )}
        </>
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

const BookmarkWrapper = styled.div<{
  $bookmark: boolean;
}>`
  position: fixed;
  right: 3rem;
  bottom: 4rem;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${(props) =>
      props.$bookmark ? 'var(--vertical-gradient)' : '#979797'};
    border-radius: 100%;
    width: 6rem;
    height: 6rem;
    margin-bottom: 1rem;
  }
  > p {
    text-align: center;
    font-size: 1.6rem;
    font-weight: 600;
  }
`;
