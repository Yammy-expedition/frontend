import React from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import AdminPage from 'pages/admin-page/AdminPage';
import LoginPage from 'pages/login/LoginPage';
import MainPage from 'pages/main/MainPage';
import MenuPage from 'pages/menu/MenuPage';
import MyPage from 'pages/my-page/MyPage';
import SignUpPage from 'pages/sign-up/SignUpPage';
import TipsForSogangPage from 'pages/tips-for-sogang/TipsForSogangPage';
import RestaurantsPage from 'pages/menu/RestaurantsPage';
import MarketsPage from 'pages/menu/MarketsPage';
import GeneralDiscussion from 'pages/menu/GeneralDiscussionPage';
import PostingDetailPage from 'pages/menu/PostingDetailPage';
import WritingPostPage from 'pages/menu/WritingPostPage';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/menu" element={<MenuPage />}>
        <Route path="restaurant" element={<RestaurantsPage />}></Route>
        <Route path="market" element={<MarketsPage />}></Route>
        <Route path="general" element={<GeneralDiscussion />}></Route>
      </Route>
      <Route
        path="/posting-detail/:postingId"
        element={<PostingDetailPage />}
      />
      <Route path="/my-page" element={<MyPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/tips-for-sogang" element={<TipsForSogangPage />} />
      <Route path="/writing-post" element={<WritingPostPage />} />
    </Routes>
  );
}
export default Router;
