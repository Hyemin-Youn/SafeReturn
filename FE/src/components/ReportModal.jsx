import React, { useRef } from 'react';
import { useReportForm } from '../hooks/useReportForm';
import styles from './ReportModal.module.css';

const ReportModal = ({ isOpen, onClose, onSubmit, pickedLocation, onStartPicking }) => {
  const fileInputRef = useRef(null);
  const overlayRef = useRef(null);
  
  const {
    location, reportType, setReportType, reportTitle, description, setDescription,
    previewUrl, handleImageChange, isFormValid, resetForm , setReportTitle
  } = useReportForm(isOpen, pickedLocation);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) handleClose();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <div className={styles.overlay} ref={overlayRef} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        {/* 1. 헤더 고정: X 버튼은 항상 그 자리에 */}
        <div className={styles.header}>
          <h2>위험 요소 제보</h2>
          <button onClick={handleClose} className={styles.closeBtn}>✕</button>
        </div>

        {/* 2. 스크롤 영역: 내용 + 푸터가 함께 움직임 */}
        <div className={styles.scrollArea}>
          <div className={styles.content}>
            <div className={styles.locationSection}>
              <p className={styles.label}>위치 정보 <span className={styles.required}>*</span></p>
              <div className={styles.locationBox}>
                <div className={styles.locInfo}>
                  <span className={styles.icon}>📍</span>
                  <div>
                    <p className={styles.locTitle}>{pickedLocation ? "지도에서 선택한 위치" : "현재 내 위치 (GPS)"}</p>
                    <p className={styles.locStatus}>
                      {location.loading ? "확인 중..." : 
                       location.lat ? `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}` : "위치 알 수 없음"}
                    </p>
                  </div>
                </div>
                <button type="button" className={styles.repickBtn} onClick={onStartPicking}>지도에서 선택</button>
              </div>
            </div>
          <div className={styles.inputGroup}>
             <p className={styles.label}>제보 제목 <span className={styles.required}>*</span></p>
            <input
            type="text"
            className={styles.titleInput}
            placeholder="예 : 공사현장, 가로등 파손"
            value={reportTitle}
             onChange={(e) => setReportTitle(e.target.value)} 
          />
            </div>          
            <p className={styles.label}>위험 유형 선택 <span className={styles.required}>*</span></p>
            <div className={styles.typeGrid}>
              {['공사현장', '어두운 길', '파손된 보도', '기타 위험'].map(type => (
                <button 
                  key={type} 
                  className={`${styles.typeBtn} ${reportType === type ? styles.active : ""}`}
                  onClick={() => setReportType(type)}
                >{type}</button>
              ))}
            </div>

            <p className={styles.label}>사진 첨부 <span className={styles.required}>*</span></p>
            <div 
              className={`${styles.uploadBox} ${previewUrl ? styles.hasPreview : ""}`}
              onClick={() => fileInputRef.current.click()}
              style={{ backgroundImage: previewUrl ? `url(${previewUrl})` : 'none' }}
            >
              {!previewUrl && <><span className={styles.uploadIcon}>📷</span><p>사진 업로드</p></>}
              <input type="file" accept="image/*" hidden ref={fileInputRef} onChange={handleImageChange} />
            </div>

            <p className={styles.label}>위험 내용 설명 <span className={styles.required}>*</span></p>
            <textarea 
              placeholder="상황을 설명해주세요..." 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className={styles.textarea} 
            />
          </div>

          {/* 푸터가 내용 바로 밑에 붙어서 같이 스크롤됨 */}
          <div className={styles.footer}>
            <button 
              className={`${styles.submitBtn} ${isFormValid ? styles.activeSubmit : ""}`}
              disabled={!isFormValid}
              onClick={() => {
                onSubmit({ location, reportType, description, imageFile: previewUrl });
                resetForm();
              }}
            >
              {isFormValid ? "제보 제출하기" : "내용을 모두 입력해주세요"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;