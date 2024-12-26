import styled from 'styled-components';
import { ReactComponent as BackIcon } from 'assets/icons/chat/back.svg';
import { ReactComponent as MoreIcon } from 'assets/icons/chat/more.svg';
import ChatBubbles from 'components/chat/ChatBubbles';
import ChatInput from 'components/chat/ChatInput';
import { useEffect, useState } from 'react';
import { instance } from 'api/instance';
import { useLocation, useNavigate } from 'react-router-dom';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
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
  const location = useLocation();
  const other_user_local_id = localStorage.getItem('other_user_id');
  const [chatData, setChatData] = useState<ChatDataType | null>(null);
  // new
  //************************************************************************************************************ */
  // useEffect(() => {
  //   const RunSSE = () => {
  //     const EventSource = EventSourcePolyfill || NativeEventSource;
  //     const headers = {
  //       Authorization: `Bearer ${localStorage.getItem('accessToken')}`
  //     };

  //     const evtSource = new EventSource(
  //       `${process.env.REACT_APP_API_URL}chat/${other_user_local_id}/messages/stream`,
  //       { headers: headers, withCredentials: true }
  //     );

  //     evtSource.onmessage = function (event) {
  //       try {
  //         console.log('Event received:', event);
  //         const newEvent = JSON.parse(event.data);
  //         console.log(newEvent);
  //         setChatData((prev) => {
  //           if (prev === null) return newEvent;
  //           else
  //             return {
  //               ...prev,
  //               messages: [...prev.messages, newEvent.messages[0]]
  //             };
  //         });
  //       } catch (err) {
  //         console.error('Error parsing event data:', err);
  //       }
  //     };

  //     evtSource.onerror = async (err) => {
  //       console.error('evtSource failed:', err);
  //       evtSource.close();
  //       setTimeout(RunSSE, 1000);
  //     };

  //     return () => {
  //       evtSource.close();
  //     };
  //   };

  //   return RunSSE();
  // }, []);
  //************************************************************************************************************ */

  // old
  //************************************************************************************************************ */
  useEffect(() => {
    const getChatDetail = async () => {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      };
      try {
        const response = await instance.get(
          `/chat/${other_user_local_id}/messages`,
          {
            headers
          }
        );
        setChatData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getChatDetail();
    const interval = setInterval(getChatDetail, 3000);
    return () => clearInterval(interval); // 언마운트 시 정리
  }, [chatData]);
  //************************************************************************************************************ */

  return (
    <Main>
      <header>
        <div>
          <BackIcon onClick={() => navigate(-1)} />
          {location?.state?.userName}
        </div>
        <MoreIcon />
      </header>
      <ChatBubbles chatData={chatData} />
      <ChatInput otheruserid={Number(other_user_local_id)} />
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
