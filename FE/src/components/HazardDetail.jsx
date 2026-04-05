import React, { useState } from "react";
import { useMapStore } from "../store/useMapStore";
import styles from "./HazardDetail.module.css";
import ComplaintModal from "./ComplaintModal"; // 🚩 모달 임포트

const HazardDetail = () => {
  const { selectedHazard, clearSelectedHazard } = useMapStore();
  const [isModalOpen, setIsModalOpen] = useState(false); // 🚩 모달 상태 추가

  if (!selectedHazard) return null;

  const {
    id, // 🚩 신고 시 필요
    title,
    category,
    content,
    reliability_score,
    photos = [],
  } = selectedHazard;

  const isUserReport = photos && photos.length > 0;

  const categoryMap = {
    CONSTRUCTION: "공사현장",
    BROKEN_LIGHT: "파손된 시설물",
    ACCIDENTS: "사고발생지역",
  };

  return (
    <div className={styles.bottomSheet}>
      <div className={styles.header}>
        <div className={styles.dragHandle}></div>
        <button className={styles.closeBtn} onClick={clearSelectedHazard}>×</button>
      </div>

      <div className={styles.content}>
        <div className={styles.badgeGroup}>
          <span className={styles.categoryBadge}>{categoryMap[category] || "위험 지역"}</span>
          <span className={isUserReport ? styles.userBadge : styles.publicBadge}>
            {isUserReport ? "👤 시민 실시간 제보" : "🏛️ 공공 데이터"}
          </span>
        </div>

        <h2 className={styles.title}>{title}</h2>

        {isUserReport && (
          <div className={styles.photoSlider}>
            {photos.map((photo, index) => (
              <img 
                key={index} 
                src={photo.photo_url} 
                alt="제보 현장" 
                className={styles.hazardImage} 
              />
            ))}
          </div>
        )}

        <div className={styles.infoSection}>
          <h3>상세 정보</h3>
          <p className={styles.description}>{content}</p>
        </div>

        <div className={styles.feedbackActions}>
          <button className={styles.agreeBtn} onClick={() => console.log("도움됨")}>
            👍 도움이 돼요 ({reliability_score})
          </button>
          
          {/* 🚩 수정: 클릭 시 모달 열기 */}
          <button className={styles.disagreeBtn} onClick={() => setIsModalOpen(true)}>
            ⚠️ 허위 정보예요
          </button>
        </div>
      </div>

      {/* 🚩 신고 모달 컴포넌트 배치 */}
      <ComplaintModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        hazardId={id} 
      />
    </div>
  );
};

export default HazardDetail;