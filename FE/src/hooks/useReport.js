import { useState } from "react";
import axios from "axios";

export const useReport = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const submitReport = async (reportData) => {
    try {
      const formData = new FormData();
      formData.append("lat", reportData.location.lat);
      formData.append("lng", reportData.location.lng);
      formData.append("type", reportData.reportType);
      formData.append("content", reportData.description);
      formData.append("image", reportData.imageFile); // 필수 사진 파일

      console.log("🚀 제보 데이터 전송 중...");
      
      const response = await axios.post("/api/reports", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (response.status === 201 || response.status === 200) {
        alert("제보가 접수되었습니다! 관리자 승인 후 지도에 표시됩니다.");
        closeModal();
        return true;
      }
    } catch (error) {
      console.error("제보 실패:", error);
      alert("전송 중 오류가 발생했습니다. 다시 시도해주세요.");
      return false;
    }
  };

  return { isModalOpen, openModal, closeModal, submitReport };
};