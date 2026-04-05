import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../routes/ProtectedRoute'; 

// 인증 관련 페이지
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register'; 
import FindAccount from '../pages/auth/FindAccount'; 

// 관리자 관련 페이지
import AdminDashboard from '../pages/auth/admin/AdminDashboard';
import UsersControl from '../pages/auth/admin/UsersControl';
import SafetyReports from '../pages/auth/admin/SafetyReports';
import Notifications from '../pages/auth/admin/Notifications';
import Settings from '../pages/auth/admin/Settings';

// 마이페이지 및 정보 수정 페이지
import MyPage from '../pages/auth/mypage/MyPage';
import EditNickname from '../pages/auth/mypage/EditNickname';
import EditPhone from '../pages/auth/mypage/EditPhone';
import EditPassword from '../pages/auth/mypage/EditPassword';

const AppRoutes = () => {
  return (
    <Routes>
      {/* 🟢 공개 경로 */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/find-account" element={<FindAccount />} />

      {/* 🔴 관리자 전용 경로 (isAdmin={true} 적용) */}
      <Route path="/admin" element={<ProtectedRoute isAdmin={true}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute isAdmin={true}><UsersControl /></ProtectedRoute>} />
      <Route path="/admin/reports" element={<ProtectedRoute isAdmin={true}><SafetyReports /></ProtectedRoute>} />
      <Route path="/admin/notifications" element={<ProtectedRoute isAdmin={true}><Notifications /></ProtectedRoute>} />
      <Route path="/admin/settings" element={<ProtectedRoute isAdmin={true}><Settings /></ProtectedRoute>} />
      
      {/* 🟡 일반 로그인 유저 전용 경로 */}
      <Route path="/mypage" element={<ProtectedRoute><MyPage /></ProtectedRoute>} />
      <Route path="/mypage/edit-nickname" element={<ProtectedRoute><EditNickname /></ProtectedRoute>} />
      <Route path="/mypage/edit-phone" element={<ProtectedRoute><EditPhone /></ProtectedRoute>} />
      <Route path="/mypage/edit-password" element={<ProtectedRoute><EditPassword /></ProtectedRoute>} />

      {/* 잘못된 경로는 로그인으로 리다이렉트 */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;