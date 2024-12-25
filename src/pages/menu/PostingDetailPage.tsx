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
import Loading from 'components/common/Loading';

export default function PostingDetailPage() {
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

  // const [imgFiles, setImgFiles] = useState<(File | null)[]>([]);
  // const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    getPostingDetail(postingId, setPosting).then((result) => {
      const saleStatus =
        result.status === 'FOR_SALE'
          ? 'on sale'
          : result.status === 'RESERVATION'
            ? 'reservation'
            : result.status === 'SOLD_OUT'
              ? 'sold out'
              : '';
      setComments(result.comments);
      setLike(result.is_liked);
      setLikeCount(result.like_count);
      setTitle(result.title);
      setContent(result.content);
      setIsOnSale(saleStatus);
      setBookmark(result.is_bookmarked);
      setPrice(result.price);
      setImages(result.images);
      setBookmarkCount(result.bookmark_count);
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

  const getPageName = (boardType: string) => {
    if (boardType === 'general') return 'General Discussion';
    else if (boardType === 'market') return 'Markets';
    else return 'Restaurants';
  };

  const onClickSave = () => {
    patchPosting(postingId, title, content, price).then(() =>
      window.location.reload()
    );
  };

  // const handleDeleteImage = (index: number) => {
  //   // 선택한 이미지를 배열에서 제거
  //   setImages((prevImages) =>
  //     prevImages.filter((_, imgIndex) => imgIndex !== index)
  //   );
  // };

  const onClickUniqueImage = (index: number) => {
    if (!editting) {
      setOpenImageIndex(index);
      setOpenMarketImgageModal(true);
    }
  };

  if (!posting) {
    return <Loading></Loading>;
  }
  return (
    <PostingDetailContainer>
      {posting ? (
        <>
          <PageNameBox>
            <p>{getPageName(posting.board_type)}</p>
          </PageNameBox>

          {posting.board_type === 'market' && (
            <SaleTag $isOnSale={isOnSale}>{isOnSale}</SaleTag>
          )}

          <PostInfoTitle
            posting={posting}
            editting={editting}
            title={title}
            setTitle={setTitle}
            price={price}
            setPrice={setPrice}
            setEditting={setEditting}
            bookmark={bookmark}
            setBookmark={setBookmark}
          ></PostInfoTitle>

          {!editting && <LineGradient></LineGradient>}
          <ImgBoxWrapper>
            <ImgBox>
              {posting.board_type === 'market' && (
                <>
                  {images.map((item, index) => (
                    <div key={index} onClick={() => onClickUniqueImage(index)}>
                      <figure>
                        <img src={item.image} alt="stuff-image" />
                      </figure>
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

          {posting.board_type !== 'market' && (
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
        </>
      ) : (
        <Loading></Loading>
      )}
    </PostingDetailContainer>
  );
}

const PostingDetailContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  padding: 5.5rem 4.5rem;
  overflow: hidden;
  letter-spacing: -1px;
`;

const PageNameBox = styled.div`
  > p {
    font-family: var(--primary-font);
    color: var(--primary-color);
    font-weight: 500;
    font-size: 3rem;
  }
`;

const SaleTag = styled.div<{ $isOnSale: string }>`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;

  background: ${(props) =>
    props.$isOnSale === 'on sale'
      ? 'var(--primary-color);'
      : props.$isOnSale !== 'sold out'
        ? 'black;'
        : 'var(--main-gray);'};

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
    position: relative;
    > figure {
      img {
        object-fit: cover;
        width: 20rem;
        height: 20rem;
      }
    }
  }
`;
