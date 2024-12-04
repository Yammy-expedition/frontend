import { instance } from 'api/instance';
import Loading from 'components/common/Loading';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type ChatListType = {
  id: number;
  last_message: string;
  last_message_date: string;
  unread_count: number;
  updated_at: string;
  other_user: {
    id: number;
    username: string;
    profile_image: string;
  };
};

export default function ChatList() {
  const [chatList, setChatList] = useState<ChatListType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChatList = async () => {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      };
      try {
        const response = await instance.get('chat/rooms', { headers });

        setChatList((prevList) => {
          if (JSON.stringify(prevList) !== JSON.stringify(response.data)) {
            console.log('Data updated:', response.data);
            return response.data;
          }
          console.log('No data changes detected');
          return prevList;
        });
      } catch (error) {
        console.error(error);
      }
    };

    // 초기 데이터 로드 및 2초마다 반복
    fetchChatList();
    const interval = setInterval(fetchChatList, 5000);
    return () => clearInterval(interval); // 언마운트 시 정리
  }, []);

  if (chatList.length === 0) {
    return <ChatUL>채팅방이 없습니다.</ChatUL>;
  }

  function navigateToChatDetail(other_user: ChatListType['other_user']) {
    localStorage.setItem('other_user', JSON.stringify(other_user));
    navigate(`/chat/${other_user.id}`);
  }
  return (
    <ChatUL>
      {chatList ? (
        <>
          {chatList.map((chat, key) => (
            <li onClick={() => navigateToChatDetail(chat.other_user)} key={key}>
              <figure>
                <img
                  src={`${process.env.REACT_APP_API_URL}${chat.other_user.profile_image}`}
                  alt={chat.other_user.username}
                />
                {chat.unread_count > 0 && <span>{chat.unread_count}</span>}
              </figure>
              <div>
                <h3>{chat.other_user.username}</h3>
                <p>{chat.last_message}</p>
              </div>
            </li>
          ))}
        </>
      ) : (
        <Loading />
      )}
    </ChatUL>
  );
}

const ChatUL = styled.ul`
  li {
    cursor: pointer;
    padding: 2rem 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    color: var(--secondary-text);
    border-bottom: 1px solid var(--border-color);
    figure {
      width: fit-content;
      height: fit-content;
      position: relative;
      border-radius: 50%;
      img {
        width: 7rem;
        height: 7rem;
        border-radius: 50%;
        border: 1.5px solid var(--main-text);
      }
      span {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 1.2rem;
        border-radius: 50%;
        background-color: var(--primary-dark);
        width: 2rem;
        height: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
      }
    }

    div {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      h3 {
        font-size: 1.9rem;
        font-weight: 600;
      }
      p {
        font-size: 1.4rem;
        font-weight: 300;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
      }
    }

    &:hover {
      background-color: var(--primary-color);
      color: var(--hover-text);
    }
  }
`;
