import React, { useState } from 'react';
import { ShieldCheck, Lock, BellRing, CheckCircle2, Ban } from 'lucide-react';
import AdminLayout from '../../../components/layout/AdminLayout';
import ReportCard from '../../../components/admin/ReportCard';
import styles from './AdminDashboard.module.css';

/* ── Mock data ── */
const MOCK_REPORTS = [
  {
    id: 1,
    locationName: '강남역 10번 출구 인근',
    content: '비정상적 접근 감지 - 보안 인증 요청',
    createdAt: '2026-03-31 03:45',
    imageUrl: '',
    category: '위험 감지',
    riskLevel: 'High',
  },
  {
    id: 2,
    locationName: '역삼동 골목길',
    content: '비정상적 접근 감지 - 보안 인증 요청',
    createdAt: '2026-03-31 03:50',
    imageUrl: '',
    category: '안전 시설',
    riskLevel: 'Medium',
  },
];

const STAT_CARDS = [
  { id: 'auth', icon: Lock, iconBg: '#FFF3E8', iconColor: '#FF9066', label: '실시간 인증 요청', value: 128, valueColor: '#4318FF' },
  { id: 'unhandled', icon: BellRing, iconBg: '#FFEFEF', iconColor: '#EE5D50', label: '미처리 보안 제보', value: null, valueColor: '#EE5D50' },
  { id: 'approved', icon: CheckCircle2, iconBg: '#E6FAF5', iconColor: '#05CD99', label: '오늘의 승인 건수', value: 45, valueColor: '#05CD99' },
  { id: 'blacklist', icon: Ban, iconBg: '#FFEFEF', iconColor: '#EE5D50', label: '블랙리스트 유저', value: 3, valueColor: '#EE5D50' },
];

const StatCard = ({ icon: Icon, iconBg, iconColor, label, value, valueColor }) => (
  <div className={styles.statCard}>
    <div className={styles.statTop}>
      <div className={styles.statIconWrap} style={{ backgroundColor: iconBg }}>
        <Icon size={22} color={iconColor} strokeWidth={2} />
      </div>
      <span className={styles.statLabel}>{label}</span>
    </div>
    <span className={styles.statValue} style={{ color: valueColor }}>{value}</span>
  </div>
);

const AdminDashboard = () => {
  const [reports, setReports] = useState(MOCK_REPORTS);

  const handleApprove = (id) => setReports((prev) => prev.filter((r) => r.id !== id));
  const handleReject = (id) => setReports((prev) => prev.filter((r) => r.id !== id));
  const handleRefresh = () => setReports(MOCK_REPORTS);

  const stats = STAT_CARDS.map((card) =>
    card.id === 'unhandled' ? { ...card, value: reports.length } : card
  );

  return (
    <AdminLayout>
      {/* System status banner */}
      <div className={styles.systemBanner}>
        <div className={styles.bannerLeft}>
          <ShieldCheck size={36} strokeWidth={1.5} className={styles.bannerIconWrap} aria-hidden="true" />
          <div>
            <div className={styles.bannerTitle}>위치 기반 보안 인증 관제 시스템</div>
            <div className={styles.bannerSub}>실시간 보안 위험 모니터링 및 제보 인증 현황</div>
          </div>
        </div>
        <span className={styles.bannerStatus}>• 시스템 정상 작동 중 (Live)</span>
      </div>

      {/* Stat cards */}
      <div className={styles.statsGrid}>
        {stats.map((card) => <StatCard key={card.id} {...card} />)}
      </div>

      {/* Recent risk reports */}
      <div className={styles.reportSection}>
        <div className={styles.reportSectionHeader}>
          <h2 className={styles.reportSectionTitle}>최근 위험 제보 리스트</h2>
          <button className={styles.refreshBtn} onClick={handleRefresh}>데이터 갱신</button>
        </div>
        <div className={styles.reportList}>
          {reports.map((item) => (
            <ReportCard key={item.id} report={item} onApprove={handleApprove} onReject={handleReject} />
          ))}
          {reports.length === 0 && (
            <p style={{ color: '#A3AED0', textAlign: 'center', padding: '24px 0' }}>처리할 제보가 없습니다.</p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;