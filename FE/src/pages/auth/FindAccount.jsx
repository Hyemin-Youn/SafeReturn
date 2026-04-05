import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axiosInstance';

const FindAccount = () => {
  const [tab, setTab] = useState('id'); // 'id' 또는 'pw'
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleFindId = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/find-id', { phone });
      alert(`찾으시는 이메일은 ${res.data.email} 입니다.`);
    } catch (err) {
      alert('해당 정보로 등록된 계정이 없습니다.');
    }
  };

  const handleFindPw = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/find-pw', { email });
      alert('입력하신 이메일로 임시 비밀번호를 발송했습니다.');
    } catch (err) {
      alert('가입되지 않은 이메일입니다.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.logo}>계정 찾기</h1>
        <p style={styles.subtitle}>분실하신 정보를 안전하게 찾아드립니다.</p>

        {/* 탭 메뉴 디자인 */}
        <div style={styles.tabContainer}>
          <button 
            onClick={() => setTab('id')} 
            style={{
              ...styles.tabButton,
              color: tab === 'id' ? '#6C5CE7' : '#A3AED0',
              borderBottom: tab === 'id' ? '2px solid #6C5CE7' : '2px solid transparent'
            }}
          >
            이메일 찾기
          </button>
          <button 
            onClick={() => setTab('pw')} 
            style={{
              ...styles.tabButton,
              color: tab === 'pw' ? '#6C5CE7' : '#A3AED0',
              borderBottom: tab === 'pw' ? '2px solid #6C5CE7' : '2px solid transparent'
            }}
          >
            비밀번호 찾기
          </button>
        </div>

        {/* 폼 영역 */}
        <div style={{ marginTop: '20px' }}>
          {tab === 'id' ? (
            <form onSubmit={handleFindId} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>등록된 전화번호</label>
                <input 
                  type="text" 
                  placeholder="010-0000-0000" 
                  value={phone} 
                  onChange={e => setPhone(e.target.value)} 
                  required 
                  style={styles.input} 
                />
              </div>
              <button type="submit" style={styles.button}>이메일 찾기</button>
            </form>
          ) : (
            <form onSubmit={handleFindPw} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>가입된 이메일</label>
                <input 
                  type="email" 
                  placeholder="example@safe.com" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  required 
                  style={styles.input} 
                />
              </div>
              <button type="submit" style={styles.button}>임시 비밀번호 발송</button>
            </form>
          )}
        </div>

        <div style={styles.footer}>
          <Link to="/" style={styles.link}>로그인 화면으로 돌아가기</Link>
        </div>
      </div>
    </div>
  );
};

// ✨ 공통 테마를 반영한 스타일 객체
const styles = {
  container: {
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    height: '100vh', backgroundColor: '#F4F7FE', padding: '20px'
  },
  card: {
    width: '100%', maxWidth: '400px', padding: '40px',
    backgroundColor: '#FFFFFF', borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)', textAlign: 'center',
  },
  logo: { fontSize: '28px', fontWeight: 'bold', color: '#6C5CE7', marginBottom: '8px' },
  subtitle: { fontSize: '14px', color: '#A3AED0', marginBottom: '30px' },
  tabContainer: {
    display: 'flex', borderBottom: '1px solid #E0E5F2', marginBottom: '10px'
  },
  tabButton: {
    flex: 1, padding: '12px', border: 'none', background: 'none',
    fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s'
  },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  inputGroup: { textAlign: 'left' },
  label: { display: 'block', fontSize: '12px', color: '#2B3674', fontWeight: 'bold', marginBottom: '8px', marginLeft: '4px' },
  input: {
    width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #E0E5F2',
    fontSize: '14px', outline: 'none', boxSizing: 'border-box'
  },
  button: {
    width: '100%', padding: '14px', backgroundColor: '#6C5CE7', color: '#FFFFFF',
    border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold',
    cursor: 'pointer', marginTop: '10px'
  },
  footer: { marginTop: '24px', fontSize: '13px', color: '#A3AED0' },
  link: { textDecoration: 'none', color: '#6C5CE7', fontWeight: 'bold' }
};

export default FindAccount;