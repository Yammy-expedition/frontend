import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function ToChatButton({
  userId,
  userName
}: {
  userId: number;
  userName: string;
}) {
  const navigate = useNavigate();
  function handleClick() {
    localStorage.setItem('other_user_id', userId.toString());
    navigate(`/chat/${userId}`, { state: { userName } });
  }
  return <Btn onClick={() => handleClick()}>chat</Btn>;
}

const Btn = styled.button`
  border: none;
  width: 5rem;
  height: 2rem;
  background-color: var(--primary-color);
  background: var(--vertical-gradient);
  color: white;
  border-radius: 1rem;
  font-size: 1rem;
  font-weight: 300;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    scale: 0.9;
  }
`;
