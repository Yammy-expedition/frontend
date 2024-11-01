import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminPage from 'pages/admin-page/AdminPage';
import LoginPage from 'pages/login/LoginPage';
import MainPage from 'pages/main/MainPage';
import MenuPage from 'pages/menu/MenuPage';
import MyPage from 'pages/my-page/MyPage';
import SignUpPage from 'pages/sing-up/SignUpPage';
import TipsForSogangPage from 'pages/tips-for-sogang/TipsForSogangPage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/tips-for-sogang" element={<TipsForSogangPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
