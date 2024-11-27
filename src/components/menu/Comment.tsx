import React from 'react';
import styled from 'styled-components';

export default function Comment() {
  return (
    <CommentContainer>
      <ProfileBox></ProfileBox>
      <div>
        <CommentInfoBox></CommentInfoBox>
        <InteractingBox></InteractingBox>
      </div>
    </CommentContainer>
  );
}

const CommentContainer = styled.div``;

const ProfileBox = styled.div``;

const CommentInfoBox = styled.div``;

const InteractingBox = styled.div``;
