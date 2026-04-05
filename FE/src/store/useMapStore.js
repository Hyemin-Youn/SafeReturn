import { create } from "zustand";

export const useMapStore = create((set) => ({
  // 1. 지도 인스턴스 관리
  map: null,
  setMap: (map) => set({ map }),

  // 2. 위험 요소 데이터 관리
  hazards: [], 
  setHazards: (hazards) => set({ hazards }),

  // 3. 상세 정보 창 (마커 클릭 시)
  selectedHazard: null,
  setSelectedHazard: (hazard) => set({ selectedHazard: hazard }),
  clearSelectedHazard: () => set({ selectedHazard: null }),

  // 4. 필터 상태 (공사현장, 어두운길, 기타)
  activeFilters: {
    construction: true,
    broken_light: true,
    etc: true, // ACCIDENTS(사고/기타) 포함
  },
  
  // 개별 필터 혹은 전체 필터를 업데이트하는 함수
  setActiveFilters: (newFilters) => 
    set((state) => ({ 
      activeFilters: { 
        ...state.activeFilters, 
        ...newFilters 
      } 
    })),

  // 5. 제보하기 위치 선택 좌표
  pickedCoords: null,
  setPickedCoords: (coords) => set({ pickedCoords: coords }),
}));