import React, { useState } from "react";
import Navbar from "../components/Navbar";
import MapContainer from "../components/MapContainer";
import ReportModal from "../components/ReportModal";
import HazardDetail from "../components/HazardDetail";
import { useHazards } from "../hooks/useHazards";
import { useReport } from "../hooks/useReport";
import { useKakaoMap } from "../hooks/useKakaoMap";
import { useMapStore } from "../store/useMapStore";
import styles from "../styles/App.module.css";
import locationIcon from "../assets/location-icon.png";

const MapPage = () => {
  const [isPicking, setIsPicking] = useState(false);
  const { loading } = useHazards();
  const { isModalOpen, openModal, closeModal, submitReport } = useReport();

  const { searchAndMove, moveToCurrentLocation } = useKakaoMap(isPicking);
  const pickedCoords = useMapStore((state) => state.pickedCoords);

  // 🚩 Navbar 내부에서 호출할 수 있도록 함수 유지
  const handleSearch = (term) => {
    searchAndMove(term);
  };

  return (
    <div className={styles.container}>
      <Navbar onSearch={handleSearch} />

      <MapContainer
        isPicking={isPicking}
        onConfirm={() => setIsPicking(false)}
      />

      <HazardDetail />

      {!isPicking && (
        <div className={styles.actionButtons}>
          <button
            className={`${styles.circleBtn} ${styles.locationBtn}`}
            onClick={(e) => {
              e.stopPropagation();
              moveToCurrentLocation();
            }}
            title="내 위치로 이동"
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