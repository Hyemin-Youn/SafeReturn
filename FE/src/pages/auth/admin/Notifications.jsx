import React from 'react';
import AdminLayout from '../../../components/layout/AdminLayout';

const alarms = [
  {
    id: 1, type: '긴급 위협 제보',
    content: '강남역 10번 출구에서 긴급 제보가 접수되었습니다.',
    time: '5분 전', color: '#EE5D50', bg: '#FFEFEF', unread: true,
  },
  {
    id: 2, type: '새로운 사용자 등록',
    content: '김민수 님이 새롭게 가입하였습니다.',
    time: '1시간 전', color: '#4318FF', bg: '#F4F7FE', unread: true,
  },
  {
    id: 3, type: '제보 처리 완료',
    content: '역삼동 골목길 관련 제보가 성공적으로 처리되었습니다.',
    time: '2시간 전', color: '#05CD99', bg: '#fff', unread: false,
  },
];

const StatCard = ({ label, value, color }) => (
  <div style={statCardStyle}>
    <div style={{ color, fontSize: '13px', fontWeight: '600' }}>{label}</div>
    <div style={{ fontSize: '28px', fontWeight: '800', color, marginTop: '6px' }}>{value}</div>
  </div>
);

const Notifications = () => (
  <AdminLayout>
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={titleStyle}>알림</h2>
        <button style={readAllBtnStyle}>모두 읽음으로 표시</button>
      </div>

      <div style={statsGridStyle}>
        <StatCard label="전체 알림" value="5" color="#4318FF" />
        <StatCard label="읽지 않음" value="2" color="#EE5D50" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {alarms.map((a) => (
          <div
            key={a.id}
            style={{ ...alarmCardStyle, borderLeft: `4px solid ${a.color}`, backgroundColor: a.bg }}
          >
            <div>
              <div style={{ fontWeight: '700', color: a.color, fontSize: '15px' }}>
                {a.type}
                {a.unread && <span style={dotStyle}> ●</span>}
              </div>
              <div style={{ color: '#707EAE', marginTop: '6px', fontSize: '14px' }}>{a.content}</div>
            </div>
            <div style={{ color: '#A3AED0', fontSize: '13px', flexShrink: 0 }}>{a.time}</div>
          </div>
        ))}
      </div>
    </div>
  </AdminLayout>
);

const containerStyle = { maxWidth: '800px' };
const titleStyle = { fontSize: '24px', fontWeight: '800', color: '#2B3674', margin: 0 };

const statsGridStyle = {
  display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px',
};

const statCardStyle = {
  backgroundColor: '#fff', borderRadius: '16px', padding: '20px 22px',
  boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
};

const readAllBtnStyle = {
  backgroundColor: '#4318FF', color: '#fff', border: 'none',
  padding: '10px 18px', borderRadius: '12px', fontWeight: '700',
  fontSize: '14px', cursor: 'pointer',
};

const alarmCardStyle = {
  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
  padding: '20px', borderRadius: '14px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
};

const dotStyle = { color: '#EE5D50', fontSize: '10px' };

export default Notifications;
