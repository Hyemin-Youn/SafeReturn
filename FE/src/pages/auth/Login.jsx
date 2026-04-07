import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/axiosInstance';
import streetImg from '../../assets/street.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Login.jsx의 handleLogin 함수 부분 수정
const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await api.post('/auth/login', { email, password });
    const { accessToken, user } = response.data;
    
    // 1. 로컬 스토리지에 저장
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user', JSON.stringify(user));

    // 2. [수정] 무조건 지도(/map)로 보내기
    // 만약 관리자 페이지가 따로 필요 없다면 바로 /map으로 쏘세요!
    navigate('/map'); 
    
    // 페이지 강제 새로고침 (App.jsx의 isAuthenticated를 새로고침 없이 반영하기 위함)
    window.location.reload(); 
  } catch (err) {
    alert('이메일 또는 비밀번호를 확인해주세요.');
  }
};

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        
        {/* 왼쪽: 이미지 섹션 */}
        <div style={styles.imageSection}>
          <div style={styles.imageBackgroundBlob}>
            <img src={streetImg} alt="안전한 귀갓길" style={styles.heroImage} />
          </div>
        </div>

        {/* 오른쪽: 로그인 폼 섹션 */}
        <div style={styles.formSection}>
          <div style={styles.formContent}>
            <h1 style={styles.logo}>안심 이음</h1>
            <p style={styles.subtitle}>안전한 귀갓길을 위한 첫걸음</p>

            <form onSubmit={handleLogin} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>이메일</label>
                <input 
                  type="email" 
                  placeholder="이메일 주소를 입력하세요" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  required 
                  style={styles.input} 
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>비밀번호</label>
                <input 
                  type="password" 
                  placeholder="비밀번호를 입력하세요" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  required 
                  style={styles.input} 
                />
              </div>

              <button type="submit" style={styles.button}>로그인</button>
            </form>

            <div style={styles.footer}>
              <Link to="/register" style={styles.link}>회원가입</Link>
              <span style={styles.divider}>|</span>
              <Link to="/find-account" style={styles.link}>이메일·비밀번호 찾기</Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#F4F7FE', 
    boxSizing: 'border-box',
  },
  contentWrapper: {
    display: 'flex',
    width: '90%',
    maxWidth: '1000px',
    minHeight: '600px',
    backgroundColor: '#FFFFFF',
    borderRadius: '40px',
    boxShadow: '0 20px 50px rgba(108, 92, 231, 0.05)', 
    overflow: 'hidden',
  },
  imageSection: {
    flex: 1,
    backgroundColor: '#F8FAFF', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
  },
  imageBackgroundBlob: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF', 
    // 기존 '60px 20px 60px 60px'에서 균일한 '40px'로 수정
    borderRadius: '40px', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    boxShadow: 'inset 0 0 20px rgba(0,0,0,0.02)',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  formSection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
  },
  formContent: {
    width: '100%',
    maxWidth: '340px',
  },
  logo: { fontSize: '32px', fontWeight: 'bold', color: '#6C5CE7', marginBottom: '8px', textAlign: 'center' },
  subtitle: { fontSize: '15px', color: '#A3AED0', marginBottom: '32px', textAlign: 'center' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  inputGroup: { textAlign: 'left' },
  label: { display: 'block', fontSize: '13px', color: '#2B3674', fontWeight: 'bold', marginBottom: '8px', marginLeft: '4px' },
  input: {
    width: '100%', padding: '14px 18px', borderRadius: '14px', border: '1px solid #E0E5F2',
    fontSize: '15px', outline: 'none', boxSizing: 'border-box', backgroundColor: '#F8FAFF'
  },
  button: {
    width: '100%', padding: '16px', backgroundColor: '#6C5CE7', color: '#FFFFFF',
    border: 'none', borderRadius: '14px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px'
  },
  footer: { marginTop: '24px', fontSize: '14px', color: '#A3AED0', display: 'flex', justifyContent: 'center', gap: '10px' },
  divider: { color: '#E0E5F2' },
  link: { textDecoration: 'none', color: '#6C5CE7', fontWeight: '600' }
};

export default Login;