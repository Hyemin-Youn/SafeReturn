import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditPassword = () => {
  const navigate = useNavigate();
  
  // 1. 로컬 스토리지에서 현재 사용자 정보 가져오기
  const user = JSON.parse(localStorage.getItem('user'));
  
  const [form, setForm] = useState({
    current: '',
    next: '',
    confirm: ''
  });

  const handleSave = () => {
    // 2. 현재 비밀번호 검증 (로컬 스토리지에 저장된 pw와 비교)
    // 실제 서비스에서는 보안상 백엔드 API를 통해 검증해야 합니다.
    if (form.current !== user.password) {
      return alert('현재 비밀번호가 일치하지 않습니다.');
    }

    // 3. 새 비밀번호 8자리 이상 검증
    if (form.next.length < 8) {
      return alert('새 비밀번호는 최소 8자리 이상이어야 합니다.');
    }

    // 4. 새 비밀번호와 확인용 비밀번호 일치 여부
    if (form.next !== form.confirm) {
      return alert('새 비밀번호 확인이 일치하지 않습니다.');
    }

    // 5. 현재 비밀번호와 새 비밀번호가 같은지 체크 (선택 사항)
    if (form.current === form.next) {
      return alert('현재와 다른 비밀번호를 입력해주세요.');
    }

    // 6. 변경 데이터 저장
    const updatedUser = { ...user, password: form.next };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    alert('비밀번호가 안전하게 변경되었습니다.');
    navigate('/mypage');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>비밀번호 변경</h2>
        <p style={styles.subtitle}>보안을 위해 8자리 이상의 비밀번호를 입력해주세요.</p>
        
        <input 
          type="password" 
          style={styles.input} 
          placeholder="현재 비밀번호" 
          value={form.current}
          onChange={e => setForm({...form, current: e.target.value})} 
        />
        <input 
          type="password" 
          style={styles.input} 
          placeholder="새 비밀번호 (8자리 이상)" 
          value={form.next}
          onChange={e => setForm({...form, next: e.target.value})} 
        />
        <input 
          type="password" 
          style={styles.input} 
          placeholder="새 비밀번호 확인" 
          value={form.confirm}
          onChange={e => setForm({...form, confirm: e.target.value})} 
        />

        <button style={styles.saveBtn} onClick={handleSave}>변경 완료</button>
        <button style={styles.backBtn} onClick={() => navigate(-1)}>취소</button>
      </div>
    </div>
  );
};

const styles = {
  container: { backgroundColor: '#F4F5F7', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' },
  card: { width: '100%', maxWidth: '400px', backgroundColor: '#fff', borderRadius: '24px', padding: '40px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' },
  title: { fontSize: '22px', fontWeight: 'bold', color: '#2B3674', marginBottom: '10px' },
  subtitle: { fontSize: '13px', color: '#A3AED0', marginBottom: '30px' },
  input: { width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #E0E5F2', marginBottom: '15px', boxSizing: 'border-box', outline: 'none', fontSize: '14px' },
  saveBtn: { width: '100%', padding: '15px', backgroundColor: '#6C5CE7', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '10px', fontSize: '16px' },
  backBtn: { width: '100%', padding: '15px', backgroundColor: '#F4F7FE', color: '#6C5CE7', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' },
};

export default EditPassword;