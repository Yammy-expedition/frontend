import { Route, Routes, useParams } from 'react-router-dom';
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
import ChatMain from 'pages/chat/ChatMain';
import UserProfile from 'pages/user-profile/UserProfile';
import Notification from 'pages/notification/Notification';
import ChatDetail from 'pages/chat/ChatDetail';
import WhatIsUnicon from 'pages/what-is-unicon/WhatIsUnicon';
import AllUsers from 'components/admin/AllUsers';
import AllReports from 'components/admin/AllReports';
import AllReportedUsers from 'components/admin/AllReportedUsers';
import ReportDetail from 'components/admin/ReportDetail';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/admin" element={<AdminPage />}>
        <Route path="users" element={<AllUsers />} />
        <Route path="reports" element={<AllReports />} />
        <Route path="reports/:reportId" element={<ReportDetail />} />
        <Route path="reported-users" element={<AllReportedUsers />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/introduction" element={<WhatIsUnicon />} />
      {/* <Route path="/chat/:id" element={<ChatDetail />} /> */}
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
      </Route>
      <Route element={<AuthRoute />}>
        <Route path="/posting/:postingId" element={<PostingDetailPage />} />

        <Route path="/my-page" element={<MyPage />}>
          <Route path=":category" element={<MyPage />} />
        </Route>
      </Route>

      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/tips-for-sogang" element={<TipsForSogangPage />}>
        <Route path=":category" element={<TipsForSogangPage />} />
      </Route>
      <Route path="/writing-post" element={<WritingPostPage />} />
      {/* <Route path="/chat" element={<ChatMain />} /> */}
      <Route
        path="/user-profile/:userId/:category"
        element={<UserProfile />}
      ></Route>
      <Route path="/notification" element={<Notification />} />
    </Routes>
  );
}
export default Router;
