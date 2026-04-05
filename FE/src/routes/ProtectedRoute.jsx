import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAdmin = false }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  // 1. 로그인 여부 확인 (없으면 로그인 페이지로)
  if (!user) return <Navigate to="/" replace />;

  // 2. 관리자 권한 확인 (isAdmin이 true인데 권한이 없으면 차단)
  if (isAdmin && user.role !== 'admin') {
    alert('관리자 권한이 없습니다.');
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;