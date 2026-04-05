import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../components/layout/AdminLayout';

const Settings = () => {
  // 1. 유저 정보 상태 관리
  const [user, setUser] = useState(null);

  // 토글 스위치 상태 관리
  const [emailNoti, setEmailNoti] = useState(true);
  const [smsNoti, setSmsNoti] = useState(false);
  const [criticalNoti, setCriticalNoti] = useState(false);
  const [autoApprove, setAutoApprove] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // 2. 페이지 로드 시 localStorage에서 유저 정보 가져오기
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      console.log("설정 페이지 로드된 유저 정보:", parsedUser);
    }
  }, []);

  return (
    <AdminLayout>
      <div style={containerStyle}>
        <header style={headerStyle}>
          <h2 style={titleStyle}>설정</h2>
          <p style={subTitleStyle}>시스템 설정을 관리하고 개인 정보를 수정하세요</p>
        </header>

        {/* 계정 설정 */}
        <section style={sectionCardStyle}>
          <h3 style={sectionTitleStyle}><span style={{marginRight: '8px'}}>👤</span> 계정 설정</h3>
          <div style={rowStyle}>
            <div>
              <div style={labelStyle}>이메일 주소</div>
              {/* ⭐ 가입 시 이메일(또는 ID) 자동 연결 */}
              <div style={valueStyle}>
                {user?.email || user?.userId || 'safewalk.system@gmail.com'}
              </div>
            </div>
            <button style={textBtnStyle}>변경</button>
          </div>
          <div style={rowStyle}>
            <div>
              <div style={labelStyle}>비밀번호</div>
              <div style={valueStyle}>힌트: 설정 안 함</div>
            </div>
            <button style={textBtnStyle}>변경</button>
          </div>
          <div style={{...rowStyle, borderBottom: 'none'}}>
            <div>
              <div style={labelStyle}>전화번호</div>
              {/* ⭐ 가입 시 입력한 번호 자동 연결 */}
              <div style={valueStyle}>
                {user?.phone || '010-1234-5678'}
              </div>
            </div>
            <button style={textBtnStyle}>변경</button>
          </div>
        </section>

        {/* 알림 설정 */}
        <section style={sectionCardStyle}>
          <h3 style={sectionTitleStyle}><span style={{marginRight: '8px'}}>🔔</span> 알림 설정</h3>
          <div style={rowStyle}>
            <div>
              <div style={labelStyle}>이메일 알림</div>
              <div style={descStyle}>중요한 알림을 이메일로 받습니다</div>
            </div>
            <Toggle active={emailNoti} onClick={() => setEmailNoti(!emailNoti)} />
          </div>
          <div style={rowStyle}>
            <div>
              <div style={labelStyle}>SMS 알림</div>
              <div style={descStyle}>긴급 알림을 SMS로 받습니다</div>
            </div>
            <Toggle active={smsNoti} onClick={() => setSmsNoti(!smsNoti)} />
          </div>
          <div style={{...rowStyle, borderBottom: 'none'}}>
            <div>
              <div style={labelStyle}>긴급 알림만 받기</div>
              <div style={descStyle}>중요한 알림만 수신합니다</div>
            </div>
            <Toggle active={criticalNoti} onClick={() => setCriticalNoti(!criticalNoti)} />
          </div>
        </section>

        {/* 보안 설정 */}
        <section style={sectionCardStyle}>
          <h3 style={sectionTitleStyle}><span style={{marginRight: '8px'}}>🛡️</span> 보안 설정</h3>
          <div style={rowStyle}>
            <div>
              <div style={labelStyle}>자동 승인 모드</div>
              <div style={descStyle}>일반 제보를 자동으로 승인합니다</div>
            </div>
            <Toggle active={autoApprove} onClick={() => setAutoApprove(!autoApprove)} />
          </div>
          <div style={rowStyle}>
            <div>
              <div style={labelStyle}>2단계 인증</div>
              <div style={descStyle}>로그인 시 추가 인증을 요구합니다</div>
            </div>
            <button style={textBtnStyle}>설정</button>
          </div>
          <div style={{...rowStyle, borderBottom: 'none'}}>
            <div>
              <div style={labelStyle}>세션 타임아웃</div>
              <div style={descStyle}>현재: 30분</div>
            </div>
            <button style={textBtnStyle}>변경</button>
          </div>
        </section>

        {/* 시스템 설정 */}
        <section style={sectionCardStyle}>
          <h3 style={sectionTitleStyle}><span style={{marginRight: '8px'}}>⚙️</span> 시스템 설정</h3>
          <div style={rowStyle}>
            <div>
              <div style={labelStyle}>다크 모드</div>
              <div style={descStyle}>어두운 테마 사용</div>
            </div>
            <Toggle active={darkMode} onClick={() => setDarkMode(!darkMode)} />
          </div>
          <div style={rowStyle}>
            <div>
              <div style={labelStyle}>언어</div>
              <div style={valueStyle}>한국어</div>
            </div>
            <button style={textBtnStyle}>변경</button>
          </div>
          <div style={{...rowStyle, borderBottom: 'none'}}>
            <div>
              <div style={labelStyle}>시간대</div>
              <div style={valueStyle}>서울 (GMT+9)</div>
            </div>
            <button style={textBtnStyle}>변경</button>
          </div>
        </section>

        {/* 위험 구역 */}
        <section style={dangerZoneStyle}>
          <h3 style={{...sectionTitleStyle, color: '#EE5D50'}}>위험 구역</h3>
          <p style={{color: '#EE5D50', fontSize: '13px', marginBottom: '20px'}}>아래 작업은 되돌릴 수 없습니다. 신중하게 진행하세요.</p>
          <div style={{display: 'flex', gap: '10px'}}>
            <button style={dangerBtnStyle}>모든 데이터 초기화</button>
            <button style={dangerBtnStyle}>계정 삭제</button>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};

