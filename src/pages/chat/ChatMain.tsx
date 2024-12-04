import styled from 'styled-components';
import { ReactComponent as BackIcon } from 'assets/icons/chat/back.svg';
import { ReactComponent as ChatIcon } from 'assets/icons/chat/chat.svg';
import ChatList from 'components/chat/ChatList';

export default function ChatMain() {
  return (
    <Main>
      <header>
        <BackIcon />
        <ChatIcon />
        chat
      </header>
      <section>
        <ChatList />
      </section>
    </Main>
  );
}

const Main = styled.main`
  width: 100%;
  height: 100vh;
  header {
    height: 5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    font-size: 2rem;
    font-weight: 600;
    letter-spacing: -1px;
    background-color: white;
    color: var(--primary-color);
    svg {
      color: var(--primary-color);
      width: 2rem;
      height: 2rem;
    }
  }
`;
