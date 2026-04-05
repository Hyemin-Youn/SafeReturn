import React from 'react';
import { MapPin } from 'lucide-react';

const ReportCard = ({ report, onApprove, onReject }) => {
  const isCritical = report.riskLevel === 'High';
  const borderColor = isCritical ? '#EE5D50' : '#05CD99';
  const badgeLabel = isCritical ? 'CRITICAL RISK' : 'WARNING';

  return (
    <div style={{ ...cardStyle, borderLeft: `5px solid ${borderColor}` }}>
      {/* Top row: location + badge + time + invalidate */}
      <div style={headerStyle}>
        <div style={locationRow}>
          <MapPin
            size={16}
            color="#EE5D50"
            strokeWidth={2}
            style={{ flexShrink: 0 }}
          />
          <span style={locationTextStyle}>{report.locationName}</span>
          <span style={isCritical ? criticalBadgeStyle : warningBadgeStyle}>
            {badgeLabel}
          </span>
        </div>
        <div style={metaStyle}>
          <span style={timeTextStyle}>{report.createdAt}</span>
          <button
            style={invalidateBtnStyle}
            onClick={() => onReject(report.id)}
            aria-label="무효화"
          >
            무효화
          </button>
        </div>
      </div>

      {/* Description */}
      <p style={contentTextStyle}>{report.content}</p>

      {/* Approve button */}
      <button style={approveBtnStyle} onClick={() => onApprove(report.id)}>
        인증 승인 (DB 반영)
      </button>
    </div>
  );
};

const cardStyle = {
  backgroundColor: '#fff',
  padding: '18px 20px',
  borderRadius: '14px',
  border: '1px solid #E0E5F2',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  transition: 'box-shadow 0.2s',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '12px',
  flexWrap: 'wrap',
};

const locationRow = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  flexWrap: 'wrap',
};

const locationTextStyle = {
  fontSize: '15px',
  fontWeight: '700',
  color: '#2B3674',
};

const criticalBadgeStyle = {
  backgroundColor: '#FFEFEF',
  color: '#EE5D50',
  border: '1px solid #FFCFCF',
  padding: '3px 10px',
  borderRadius: '6px',
  fontSize: '11px',
  fontWeight: '700',
  letterSpacing: '0.3px',
};

const warningBadgeStyle = {
  backgroundColor: '#FFF8EB',
  color: '#FFB547',
  border: '1px solid #FFE5B0',
  padding: '3px 10px',
  borderRadius: '6px',
  fontSize: '11px',
  fontWeight: '700',
  letterSpacing: '0.3px',
};

const metaStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  flexShrink: 0,
};

const timeTextStyle = {
  fontSize: '12px',
  color: '#A3AED0',
};

const invalidateBtnStyle = {
  background: 'none',
  border: 'none',
  fontSize: '13px',
  fontWeight: '600',
  color: '#EE5D50',
  cursor: 'pointer',
  padding: 0,
};

const contentTextStyle = {
  fontSize: '13px',
  color: '#4A5568',
  margin: 0,
  lineHeight: '1.5',
};

const approveBtnStyle = {
  backgroundColor: '#4318FF',
  color: '#ffffff',
  border: 'none',
  borderRadius: '12px',
  padding: '14px',
  fontSize: '14px',
  fontWeight: '700',
  cursor: 'pointer',
  width: '100%',
  maxWidth: '380px',
  transition: 'background-color 0.2s',
};

export default ReportCard;
