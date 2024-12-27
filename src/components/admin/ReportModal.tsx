import { instance } from 'api/instance';
import styled from 'styled-components';
import { ReactComponent as CloseIcon } from 'assets/icons/admin/exit.svg';
import { useState } from 'react';
import Loading from 'components/common/Loading';

type ReportModalProps = {
  setIsModalOpen: (value: boolean) => void;
  reportId: string | undefined;
};

export default function ReportModal({
  setIsModalOpen,
  reportId
}: ReportModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSent, setIsSent] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');
  const handleSendMail = async () => {
    if (!content) {
      alert('메일 내용을 입력해주세요');
      return;
    }
    try {
      await instance.post(`/admin-api/report/${reportId}`, {
        approve: true,
        detail: content
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
      setIsSent(true);
    }
  };

  return (
    <Background>
      <ModalWrapper>
        <CloseIcon onClick={() => setIsModalOpen(false)} />
        {isSent ? (
          <SentMsg>메일을 보냈습니다.</SentMsg>
        ) : (
          <>
            <h1>메일에 보낼 사유를 작성해 주세요</h1>
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Buttons>
              <button onClick={() => handleSendMail()}>
                {isLoading ? <Loading /> : '이메일 보내기'}
              </button>
            </Buttons>
          </>
        )}
      </ModalWrapper>
    </Background>
  );
}

const Buttons = styled.div`
  display: flex;
  gap: 1rem;
  button {
    padding: 1rem 3rem;
    background-color: #f0f0f0;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    font-weight: 700;
    &:first-child {
      background-color: var(--secondary-color);
    }
    &:last-child {
      background-color: var(--main-gray);
    }
    &:hover {
      color: var(--hover-text);
      background-color: var(--hover-bg);
    }
    &:active {
      scale: 0.95;
    }
  }
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  position: relative;
  width: 40%;
  height: 80%;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: 600;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  @media screen and (max-width: 768px) {
    width: 80%;
    height: 80%;
  }

  input {
    width: 80%;
    height: 10rem;
    margin: 2rem 0;
    border: 1px solid var(--main-gray);
    border-radius: 5px;
    padding: 1rem;
    font-size: 1.6rem;
  }

  svg {
    position: absolute;
    top: 2rem;
    right: 2rem;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
  }
`;

const SentMsg = styled.div``;
