import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../../components/layout/AdminLayout';

const SafetyReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. 제보 데이터 불러오기
  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/reports'); // 제보 목록을 가져오는 API 엔드포인트
      setReports(response.data);
    } catch (error) {
      console.error("제보 데이터를 불러오는데 실패했습니다:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // 2. 승인/거부 처리 함수
  const handleAction = async (id, action) => {
    try {
      // action: 'approve' 또는 'reject' 등 백엔드 설계에 맞게 전달
      await axios.patch(`/api/reports/${id}`, { status: action });
      alert(`제보가 ${action === 'approve' ? '승인' : '거부'}되었습니다.`);
      fetchReports(); // 목록 새로고침
    } catch (error) {
      alert("처리 중 오류가 발생했습니다.");
    }
  };

  // 통계 계산 (실제 데이터 기반)
  const stats = {
    critical: reports.filter(r => r.type?.includes('CRITICAL')).length,
    warning: reports.filter(r => r.type === 'WARNING').length,
    pending: reports.filter(r => r.status === '처리 대기' || r.status === 'PENDING').length,
    total: reports.length
  };

  return (
    <AdminLayout>
      <div style={containerStyle}>
        <h2 style={titleStyle}>안전 제보 관리</h2>

        <div style={statsGridStyle}>
          <StatCard label="긴급 제보" value={stats.critical} color="#EE5D50" />
          <StatCard label="경고" value={stats.warning} color="#FFB547" />
          <StatCard label="처리 대기" value={stats.pending} color="#4318FF" />
          <StatCard label="전체 제보" value={stats.total} color="#A3AED0" />
        </div>

        <div style={reportListStyle}>
          {loading ? (
            <p>데이터를 불러오는 중입니다...</p>
          ) : reports.length === 0 ? (
            <p>현재 접수된 제보가 없습니다.</p>
          ) : (
            reports.map((r) => (
              <div key={r.id} style={{ ...reportCardStyle, borderLeft: `5px solid ${r.type?.includes('CRITICAL') ? '#EE5D50' : '#FFB547'}` }}>
                <div style={reportHeaderStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {/* 위치 정보가 위도/경도인 경우를 대비해 처리 */}
                    <span style={locationStyle}>📍 {r.loc || `${r.lat}, ${r.lng}`}</span>
                    <span style={typeBadge(r.type)}>{r.type}</span>
                    <span style={waitBadgeStyle}>{r.status}</span>
                  </div>
                </div>
                
                {/* 제보 이미지가 있다면 표시 */}
                {r.imageUrl && (
                  <img src={r.imageUrl} alt="제보 사진" style={{ width: '200px', borderRadius: '8px', marginTop: '10px' }} />
                )}

                <p style={reportContentStyle}>{r.content}</p>
                
                <div style={reportFooterStyle}>
                  <span>👤 제보자: {r.user || '익명'}</span>
                  <span>🕒 {r.time || r.createdAt}</span>
                </div>

                <div style={btnGroupStyle}>
                  <button onClick={() => handleAction(r.id, 'approve')} style={btnStyle('#4318FF')}>승인</button>
                  <button onClick={() => handleAction(r.id, 'reject')} style={btnStyle('#EE5D50')}>거부</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

// --- 이하 스타일 및 보조 컴포넌트 (기존과 동일하거나 일부 수정) ---

const StatCard = ({ label, value, color }) => (
  <div style={statCardStyle}>
    <div style={{ color, fontSize: '13px', fontWeight: '600' }}>{label}</div>
    <div style={{ fontSize: '28px', fontWeight: '800', color, marginTop: '6px' }}>{value}</div>
  </div>
);

const typeBadge = (type = "") => ({
  backgroundColor: type.includes('CRITICAL') ? '#FFEFEF' : '#FFF8EB',
  color: type.includes('CRITICAL') ? '#EE5D50' : '#FFB547',
  padding: '3px 10px', borderRadius: '6px', fontSize: '11px',
  fontWeight: '700', marginLeft: '8px', letterSpacing: '0.3px',
});

// (이하 스타일 객체들은 기존 코드와 동일)
const containerStyle = { maxWidth: '1000px' };
const titleStyle = { fontSize: '24px', fontWeight: '800', color: '#2B3674', marginBottom: '20px' };
const statsGridStyle = { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' };
const statCardStyle = { backgroundColor: '#fff', borderRadius: '16px', padding: '20px 22px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' };
const reportListStyle = { display: 'flex', flexDirection: 'column', gap: '16px' };
const reportCardStyle = { backgroundColor: '#fff', borderRadius: '14px', padding: '20px 22px', border: '1px solid #E0E5F2', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' };
const reportHeaderStyle = { display: 'flex', alignItems: 'center', justifyContent: 'space-between' };
const locationStyle = { fontSize: '15px', fontWeight: '700', color: '#2B3674' };
const waitBadgeStyle = { backgroundColor: '#F4F7FE', color: '#A3AED0', padding: '3px 10px', borderRadius: '6px', fontSize: '11px', marginLeft: '6px' };
const reportContentStyle = { fontSize: '13px', color: '#4A5568', margin: 0, lineHeight: '1.5' };
const reportFooterStyle = { display: 'flex', gap: '16px', fontSize: '13px', color: '#A3AED0' };
const btnGroupStyle = { display: 'flex', gap: '10px' };
const btnStyle = (bg) => ({ backgroundColor: bg, color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '10px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' });

export default SafetyReports;