import { instance } from 'api/instance';
import Loading from 'components/common/Loading';
import { useEffect, useRef, useState } from 'react';
import { set } from 'react-hook-form';
import styled from 'styled-components';

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

export default function ChatBubbles({
  chatData
}: {
  chatData: ChatDataType | null;
}) {
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [length, setLength] = useState(0);
  // 채팅 데이터가 변경될 때마다 실행
  useEffect(() => {
    if (chatEndRef.current) {
      if (chatData?.messages.length !== length) {
        chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      // chatEndRef를 사용해 스크롤을 맨 아래로 내린다.
      setLength(chatData?.messages.length || 0);
    }
  }, [chatData]); // chatData가 변경될 때마다 실행

  return (
    <Section>
      {chatData ? (
        <ChatWrapper>
          {chatData.messages?.map((message, key) => {
            if (message.sender === chatData.user.id) {
              return (
                <ChatBubble key={key} className="my">
                  <p>
                    {' '}
                    {message.created_at.split(' ')[1].split(':')[0]}:
                    {message.created_at.split(' ')[1].split(':')[1]}
                  </p>
                  <span>{message.content}</span>
                  <figure>
                    <img
                      src={`${process.env.REACT_APP_API_URL}${chatData.user.profile_image_url}`}
                      alt="profile"
                    />
                  </figure>
                </ChatBubble>
              );
            } else {
              return (
                <ChatBubble key={key} className="your">
                  <figure>
                    <img
                      src={`${process.env.REACT_APP_API_URL}${chatData.opponent.profile_image_url}`}
                      alt="profile"
                    />
                  </figure>
                  <span>{message.content}</span>
                  <p>
                    {message.created_at.split(' ')[1].split(':')[0]}:
                    {message.created_at.split(' ')[1].split(':')[1]}
                  </p>
                </ChatBubble>
              );
            }
          })}
          <div ref={chatEndRef} />
        </ChatWrapper>
      ) : (
        <Loading />
      )}
    </Section>
  );
}

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 7rem 2rem 7rem 3rem;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow-y: scroll;
  &::-webkit-scrollbar-thumb {
    background-color: var(--primary-color);
  }
  &::-webkit-scrollbar {
    width: 5px;
  }
`;

const ChatBubble = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  &.my {
    justify-content: flex-end;
    span {
      background-color: var(--border-color);
      background-color: var(--primary-color);
      color: var(--hover-text);
      border-radius: 2rem 4px 4px 2rem;
      padding: 1.5rem 1.5rem 1.5rem 2rem;
    }
  }
  &.your {
    justify-content: flex-start;
    span {
      padding: 1.5rem 2rem 1.5rem 1.5rem;

      background-color: var(--hover-text);
      border-radius: 4px 2rem 2rem 4px;
    }
  }
  span {
    font-size: 1.4rem;
    display: flex;
    justify-content: flex-start;
  }
  p {
    color: var(--secondary-text);
    padding-bottom: 1rem;
  }
  figure {
    flex-shrink: 0;
    overflow: hidden;
    width: fit-content;
    height: fit-content;
    border: 2px solid transparent;
    border-radius: 50%;
    background-image: linear-gradient(#fff, #fff), var(--vertical-gradient);
    background-origin: border-box;
    background-clip: content-box, border-box;
  }
  img {
    width: 4.2rem;
    height: 4rem;
    border-radius: 50%;
    scale: 1.2;
  }
`;

const Section = styled.section`
  width: 100%;
  height: 100%;
  position: relative;
`;
