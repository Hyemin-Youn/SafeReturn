import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login'; 
import Register from './pages/auth/Register';
import FindAccount from './pages/auth/FindAccount';
import MapPage from './pages/MapPage';

function App() {
  // 현재 로컬 스토리지 상태 확인
  const accessToken = localStorage.getItem('accessToken');
  const isAuthenticated = !!accessToken;

  return (
    <Router>
      <Routes>
        {/* 1. 로그인 화면: 이미 토큰 있으면(로그인 상태면) 바로 지도로 튕김 */}
        <Route path="/" element={
          isAuthenticated ? <Navigate to="/map" replace /> : <Login />
        } />

        <Route path="/register" element={<Register />} />
        <Route path="/find-account" element={<FindAccount />} />

        {/* 2. 지도 화면: 토큰 없으면 로그인 창으로 쫓겨남 */}
        <Route path="/map" element={
          isAuthenticated ? <MapPage /> : <Navigate to="/" replace />
        } />

        {/* 그 외 모든 이상한 경로는 상태에 따라 / 또는 /map으로 */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/map" : "/"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;