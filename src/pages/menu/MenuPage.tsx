import React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import RestaurantsPage from './RestaurantsPage';
import MarketsPage from './MarketsPage';
import GeneralDiscussion from './GeneralDiscussionPage';

export default function MenuPage() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      {currentPath.includes('/restaurant') && <RestaurantsPage />}
      {currentPath.includes('/market') && <MarketsPage />}
      {currentPath.includes('/general') && <GeneralDiscussion />}
    </>
  );
}
