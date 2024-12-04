import { instance } from 'api/instance';
import { useState } from 'react';
import styled from 'styled-components';
// import { ReactComponent as SendIcon } from 'assets/icons/chat/send.svg';
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
export default function ChatInput({
  otheruserid,
  setChatData
}: {
  otheruserid: number;
  setChatData: React.Dispatch<React.SetStateAction<ChatDataType | null>>;
}) {
  const [content, setContent] = useState('');
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    };
    try {
      const response = await instance.post(
        `chat/${otheruserid}/messages`,
        {
          content: content
        },
        {
          headers
        }
      );
      // 메시지 전송 후 상태 업데이트
      setChatData((prevData) => {
        if (!prevData) return null;

        return {
          ...prevData,
          messages: [
            ...prevData.messages,
            {
              id: response.data.id, // 서버에서 반환된 메시지 ID
              content: content,
              created_at: response.data.created_at,
              is_read: response.data.is_read,
              room: response.data.room,
              sender: response.data.sender,
              sender_name: response.data.sender_name
            }
          ]
        };
      });

      setContent('');
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <InputDiv>
      <input
        onChange={(e) => {
          setContent(e.target.value);
        }}
        value={content}
        type="text"
        placeholder="enter your message"
      />
      <button onClick={(e) => handleSubmit(e)}>send</button>
    </InputDiv>
  );
}

const InputDiv = styled.form`
  width: 100%;
  background-color: var(--hover-text);
  position: absolute;
  bottom: 0;
  height: 7rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem 1rem 1rem;
  input {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 1.5rem;
    padding: 0 2rem;
    font-size: 1.4rem;
    &:focus {
      border: none;
      outline: none;
      box-shadow: none;
    }
  }
  button {
    background-color: var(--primary-color);
    color: var(--hover-text);
    width: 10rem;
    height: 80%;
    border: none;
    border-radius: 5px;
    font-size: 1.3rem;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
      background-color: var(--hover-bg);
    }
    svg {
      width: 2rem;
      height: 2rem;
    }
  }
`;
