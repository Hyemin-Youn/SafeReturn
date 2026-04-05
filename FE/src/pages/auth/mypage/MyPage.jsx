import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, ChevronRight } from 'lucide-react';
import userImg from '../../../assets/user.png'; 

const MyPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      console.log("현재 로그인된 유저 데이터:", parsedUser); // 데이터 확인용 콘솔
      setUser(parsedUser);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    alert('로그아웃 되었습니다.');
    navigate('/');
  };

  const handleWithdrawal = async () => {
    if (window.confirm('정말 탈퇴하시겠습니까? 모든 정보가 삭제됩니다.')) {
      localStorage.clear();
      alert('탈퇴 처리가 완료되었습니다.');
      navigate('/register');
    }
  };

  if (!user) return <div style={styles.loading}>로딩 중...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h2 style={styles.headerTitle}>마이페이지</h2>

        {/* 1. 프로필 상단 헤더 */}
        <div style={styles.profileHeader}>
          <div style={styles.avatarWrapper}>
            <div style={styles.avatar}>
              <img 
                src={userImg} 
                alt="profile" 
                style={styles.avatarImg} 
                onError={(e) => { e.target.src = "https://via.placeholder.com/100"; }}
              />
              <button style={styles.cameraBtn}><Camera size={14} color="#666" /></button>
            </div>
          </div>
          {/* nickname이 없으면 name, 그것도 없으면 '사용자' */}
          <h3 style={styles.userName}>{user.nickname || user.name || '사용자'}</h3>
          {/* email이 없으면 userId 확인, 둘 다 없으면 직접 가입하신 메일 표시 */}
          <p style={styles.userEmail}>{user.email || user.userId || 'safewalk.system@gmail.com'}</p>
        </div>

        {/* 2. 본인인증 안내 배너 */}
        <div style={styles.authBanner}>
          <div style={styles.authInfo}>
            <p style={styles.authTitle}>본인인증이 필요해요</p>
            <p style={styles.authDescription}>안전한 서비스 이용을 위해 본인 인증을 완료해주세요.</p>
          </div>
          <button style={styles.authBtn}>인증하기</button>
        </div>

        {/* 3. 상세 정보 리스트 섹션 */}
        <div style={styles.infoSection}>
          <InfoRow 
            label="닉네임" 
            value={user.nickname || user.name || '미설정'} 
            showButton 
            onEdit={() => navigate('/mypage/edit-nickname')} 
          />
          <InfoRow 
            label="휴대폰 번호" 
            value={user.phone || "010-1234-5678"} 
            showButton 
            subText={!user.phone ? "인증 필요" : ""} 
            onEdit={() => navigate('/mypage/edit-phone')}
          />
          <InfoRow 
            label="이메일" 
            value={user.email || user.userId || 'safewalk.system@gmail.com'} 
          />
          <InfoRow 
            label="권한" 
            value={user.role === 'admin' ? '관리자 (Admin)' : '일반 사용자'} 
          />
          <InfoRow 
            label="비밀번호" 
            value="••••••••" 
            showButton 
            onEdit={() => navigate('/mypage/edit-password')}
          />
        </div>

        <div style={styles.footer}>
          <button onClick={handleLogout} style={styles.logoutBtn}>로그아웃</button>
          <button onClick={handleWithdrawal} style={styles.withdrawBtn}>회원 탈퇴하기</button>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value, showButton, subText, onEdit }) => (
  <div style={styles.row}>
    <span style={styles.rowLabel}>{label}</span>
    <div style={styles.rowContent}>
      <span style={styles.rowValue}>{value}</span>
      {subText && <span style={styles.rowSubText}>{subText}</span>}
    </div>
    {showButton ? (
      <button style={styles.changeBtn} onClick={onEdit}>변경</button>
    ) : (
      <ChevronRight size={16} color="#ccc" />
    )}
  </div>
);

const styles = {
  container: { backgroundColor: '#F4F5F7', minHeight: '100vh', display: 'flex', justifyContent: 'center', padding: '40px 20px', fontFamily: 'Pretendard, sans-serif' },
  content: { width: '100%', maxWidth: '500px', backgroundColor: '#fff', borderRadius: '24px', padding: '40px 0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', position: 'relative' },
  headerTitle: { textAlign: 'center', fontSize: '18px', fontWeight: 'bold', color: '#333', marginBottom: '35px' },
  profileHeader: { textAlign: 'center', marginBottom: '30px' },
  avatarWrapper: { position: 'relative', display: 'inline-block', marginBottom: '15px' },
  avatar: { width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#F0F0F0', overflow: 'hidden', border: '3px solid #fff', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' },
  avatarImg: { width: '100%', height: '100%', objectFit: 'cover' },
  cameraBtn: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
  userName: { fontSize: '22px', fontWeight: 'bold', color: '#2B3674', margin: '5px 0' },
  userEmail: { fontSize: '14px', color: '#A3AED0' },
  authBanner: { backgroundColor: '#F8F9FB', margin: '25px', padding: '20px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  authTitle: { fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '4px' },
  authDescription: { fontSize: '12px', color: '#666' },
  authBtn: { padding: '8px 16px', backgroundColor: '#6C5CE7', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' },
  infoSection: { padding: '0 25px' },
  row: { display: 'flex', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid #F4F7FE' },
  rowLabel: { width: '90px', fontSize: '14px', color: '#888', fontWeight: '500' },
  rowContent: { flex: 1, display: 'flex', alignItems: 'center', gap: '8px' },
  rowValue: { fontSize: '15px', color: '#2B3674', fontWeight: '600' },
  rowSubText: { fontSize: '11px', color: '#EE5D50', backgroundColor: '#FFEFEF', padding: '2px 6px', borderRadius: '4px' },
  changeBtn: { padding: '5px 12px', border: '1px solid #E0E5F2', backgroundColor: '#fff', borderRadius: '6px', fontSize: '12px', color: '#666', cursor: 'pointer' },
  footer: { textAlign: 'center', marginTop: '40px', paddingBottom: '20px' },
  logoutBtn: { padding: '12px 30px', backgroundColor: '#F4F7FE', color: '#6C5CE7', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '20px' },
  withdrawBtn: { display: 'block', margin: '0 auto', background: 'none', border: 'none', color: '#A3AED0', fontSize: '13px', textDecoration: 'underline', cursor: 'pointer' },
  loading: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#6C5CE7' }
};

export default MyPage;