const Toggle = ({ active, onClick }) => (
  <div 
    onClick={onClick}
    style={{
      width: '45px', height: '22px', borderRadius: '20px',
      backgroundColor: active ? '#7551FF' : '#E0E5F2',
      position: 'relative', cursor: 'pointer', transition: '0.3s'
    }}
  >
    <div style={{
      width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#fff',
      position: 'absolute', top: '2px', left: active ? '25px' : '2px', transition: '0.3s'
    }} />
  </div>
);

const containerStyle = { padding: '20px', maxWidth: '1000px' };
const headerStyle = { marginBottom: '30px' };
const titleStyle = { fontSize: '26px', fontWeight: 'bold', color: '#2B3674', margin: 0 };
const subTitleStyle = { color: '#A3AED0', fontSize: '14px', marginTop: '5px' };
const sectionCardStyle = { backgroundColor: '#fff', borderRadius: '20px', padding: '24px', marginBottom: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' };
const sectionTitleStyle = { fontSize: '18px', fontWeight: 'bold', color: '#2B3674', marginBottom: '20px', display: 'flex', alignItems: 'center' };
const rowStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #F4F7FE' };
const labelStyle = { fontSize: '15px', fontWeight: '600', color: '#2B3674' };
const valueStyle = { fontSize: '14px', color: '#707EAE', marginTop: '4px' };
const descStyle = { fontSize: '13px', color: '#A3AED0', marginTop: '4px' };
const textBtnStyle = { color: '#7551FF', border: 'none', backgroundColor: 'transparent', fontSize: '14px', fontWeight: '600', cursor: 'pointer' };
const dangerZoneStyle = { backgroundColor: '#FFF5F5', border: '1px solid #FFEFEF', borderRadius: '20px', padding: '24px', marginBottom: '40px' };
const dangerBtnStyle = { backgroundColor: '#EE5D50', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '12px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' };

export default Settings;