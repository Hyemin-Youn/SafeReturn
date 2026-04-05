import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditNickname = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [nickname, setNickname] = useState(user?.nickname || '');

  const handleSave = () => {
    if (!nickname.trim()) return alert('닉네임을 입력해주세요.');
    const updatedUser = { ...user, nickname };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    alert('닉네임이 변경되었습니다.');
    navigate('/mypage');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>닉네임 변경</h2>
        <input 
          style={styles.input}
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="새로운 닉네임"
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

export default EditNickname;