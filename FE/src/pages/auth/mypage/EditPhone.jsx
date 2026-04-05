import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditPhone = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [phone, setPhone] = useState(user?.phone || '');

  const handleSave = () => {
    const updatedUser = { ...user, phone };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    alert('휴대폰 번호가 저장되었습니다.');
    navigate('/mypage');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>휴대폰 번호 변경</h2>
        <input 
          style={styles.input}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="010-0000-0000"
        />
        <button style={styles.saveBtn} onClick={handleSave}>저장하기</button>
        <button style={styles.backBtn} onClick={() => navigate(-1)}>취소</button>
      </div>
    </div>
  );
};

const styles = { 
  container: { backgroundColor: '#F4F5F7', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  card: { width: '90%', maxWidth: '400px', backgroundColor: '#fff', borderRadius: '24px', padding: '40px', textAlign: 'center' },
  title: { fontSize: '20px', fontWeight: 'bold', color: '#2B3674', marginBottom: '30px' },
  input: { width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #E0E5F2', marginBottom: '15px', boxSizing: 'border-box' },
  saveBtn: { width: '100%', padding: '15px', backgroundColor: '#6C5CE7', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '10px' },
  backBtn: { width: '100%', padding: '15px', backgroundColor: '#F4F7FE', color: '#6C5CE7', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' },
};

export default EditPhone;