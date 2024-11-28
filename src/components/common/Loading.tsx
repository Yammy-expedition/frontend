import styled from 'styled-components';

export default function Loading() {
  return (
    <LoadingBox>
      <img src="/images/loading.gif" alt="loading" />
    </LoadingBox>
  );
}

const LoadingBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
