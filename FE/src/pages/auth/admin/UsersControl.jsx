import React from 'react';
import AdminLayout from '../../../components/layout/AdminLayout';

const users = [
  { id: 1, name: '김민수', email: 'minsu@example.com', role: '사용자', status: '활성', date: '2026-01-15' },
  { id: 2, name: '이지은', email: 'jieun@example.com', role: '사용자', status: '활성', date: '2026-02-20' },
  { id: 3, name: '박철수', email: 'chulsoo@example.com', role: '사용자', status: '차단', date: '2026-01-10' },
  { id: 4, name: '홍혜민', email: 'admin@example.com', role: '관리자', status: '활성', date: '2025-12-01' },
];

const StatCard = ({ label, value, color, icon }) => (
  <div style={statCardStyle}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#A3AED0', fontSize: '14px', fontWeight: '600' }}>
      <span style={{ fontSize: '18px' }}>{icon}</span> {label}
    </div>
    <div style={{ fontSize: '32px', fontWeight: '800', color: color || '#2B3674', marginTop: '4px' }}>{value}</div>
  </div>
);

const roleBadge = (role) => ({
  padding: '6px 16px', borderRadius: '12px', fontSize: '12px', fontWeight: '700',
  backgroundColor: role === '관리자' ? '#7048FF' : '#F4F7FE',
  color: role === '관리자' ? '#fff' : '#2B3674',
  display: 'inline-block',
});

const statusBadge = (status) => ({
  padding: '6px 16px', borderRadius: '12px', fontSize: '12px', fontWeight: '700',
  backgroundColor: status === '활성' ? '#EFFFF4' : '#FFEFEF',
  color: status === '활성' ? '#05CD99' : '#EE5D50',
  display: 'inline-block',
});

const UsersControl = () => (
  <AdminLayout>
    <div style={containerStyle}>
      <header style={{ marginBottom: '32px' }}>
        <h2 style={titleStyle}>사용자 관리</h2>
        <p style={subTitleStyle}>시스템 사용자를 관리하고 권한을 설정합니다</p>
      </header>

      <div style={{ position: 'relative', marginBottom: '24px' }}>
        <input type="text" placeholder="사용자 이름 또는 이메일로 검색..." style={searchInputStyle} />
      </div>

      <div style={statsGridStyle}>
        <StatCard label="활성 사용자" value="3" color="#05CD99" icon="👤" />
        <StatCard label="차단된 사용자" value="1" color="#EE5D50" icon="👥" />
        <StatCard label="관리자" value="1" color="#4318FF" icon="🛡️" />
      </div>

      <div style={tableContainerStyle}>
        <table style={tableStyle}>
          <thead>
            <tr style={trHeadStyle}>
              <th style={thStyle}>이름</th>
              <th style={thStyle}>이메일</th>
              <th style={thStyle}>권한</th>
              <th style={thStyle}>상태</th>
              <th style={thStyle}>가입일</th>
              <th style={thStyle}>관리</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} style={trBodyStyle}>
                <td style={tdStyle}>{user.name}</td>
                <td style={tdStyle}>{user.email}</td>
                <td style={tdStyle}><span style={roleBadge(user.role)}>{user.role}</span></td>
                <td style={tdStyle}><span style={statusBadge(user.status)}>{user.status}</span></td>
                <td style={tdStyle}>{user.date}</td>
                <td style={{ ...tdStyle, color: '#4318FF', cursor: 'pointer', fontWeight: '700', textAlign: 'right', paddingRight: '30px' }}>관리</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </AdminLayout>
);

/* ── Styles ── */
const containerStyle = { padding: '10px' };
const titleStyle = { fontSize: '26px', fontWeight: '800', color: '#2B3674', margin: 0 };
const subTitleStyle = { color: '#A3AED0', fontSize: '14px', marginTop: '6px' };

const searchInputStyle = {
  width: '350px', padding: '14px 20px', borderRadius: '15px',
  border: 'none', fontSize: '14px', color: '#2B3674',
  outline: 'none', marginBottom: '10px', boxShadow: '0px 4px 12px rgba(0,0,0,0.03)',
  backgroundColor: '#fff',
};

const statsGridStyle = {
  display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px',
};

const statCardStyle = {
  backgroundColor: '#fff', borderRadius: '20px', padding: '24px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.02)', border: '1px solid #F4F7FE'
};

const tableContainerStyle = {
  backgroundColor: '#fff', borderRadius: '20px', overflow: 'hidden',
  boxShadow: '0 10px 30px rgba(0,0,0,0.02)', padding: '10px'
};

const tableStyle = {
  width: '100%', borderCollapse: 'collapse', fontSize: '14px',
};

const trHeadStyle = {
  color: '#A3AED0', fontWeight: '600', fontSize: '13px',
  borderBottom: '1px solid #F4F7FE',
};

const thStyle = {
  textAlign: 'left', padding: '20px 24px', color: '#A3AED0',
};

const trBodyStyle = {
  borderBottom: '1px solid #F4F7FE', color: '#2B3674',
  transition: 'background-color 0.2s'
};

const tdStyle = {
  padding: '24px', // 사진처럼 행 간격을 넓히는 핵심 부분입니다
  verticalAlign: 'middle',
};

export default UsersControl;