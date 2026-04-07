import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Navbar from "../components/Navbar";
import MapContainer from "../components/MapContainer";
import ReportModal from "../components/ReportModal";
import HazardDetail from "../components/HazardDetail";
import { useHazards } from "../hooks/useHazards"; // 데이터 패칭용 (선택사항)
import { useReport } from "../hooks/useReport";
import { useKakaoMap } from "../hooks/useKakaoMap";
import { useMapStore } from "../store/useMapStore";
import styles from "../styles/App.module.css";
import locationIcon from "../assets/location-icon.png";

const MapPage = () => {
  const navigate = useNavigate(); 
  const [isPicking, setIsPicking] = useState(false);
  const { isModalOpen, openModal, closeModal, submitReport } = useReport();

  // 🚩 커스텀 훅에서 기능 추출
  const { searchAndMove, moveToCurrentLocation } = useKakaoMap(isPicking);
  const pickedCoords = useMapStore((state) => state.pickedCoords);

  const handleSearch = (term) => {
    searchAndMove(term);
  };

  return (
    <div className={styles.container}>
      <Navbar onSearch={handleSearch} />

      {/* 마이페이지 이동 버튼 */}
      {!isPicking && (
        <button 
          className={styles.myPageFloatingBtn} 
          onClick={() => navigate('/mypage')}
        >
          <span className={styles.myPageIcon}>👤</span>
        </button>
      )}

      <MapContainer
        isPicking={isPicking}
        onConfirm={() => setIsPicking(false)}
      />

      <HazardDetail />

      {/* 액션 버튼 (내 위치, 제보) */}
      {!isPicking && (
        <div className={styles.actionButtons}>
          <button
            className={`${styles.circleBtn} ${styles.locationBtn}`}
            onClick={(e) => {
              e.stopPropagation();
              moveToCurrentLocation();
            }}
          >
            <img src={locationIcon} alt="내 위치" className={styles.locIconImage} />
          </button>

          <button
            className={`${styles.circleBtn} ${styles.reportBtn}`}
            onClick={(e) => {
              e.stopPropagation();
              openModal();
            }}
          >
            +
          </button>
        </div>
      )}

      <ReportModal
        isOpen={isModalOpen && !isPicking}
        onClose={closeModal}
        onSubmit={submitReport}
        onStartPicking={() => setIsPicking(true)}
        pickedLocation={pickedCoords}
      />
    </div>
  );
};

export default MapPage;