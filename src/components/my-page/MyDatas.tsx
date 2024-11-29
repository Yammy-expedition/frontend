import dayjs from 'dayjs';
import styled from 'styled-components';
import { ReactComponent as HeartIcon } from 'assets/icons/my-page/heart.svg';
import { ReactComponent as EyeIcon } from 'assets/icons/my-page/eye.svg';
import { useNavigate } from 'react-router-dom';
import { changeSex } from 'utils/my-page/findInfos';

interface MyDatasProps {
  selectedTab: 'postings' | 'comments' | 'bookmarks';
  myCategoryDatas: MyCagegoryDatasProps;
}

export interface MyCagegoryDatasProps {
  comments: {
    id: number;
    content: string;
    created_at: string;
    board_type: string;
    like_count: number;
  }[];
  postings: {
    id: number;
    title: string;
    created_at: string;
    like_count: number;
    board_type: string;
    view_count: number;
  }[];
  scraps: {
    id: number;
    title: string;
    created_at: string;
    like_count: number;
    board_type: string;
    view_count: number;
  }[];
}

type Posting = {
  id: number;
  title: string;
  created_at: string;
  like_count: number;
  board_type: string;
  view_count: number;
};

type Comment = {
  id: number;
  content: string;
  created_at: string;
  board_type: string;
  like_count: number;
};

export default function MyDatas({
  selectedTab,
  myCategoryDatas
}: MyDatasProps) {
  if (!myCategoryDatas) return null;
  return (
    <Wrapper>
      <PostWrapper>
        {selectedTab === 'postings' && PostingsLi(myCategoryDatas.postings)}
        {selectedTab === 'comments' && CommentsLi(myCategoryDatas.comments)}
        {selectedTab === 'bookmarks' && PostingsLi(myCategoryDatas.scraps)}
      </PostWrapper>
    </Wrapper>
  );
}

const PostingsLi = (postingLists: Posting[]) => {
  const navigate = useNavigate();
  function changePageName(board_type: string) {
    if (board_type === 'restaurant') return 'Restaurants';
    else if (board_type === 'market') return 'Markets';
    else if (board_type === 'general') return 'General-Discussion';
  }
  return (
    <>
      {postingLists.map((post, key: number) => (
        <li
          onClick={() =>
            navigate(`/posting-detail/${post.id}`, {
              state: {
                board_type: post.board_type,
                posting: post,
                pageName: changePageName(post.board_type)
              }
            })
          }
          key={key}
        >
          {/* <li key={key}> */}
          <h3>{post.board_type}</h3>
          <h1>{post.title}</h1>
          <div>
            <span>{dayjs(post.created_at).format('YY.MM.DD HH:mm')}</span>
            <span>
              <HeartIcon />
              {post.like_count}
            </span>
            <span>
              <EyeIcon />
              {post.view_count}
            </span>
          </div>
        </li>
      ))}
    </>
  );
};
const CommentsLi = (commentLists: Comment[]) => {
  return (
    <>
      {commentLists.map((comment, key: number) => (
        <li key={key}>
          <h3>{comment.board_type}</h3>
          <h1 style={{ fontSize: '14px', fontWeight: '300' }}>
            ㄴ {comment.content}
          </h1>
          <div>
            <span>{dayjs(comment.created_at).format('YY.MM.DD HH:mm')}</span>
            <span>
              <HeartIcon />
              {comment.like_count}
            </span>
          </div>
        </li>
      ))}
    </>
  );
};

const PostWrapper = styled.ul`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding-right: 3rem;
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  padding-bottom: 5rem;
  li {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem 0;
    border-bottom: 1px solid var(--border-color);
    h3 {
      color: var(--primary-color);
    }
    h1 {
      font-size: 1.6rem;
      font-weight: 600;
    }
    div {
      color: var(--secondary-text);
      width: 100%;
      display: flex;
      align-items: center;
      gap: 1rem;
      span {
        display: flex;
        align-items: center;
        gap: 0.3rem;
        svg {
          width: 1.3rem;
          height: 1.3rem;
        }
      }
    }
  }
`;

const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  padding: 3rem 0 0 5rem;
  background-color: var(--hover-text);
  position: relative;
`;
