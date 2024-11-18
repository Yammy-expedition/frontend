import React from 'react';
import styled from 'styled-components';

export default function RestaurantsPage() {
  return (
    <RestaurantsPageContainer>
      <div>
        <p>Restaurant</p>
      </div>

      <div>
        <div>
          <select>
            <option value="">Title</option>
            <option value="">Content</option>
          </select>
          <div>
            <input />
            <button>검색</button>
          </div>
        </div>
        <div>
          <select>
            <option value="">Recent</option>
            <option value="">Popular</option>
          </select>
        </div>
      </div>

      <div>
        <div>
          <p>This is title</p>
          <div>
            <span>Writer </span>
            <span>created-at </span>
            <span>likes </span>
            <span>view </span>
            <span>coment </span>
          </div>
        </div>
      </div>

      <div></div>
    </RestaurantsPageContainer>
  );
}

const RestaurantsPageContainer = styled.div`
  padding: 6.5rem 4.5rem;
`;
