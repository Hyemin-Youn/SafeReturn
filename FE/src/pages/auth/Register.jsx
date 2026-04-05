import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/axiosInstance';

const Register = () => {
  const [formData, setFormData] = useState({ 
    nickname: '', // 이름 대신 닉네임을 주요 식별자로 사용
    email: '', 
    phone: '', 
    password: '' 
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const isPasswordMatch = formData.password === confirmPassword;

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isPasswordMatch) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    /* --- [임시 개발용 로직] 서버 없이 바로 통과하기 --- */
    alert(`테스트 모드: '${formData.nickname}'님, 환영합니다! 관리자 페이지로 이동합니다.`);
    
    localStorage.setItem('accessToken', 'temp-master-token-1234');
    localStorage.setItem('user', JSON.stringify({
      nickname: formData.nickname,
      email: formData.email,  
      phone: formData.phone,
      role: 'admin' 
    }));

    navigate('/admin'); 
    /* ------------------------------------------- */

    /* // --- [실제 서버 연결용 코드] ---
    try {
      const submitData = {
        ...formData,
        phone: formData.phone.replace(/-/g, '')
      };
      
      await api.post('/auth/register', submitData);
      alert('회원가입이 완료되었습니다! 로그인해주세요.');
      navigate('/'); 
    } catch (err) {
      console.error("회원가입 상세 에러:", err.response?.data || err.message);
      alert('이미 존재하는 이메일/닉네임이거나 입력 정보가 올바르지 않습니다.');
    }
    */
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <div style={styles.formSection}>
          <div style={styles.formContent}>
            <h1 style={styles.logo}>안심 이음</h1>
            <p style={styles.subtitle}>새로운 안심 가족이 되어주세요</p>

            <form onSubmit={handleRegister} style={styles.form}>
              
              {/* 닉네임 */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>닉네임</label>
                <input 
                  type="text" 
                  placeholder="서비스에서 사용할 별명을 입력하세요" 
                  style={styles.input} 
                  value={formData.nickname}
                  onChange={e => setFormData({...formData, nickname: e.target.value})} 
                  required 
                />
              </div>

              {/* 이메일 */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>이메일</label>
                <input 
                  type="email" 
                  placeholder="example@email.com" 
                  style={styles.input} 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})} 
                  required 
                />
              </div>

              {/* 휴대폰 번호 */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>휴대폰 번호</label>
                <input 
                  type="tel" 
                  placeholder="010-0000-0000" 
                  style={styles.input} 
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})} 
                  required 
                />
              </div>
              
              {/* 비밀번호 */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>비밀번호</label>
                <input 
                  type="password" 
                  placeholder="8자 이상 입력하세요" 
                  style={styles.input} 
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})} 
                  required 
                />
              </div>
              
              {/* 비밀번호 확인 */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>비밀번호 확인</label>
                <input 
                  type="password" 
                  placeholder="다시 한번 입력하세요" 
                  style={styles.input} 
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)} 
                  required 
                />
                {confirmPassword && (
                  <p style={{ 
                    fontSize: '11px', 
                    color: isPasswordMatch ? '#6C5CE7' : '#D63031', 
                    textAlign: 'left',
                    marginTop: '4px',
                    marginLeft: '4px'
                  }}>
                    {isPasswordMatch ? '✓ 일치합니다.' : '✕ 일치하지 않습니다.'}
                  </p>
                )}
              </div>

              <button 
                type="submit" 
                disabled={!isPasswordMatch} 
                style={{
                  ...styles.button,
                  backgroundColor: isPasswordMatch ? '#6C5CE7' : '#E0E5F2',
                  cursor: isPasswordMatch ? 'pointer' : 'not-allowed'
                }}
              >
                가입하기
              </button>
            </form>

            <div style={styles.footer}>
              이미 계정이 있으신가요? <Link to="/" style={styles.link}>로그인</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    width: '100%', minHeight: '100vh', backgroundColor: '#F4F7FE', boxSizing: 'border-box',
  },
  contentWrapper: {
    width: '100%', maxWidth: '400px', minHeight: 'auto', 
    backgroundColor: '#FFFFFF', borderRadius: '30px',
    boxShadow: '0 15px 35px rgba(108, 92, 231, 0.05)', overflow: 'hidden',
    margin: '20px'
  },
  formSection: {
    display: 'flex', flexDirection: 'column',
    justifyContent: 'center', alignItems: 'center', padding: '30px',
  },
  formContent: {
    width: '100%',
  },
  logo: { fontSize: '26px', fontWeight: 'bold', color: '#6C5CE7', marginBottom: '4px', textAlign: 'center' },
  subtitle: { fontSize: '13px', color: '#A3AED0', marginBottom: '20px', textAlign: 'center' },
  form: { display: 'flex', flexDirection: 'column', gap: '12px' },
  inputGroup: { textAlign: 'left' },
  label: { display: 'block', fontSize: '12px', color: '#2B3674', fontWeight: 'bold', marginBottom: '6px', marginLeft: '4px' },
  input: {
    width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid #E0E5F2',
    fontSize: '14px', outline: 'none', boxSizing: 'border-box', backgroundColor: '#F8FAFF'
  },
  button: {
    width: '100%', padding: '14px', color: '#FFFFFF',
    border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: 'bold',
    marginTop: '5px', transition: 'all 0.3s'
  },
  footer: { marginTop: '18px', fontSize: '13px', color: '#A3AED0', textAlign: 'center' },
  link: { textDecoration: 'none', color: '#6C5CE7', fontWeight: 'bold' }
};

export default Register;