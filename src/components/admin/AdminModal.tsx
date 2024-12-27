import styled from 'styled-components';
import { ReactComponent as CloseIcon } from 'assets/icons/admin/exit.svg';
import { instance } from 'api/instance';
import { useState } from 'react';
import Loading from 'components/common/Loading';

type AdminModalProps = {
  setIsModalOpen: (value: boolean) => void;
  sendData: {
    id: number;
    image: string;
  };
};

export default function AdminModal({
  setIsModalOpen,
  sendData
}: AdminModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmitClick = async (Bool: boolean) => {
    try {
      setIsLoading(true);
      await instance.post(`/admin-api/verify/${sendData.id}`, {
        approve: Bool
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <Background>
      <ModalWrapper>
        <CloseIcon onClick={() => setIsModalOpen(false)} />
        <h1>학생증 사진</h1>
        <figure>
          <img src={sendData.image} alt={sendData.id.toString()} />
        </figure>
        <Buttons>
          <button onClick={() => handleSubmitClick(true)}>
            {isLoading ? <Loading /> : '승인'}
          </button>
          <button onClick={() => handleSubmitClick(false)}>거절</button>
        </Buttons>
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
    img {
      width: 100%;
      object-fit: contain;
    }
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

  figure {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      max-height: 80%;
      width: 70%;
      object-fit: contain;
    }
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
