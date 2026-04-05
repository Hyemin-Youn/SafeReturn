import React from "react";
import { useMapStore } from "../store/useMapStore"; // 추가
import styles from "./MapContainer.module.css";

const MapContainer = ({ isPicking, onConfirm }) => {
  // 스토어에서 좌표 가져오기
  const pickedCoords = useMapStore((state) => state.pickedCoords);

  return (
    <div className={styles.mapWrapper}>
      <div id="map" style={{ width: "100%", height: "100vh" }}></div>

      {isPicking && (
        <div className={styles.pickerOverlay}>
          <div className={styles.guideText}>
            {pickedCoords ? "이 위치가 맞나요?" : "지도를 클릭해 위치를 찍어주세요"}
          </div>
          {pickedCoords && (
            <button 
              className={styles.confirmBtn} 
              onClick={() => onConfirm(pickedCoords)}
            >
              이 위치로 확정
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MapContainer;