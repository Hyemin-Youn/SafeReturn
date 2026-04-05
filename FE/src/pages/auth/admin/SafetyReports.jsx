import React from 'react';
import AdminLayout from '../../../components/layout/AdminLayout';

const reports = [
  {
    id: 1, loc: '강남역 10번 출구 인근', type: 'CRITICAL RISK', status: '처리 대기',
    content: '비정상적 접근 감지 - 보안 인증 요청', user: '김민수',
    time: '2026-03-31 03:45', border: '#EE5D50',
  },
  {
    id: 2, loc: '역삼동 골목길', type: 'WARNING', status: '처리 대기',
    content: '조명 불량 구역 발견', user: '이지은',
    time: '2026-03-31 03:50', border: '#FFB547',
  },
];

const StatCard = ({ label, value, color }) => (
  <div style={statCardStyle}>
    <div style={{ color, fontSize: '13px', fontWeight: '600' }}>{label}</div>
    <div style={{ fontSize: '28px', fontWeight: '800', color, marginTop: '6px' }}>{value}</div>
  </div>
);

const typeBadge = (type) => ({
  backgroundColor: type.includes('CRITICAL') ? '#FFEFEF' : '#FFF8EB',
  color: type.includes('CRITICAL') ? '#EE5D50' : '#FFB547',
  padding: '3px 10px', borderRadius: '6px', fontSize: '11px',
  fontWeight: '700', marginLeft: '8px', letterSpacing: '0.3px',
});

const SafetyReports = () => (
  <AdminLayout>
    <div style={containerStyle}>
      <h2 style={titleStyle}>안전 제보 관리</h2>

      <div style={statsGridStyle}>
        <StatCard label="긴급 제보" value="2" color="#EE5D50" />
        <StatCard label="경고" value="1" color="#FFB547" />
        <StatCard label="처리 대기" value="2" color="#4318FF" />
        <StatCard label="전체 제보" value="4" color="#A3AED0" />
      </div>

      <div style={reportListStyle}>
        {reports.map((r) => (
          <div key={r.id} style={{ ...reportCardStyle, borderLeft: `5px solid ${r.border}` }}>
            <div style={reportHeaderStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={locationStyle}>📍 {r.loc}</span>
                <span style={typeBadge(r.type)}>{r.type}</span>
                <span style={waitBadgeStyle}>{r.status}</span>
              </div>
            </div>
            <p style={reportContentStyle}>{r.content}</p>
            <div style={reportFooterStyle}>
              <span>👤 제보자: {r.user}</span>
              <span>🕒 {r.time}</span>
            </div>
            <div style={btnGroupStyle}>
              <button style={btnStyle('#4318FF')}>승인</button>
              <button style={btnStyle('#EE5D50')}>거부</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </AdminLayout>
);

const containerStyle = { maxWidth: '1000px' };
const titleStyle = { fontSize: '24px', fontWeight: '800', color: '#2B3674', marginBottom: '20px' };

const statsGridStyle = {
  display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px',
};

const statCardStyle = {
  backgroundColor: '#fff', borderRadius: '16px', padding: '20px 22px',
  boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
};

const reportListStyle = { display: 'flex', flexDirection: 'column', gap: '16px' };

const reportCardStyle = {
  backgroundColor: '#fff', borderRadius: '14px', padding: '20px 22px',
  border: '1px solid #E0E5F2', display: 'flex', flexDirection: 'column', gap: '12px',
  boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
};

const reportHeaderStyle = { display: 'flex', alignItems: 'center', justifyContent: 'space-between' };
const locationStyle = { fontSize: '15px', fontWeight: '700', color: '#2B3674' };

const waitBadgeStyle = {
  backgroundColor: '#F4F7FE', color: '#A3AED0',
  padding: '3px 10px', borderRadius: '6px', fontSize: '11px', marginLeft: '6px',
};

const reportContentStyle = { fontSize: '13px', color: '#4A5568', margin: 0, lineHeight: '1.5' };

const reportFooterStyle = {
  display: 'flex', gap: '16px', fontSize: '13px', color: '#A3AED0',
};

const btnGroupStyle = { display: 'flex', gap: '10px' };

const btnStyle = (bg) => ({
  backgroundColor: bg, color: '#fff', border: 'none',
  padding: '10px 24px', borderRadius: '10px', fontWeight: '700',
  fontSize: '14px', cursor: 'pointer',
});

export default SafetyReports;
