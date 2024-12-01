import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Posting } from 'types/posting';
import { getPostingDetail } from 'utils/menu/getPostingDetail';
import { postPostingViewCount } from 'utils/menu/postPostingViewCount';
import { patchPosting } from 'utils/menu/patchPosting';
import PostInfoTitle from 'components/menu/common/PostInfoTitle';
import PostContent from 'components/menu/common/PostContent';
import PostComment from 'components/menu/common/PostComment';
import MarketImagePortal from 'components/portal/MarketImagePortal';
import MarketImageModal from 'components/menu/market/MarketImageModal';

export default function PostingDetailPage() {
  const location = useLocation();
  const state = location.state as {
    posting: Posting;
    boardType: string;
    pageName: string;
  };

  interface ImagesResponse {
    id: number;
    image: string;
    post: number;
  }

  const { postingId } = useParams();

  const [posting, setPosting] = useState<Posting>();
  const [comments, setComments] = useState<Posting['comments']>([]);
  const [like, setLike] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  const [editting, setEditting] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const [price, setPrice] = useState<string>('');
  const [isOnSale, setIsOnSale] = useState<string>('');

  const [bookmark, setBookmark] = useState<boolean>(false);
  const [bookmarkCount, setBookmarkCount] = useState<number>(0);

  const [comment, setComment] = useState<string>('');

  const [images, setImages] = useState<ImagesResponse[]>([]);

  const [openMarketImgageModal, setOpenMarketImgageModal] =
    useState<boolean>(false);
  const [openImageIndex, setOpenImageIndex] = useState<number>(0);

  useEffect(() => {
    getPostingDetail(postingId, setPosting).then((result) => {
      setComments(result.comments);
      setLike(result.is_liked);
      setLikeCount(result.like_count);
      setTitle(result.title);
      setContent(result.content);
      setIsOnSale(result.status);
      setBookmark(result.is_bookmarked);
      setPrice(result.price);
      setImages(result.images);
    });
    postPostingViewCount(postingId);
  }, []);

  useEffect(() => {
    if (openMarketImgageModal) {
      document.body.style.overflow = 'hidden'; // 스크롤 비활성화
    } else {
      document.body.style.overflow = 'auto'; // 스크롤 활성화
    }

    return () => {
      document.body.style.overflow = 'auto'; // 컴포넌트 언마운트 시 스크롤 복원
    };
  }, [openMarketImgageModal]);

  useEffect(() => {
    console.log(isOnSale);
  }, [isOnSale]);

  const onClickSave = () => {
    patchPosting(postingId, title, content, price).then(() =>
      window.location.reload()
    );
  };

  const onClickUniqueImage = (index: number) => {
    setOpenImageIndex(index);
    setOpenMarketImgageModal(true);
  };

  if (!posting) {
    return <></>;
  }
  return (
    <PostingDetailContainer>
      <PageNameBox>
        <p>{state.pageName}</p>
      </PageNameBox>

      {state.boardType === 'market' && (
        <SaleTag>{isOnSale === 'FOR_SALE' ? 'on sale' : 'sold out'}</SaleTag>
      )}

      <PostInfoTitle
        posting={posting}
        editting={editting}
        title={title}
        setTitle={setTitle}
        price={price}
        setPrice={setPrice}
        setEditting={setEditting}
      ></PostInfoTitle>

      {!editting && <LineGradient></LineGradient>}
      <ImgBoxWrapper>
        <ImgBox>
          {state.boardType === 'market' && (
            <>
              {images.map((item, index) => (
                <div key={index} onClick={() => onClickUniqueImage(index)}>
                  <img src={item.image} alt="stuff-image" />
                </div>
              ))}
            </>
          )}
        </ImgBox>
      </ImgBoxWrapper>

      <PostContent
        posting={posting}
        editting={editting}
        content={content}
        setContent={setContent}
        like={like}
        setLike={setLike}
        likeCount={likeCount}
        setLikeCount={setLikeCount}
        bookmark={bookmark}
        setBookmark={setBookmark}
        bookmarkCount={bookmarkCount}
        setBookmarkCount={setBookmarkCount}
        setEditting={setEditting}
        onClickSave={onClickSave}
      ></PostContent>

      {state.boardType !== 'market' && (
        <>
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
        </>
      )}

      {!editting && openMarketImgageModal && (
        <MarketImagePortal>
          <MarketImageModal
            images={images}
            openImageIndex={openImageIndex}
            setOpenMarketImgageModal={setOpenMarketImgageModal}
          ></MarketImageModal>
        </MarketImagePortal>
      )}
    </PostingDetailContainer>
  );
}

const PostingDetailContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 5.5rem 4.5rem;
  overflow: hidden;
`;

const PageNameBox = styled.div`
  > p {
    font-family: var(--sub-font);
    color: var(--primary-color);
    font-weight: 600;
    font-size: 5rem;
  }
`;

const SaleTag = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--primary-color);
  color: white;
  width: 7rem;
  height: 2rem;
  font-size: 1.5rem;
  border-radius: 40rem;
`;

const LineGradient = styled.div`
  margin-top: 3rem;
  height: 0.1rem;
  background-image: var(--line-gradient);
  transform: rotate(180deg);
`;

const ImgBoxWrapper = styled.div``;

const ImgBox = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    margin: 4px;
  }

  &::-webkit-scrollbar-track {
    background: gray;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(178, 31, 124, 0.7);
  }
  > div {
    margin-bottom: 0.5rem;
    > img {
      object-fit: cover;
      width: 20rem;
      height: 20rem;
    }
  }
`;
