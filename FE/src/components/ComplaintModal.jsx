import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./ComplaintModal.module.css";

const ComplaintModal = ({ isOpen, onClose, hazardId }) => {
  const [type, setType] = useState("WRONG_LOCATION");
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("신고 제출:", { report_id: hazardId, complaint_type: type, reason });
    alert("신고가 접수되었습니다.");
    onClose();
  };

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.modalTitle}>허위 제보 신고</h3>
        <select className={styles.select} value={type} onChange={(e) => setType(e.target.value)}>
          <option value="WRONG_LOCATION">잘못된 위치 정보예요</option>
          <option value="IRRELEVENT_PHOTO">사진이 관련 없어요</option>
          <option value="SOLVED_REPORT">이미 해결된 문제예요</option>
        </select>
        <textarea
          className={styles.textarea}
          placeholder="사유를 적어주세요."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <div className={styles.btnGroup}>
          <button className={styles.cancelBtn} onClick={onClose}>취소</button>
          <button className={styles.submitBtn} onClick={handleSubmit}>신고하기</button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ComplaintModal;