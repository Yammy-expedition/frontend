import Loading from 'components/common/Loading';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AllInfoNotification } from 'types/notification';
import { getNotification } from 'utils/notification/getNotification';
import { ReactComponent as TrashCanSVG } from '../../assets/icons/notification/trash-can-regular.svg';
import { putReadNotification } from 'utils/notification/putReadNotification';
import { deleteNotification } from 'utils/notification/deleteNotification';
import { deleteAllNotification } from 'utils/notification/deleteAllNotification';

export default function Notification() {
  const [notice, setNotice] = useState<AllInfoNotification>();
  const navigate = useNavigate();

  useEffect(() => {
    getNotification().then((result) => setNotice(result));
  }, []);

  const onClickNoti = (itemId: number, redirectURL: string) => {
    putReadNotification(itemId);
    const arr = redirectURL.split('/');
    console.log(arr);
    navigate(`/${arr[1]}/${arr[2]}`);
  };

  const onClickDeleteUniqueNoti = (itemId: number) => {
    deleteNotification(itemId).then(() =>
      getNotification().then((result) => setNotice(result))
    );
  };

  const onClickDeleteAllNoti = () => {
    deleteAllNotification().then(() =>
      getNotification().then((result) => setNotice(result))
    );
  };

  return (
    <NotificationContainer>
      <PageNameBox>
        <p>Notification</p>
      </PageNameBox>

      <NotiListContainer>
        {notice?.list.length !== 0 ? (
          <NotiList>
            {notice ? (
              <>
                {notice.list.map((item, index) => (
                  <EachNoti key={index}>
                    <>{console.log(notice.list.length)}</>
                    <NotiInfo>
                      <ImgBox>
                        <figure>
                          <img
                            src={`${process.env.REACT_APP_API_URL}${item.actor.profile_image}`}
                            alt="profile-img"
                          />
                        </figure>
                      </ImgBox>

                      <div
                        onClick={() =>
                          onClickNoti(item.id, item.redirect_url.redirect_url)
                        }
                      >
                        <h1>{item.actor.nickname}</h1>
                        <p>{item.content}</p>
                      </div>
                    </NotiInfo>

                    <DeleteButtonWrapper>
                      <DeleteButton
                        onClick={() => onClickDeleteUniqueNoti(item.id)}
                      >
                        <TrashCanSVG></TrashCanSVG>
                      </DeleteButton>
                    </DeleteButtonWrapper>
                  </EachNoti>
                ))}
              </>
            ) : (
              <Loading />
            )}
          </NotiList>
        ) : (
          <AnyNoticeHere>
            <p>AnyNoticeHere</p>
          </AnyNoticeHere>
        )}
      </NotiListContainer>
      <DeleteAllButtonWrapper>
        <DeleteAllButton onClick={onClickDeleteAllNoti}>
          Delete All
        </DeleteAllButton>
      </DeleteAllButtonWrapper>
    </NotificationContainer>
  );
}

const NotificationContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 5rem 3rem;

  @media screen and (min-width: 768px) {
    padding: 6.5rem 4.5rem;
  }
`;

const PageNameBox = styled.div`
  margin-bottom: 3rem;
  > p {
    color: var(--primary-color);
    font-weight: 500;
    font-size: 3rem;
    letter-spacing: -1px;
    @media screen and (min-width: 768px) {
      font-size: 5rem;
    }
  }
`;

const NotiListContainer = styled.div`
  width: 100%;
`;

const NotiList = styled.ul`
  overflow-y: auto;
  width: 100%;
  height: 38rem;
  display: flex;
  flex-direction: column;
`;

const EachNoti = styled.li`
  padding: 2rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
`;

const NotiInfo = styled.div`
  display: flex;
  gap: 2rem;

  > div {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    gap: 1rem;
    > h1 {
      font-size: 2rem;
    }

    > p {
      font-size: 1.3rem;
    }
  }
`;

const ImgBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 3rem;
  figure {
    overflow: hidden;
    width: fit-content;
    height: fit-content;
    border: 3px solid transparent;
    border-radius: 50%;
    background-image: linear-gradient(#fff, #fff), var(--vertical-gradient);
    background-origin: border-box;
    background-clip: content-box, border-box;
    img {
      scale: 1.2;
      width: 5rem;
      height: 5rem;
    }
  }
`;

const DeleteButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const DeleteButton = styled.button`
  display: flex;
  width: 3.5rem;
  height: 3.5rem;
  background: none;
  border: none;

  svg {
    cursor: pointer;
  }
`;

const DeleteAllButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 3.5rem;
`;

const DeleteAllButton = styled.button`
  background: var(
    --vertical-gradient,
    linear-gradient(180deg, #b21f7c 22.5%, #4c0d0f 100%)
  );
  border-radius: 0.5rem;
  border: 1px solid #d6d6d6;
  color: white;
  width: 10rem;
  height: 5rem;
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;
`;

const AnyNoticeHere = styled.div`
  width: 100%;
  height: 38rem;
  display: flex;
  justify-content: center;
  align-items: center;

  > p {
    font-size: 3rem;
    font-weight: 600;
  }
`;
