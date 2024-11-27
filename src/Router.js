import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminPage from 'pages/admin-page/AdminPage';
import LoginPage from 'pages/login/LoginPage';
import MainPage from 'pages/main/MainPage';

import MyPage from 'pages/my-page/MyPage';
import SignUpPage from 'pages/sign-up/SignUpPage';
import TipsForSogangPage from 'pages/tips-for-sogang/TipsForSogangPage';
import EachMenuPage from 'pages/menu/EachMenuPage';
import PostingDetailPage from 'pages/menu/PostingDetailPage';
import WritingPostPage from 'pages/menu/WritingPostPage';
import AuthRoute from 'AuthRoute';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/login" element={<LoginPage />} />
<<<<<<< HEAD
      <Route path="/menu">
        <Route
          path="restaurant"
          element={<EachMenuPage boardType="restaurant" />}
        ></Route>
        <Route
          path="market"
          element={<EachMenuPage boardType="market" />}
        ></Route>
        <Route
          path="general"
          element={<EachMenuPage boardType="general" />}
        ></Route>
=======
      <Route path="/menu" element={<MenuPage />}>
        <Route element={<AuthRoute />}>
          <Route path="restaurant" element={<RestaurantsPage />}></Route>
          <Route path="market" element={<MarketsPage />}></Route>
          <Route path="general" element={<GeneralDiscussion />}></Route>
        </Route>
>>>>>>> 42c67b64227e34d426fa13a220700a29296bcfe6
      </Route>
      <Route element={<AuthRoute />}>
        <Route
          path="/posting-detail/:postingId"
          element={<PostingDetailPage />}
        />
      </Route>

      <Route path="/my-page" element={<MyPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/tips-for-sogang" element={<TipsForSogangPage />} />
      <Route path="/writing-post" element={<WritingPostPage />} />
    </Routes>
  );
}
export default Router;
