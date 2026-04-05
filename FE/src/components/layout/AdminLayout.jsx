import React from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Shield,
  Bell,
  Settings,
  LogOut,
  Search,
  Lock,
} from 'lucide-react';

const NAV_ITEMS = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
  { to: '/admin/users', icon: Users, label: 'Users Control' },
  { to: '/admin/reports', icon: Shield, label: 'Safety Reports' },
  { to: '/admin/notifications', icon: Bell, label: 'Notifications' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
];

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  
  // 로컬 스토리지에서 유저 정보 가져오기
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.clear(); // 토큰과 유저 정보 모두 삭제
    alert('로그아웃 되었습니다.');
    navigate('/'); // 로그인(메인) 페이지로 이동
  };

  return (
    <div style={layoutContainer}>
      {/* ── Sidebar ── */}
      <aside style={sidebarStyle}>
        {/* Logo - 클릭 시 마이페이지로 이동 (경로 수정됨) */}
        <Link to="/mypage" style={logoLinkStyle}>
          <div style={logoWrapper}>
            <div style={logoIcon}>
              <Lock size={20} color="#ffffff" strokeWidth={3} />
            </div>
            <span style={logoText}>안심이음</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav style={navMenu}>
          {NAV_ITEMS.map(({ to, icon: Icon, label, exact }) => (
            <NavLink
              key={to}
              to={to}
              end={exact}
              style={({ isActive }) => ({
                ...menuItemBase,
                backgroundColor: isActive ? '#4318FF' : 'transparent',
                color: isActive ? '#ffffff' : '#A3AED0',
              })}
              title={label}
            >
              <Icon size={20} strokeWidth={1.8} style={{ flexShrink: 0 }} />
              <span style={menuLabel}>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout (Sidebar Bottom) */}
        <div style={sidebarFooter}>
          <button onClick={handleLogout} style={logoutBtnStyle}>
            <LogOut size={20} strokeWidth={1.8} style={{ flexShrink: 0 }} />
            <span style={menuLabel}>Logout</span>
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main style={mainContent}>
        {/* Header */}
        <header style={navbarStyle}>
          <div style={navTitleSection}>
            <span style={navTitleText}>관리자 페이지</span>
            <span style={stationBadge}>강남역</span>
            <Search
              size={18}
              strokeWidth={2}
              color="#A3AED0"
              style={{ cursor: 'pointer' }}
              aria-label="검색"
            />
          </div>
        <div style={navUserSection}>
          {/* ⭐ 사용자의 role에 따라 '관리자' 또는 '사용자'로 표시되도록 수정 */}
          <span style={adminLabel}>
            {user?.role === 'admin' ? '관리자' : '사용자'} {user?.nickname || user?.name || '이름없음'} 님
          </span>
          <button onClick={handleLogout} style={topLogoutBtn}>
            로그아웃
          </button>
        </div>
        </header>

        {/* Page content */}
        <div style={contentArea}>{children}</div>
      </main>
    </div>
  );
};

/* ── Styles (기존과 동일하지만 가독성을 위해 포함) ── */
const layoutContainer = {
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: '#F4F7FE',
  fontFamily: "'Noto Sans KR', system-ui, sans-serif",
};

const sidebarStyle = {
  width: '248px',
  flexShrink: 0,
  backgroundColor: '#111C44',
  color: '#ffffff',
  display: 'flex',
  flexDirection: 'column',
  padding: '28px 16px',
  position: 'sticky',
  top: 0,
  height: '100vh',
  boxSizing: 'border-box',
  overflowY: 'auto',
};

const logoLinkStyle = {
  textDecoration: 'none',
  color: 'inherit',
  display: 'block',
};

const logoWrapper = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '0 8px',
  marginBottom: '40px',
  cursor: 'pointer',
};

const logoIcon = {
  width: '36px',
  height: '36px',
  minWidth: '36px',
  backgroundColor: '#7551FF',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const logoText = {
  fontSize: '19px',
  fontWeight: '800',
  letterSpacing: '1px',
  whiteSpace: 'nowrap',
};

const navMenu = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  flex: 1,
};

const menuItemBase = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 14px',
  borderRadius: '14px',
  textDecoration: 'none',
  transition: 'background-color 0.2s, color 0.2s',
  fontSize: '14px',
  fontWeight: '600',
  whiteSpace: 'nowrap',
};

const menuLabel = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

const sidebarFooter = {
  paddingTop: '16px',
  borderTop: '1px solid rgba(255,255,255,0.08)',
};

const logoutBtnStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  width: '100%',
  background: 'none',
  border: 'none',
  color: '#A3AED0',
  padding: '12px 14px',
  borderRadius: '14px',
  fontSize: '14px',
  fontWeight: '600',
  cursor: 'pointer',
  textAlign: 'left',
};

const mainContent = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0,
};

const navbarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '18px 32px',
  backgroundColor: '#F4F7FE',
  position: 'sticky',
  top: 0,
  zIndex: 50,
};

const navTitleSection = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
};

const navTitleText = {
  fontSize: '20px',
  fontWeight: '700',
  color: '#2B3674',
};

const stationBadge = {
  backgroundColor: '#ffffff',
  border: '1px solid #E0E5F2',
  color: '#2B3674',
  fontSize: '13px',
  fontWeight: '600',
  padding: '4px 14px',
  borderRadius: '20px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
};

const navUserSection = {
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
};

const adminLabel = {
  fontSize: '14px',
  fontWeight: '700',
  color: '#FF6B35',
};

const topLogoutBtn = {
  background: 'none',
  border: 'none',
  fontSize: '14px',
  fontWeight: '600',
  color: '#EE5D50',
  cursor: 'pointer',
  padding: 0,
};

const contentArea = {
  flex: 1,
  padding: '8px 32px 32px',
  boxSizing: 'border-box',
};

export default AdminLayout;