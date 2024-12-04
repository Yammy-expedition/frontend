import styled from 'styled-components';
import { ReactComponent as BackIcon } from 'assets/icons/chat/back.svg';
import { ReactComponent as MoreIcon } from 'assets/icons/chat/more.svg';
import ChatBubbles from 'components/chat/ChatBubbles';
import ChatInput from 'components/chat/ChatInput';
import { useEffect, useState } from 'react';
import { instance } from 'api/instance';
import { useNavigate } from 'react-router-dom';
export type ChatDataType = {
  messages: {
    id: number;
    content: string;
    created_at: string;
    is_read: boolean;
    room: number;
    sender: number;
    sender_name: string;
  }[];
  opponent: {
    id: number;
    nickname: string;
    profile_image_url: string;
  };
  room_id: number;
  user: {
    id: number;
    nickname: string;
    profile_image_url: string;
  };
};
export default function ChatDetail() {
  const navigate = useNavigate();
  const other_user_local = JSON.parse(
    localStorage.getItem('other_user') || '{}'
  );
  const [chatData, setChatData] = useState<ChatDataType | null>(null);
  useEffect(() => {
    const getChatDetail = async () => {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      };
      try {
        const response = await instance.get(
          `/chat/${other_user_local.id}/messages`,
          {
            headers
          }
        );
        setChatData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getChatDetail();
  }, [chatData]);
  return (
    <Main>
      <header>
        <div>
          <BackIcon onClick={() => navigate(-1)} />
          {other_user_local?.username}
        </div>
        <MoreIcon />
      </header>
      <ChatBubbles chatData={chatData} />
      <ChatInput otheruserid={other_user_local.id} setChatData={setChatData} />
    </Main>
  );
}

const Main = styled.main`
  width: 100%;
  height: 100vh;
  position: relative;
  header {
    z-index: 4;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem;
    padding-right: 3rem;
    font-size: 2rem;
    font-weight: 600;
    letter-spacing: -1px;
    background-color: white;
    color: var(--primary-color);
    @media (max-width: 430px) {
      padding-left: 4rem;
    }
    svg {
      color: var(--primary-color);
      width: 2rem;
      height: 2rem;
    }
    div {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  }
`;
