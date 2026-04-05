import { useEffect, useState } from "react";
import axios from "axios"; // axios 임포트
import { useMapStore } from "../store/useMapStore";

export const useHazards = () => {
  const { setHazards } = useMapStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Axios를 사용하는 비동기 함수
    const fetchHazards = async () => {
      try {
        setLoading(true);

        // [수정 포인트] 로컬 테스트 시 /public/data/hazards.json 호출
        // Axios는 .json() 과정을 자동으로 처리해줘서 .data로 바로 접근 가능합니다.
        const response = await axios.get("/data/hazards.json");

        // Zustand 스토어에 데이터 저장 (axios는 결과값이 response.data에 들어있음)
        setHazards(response.data);
        
      } catch (err) {
        // Axios 에러 객체에서 메시지 추출
        const errorMessage = err.response?.data?.message || err.message;
        console.error("데이터 로딩 실패:", errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchHazards();
  }, [setHazards]);

  return { loading, error };
};