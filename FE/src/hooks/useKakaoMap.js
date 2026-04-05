import { useEffect, useRef } from "react";
import { useMapStore } from "../store/useMapStore";

export const useKakaoMap = (isPicking) => {
  const { map, setMap, hazards, activeFilters } = useMapStore();
  const isInitialized = useRef(false);
  const markersRef = useRef([]);
  const myLocationMarkerRef = useRef(null);

  // 1. 지도 초기화 (최초 1회만 실행)
  useEffect(() => {
    if (map || isInitialized.current) return;
    const container = document.getElementById("map");
    if (!container) return;

    window.kakao.maps.load(() => {
      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.9780),
        level: 3,
      };
      const kakaoMap = new window.kakao.maps.Map(container, options);
      isInitialized.current = true;
      setMap(kakaoMap);
    });
  }, [map, setMap]);

  // 2. 마커 렌더링 및 지능형 필터링
  useEffect(() => {
    if (!map || !hazards) return;

    // 기존 마커 물리적으로 제거
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    // 제보 모드(좌표 찍기)일 때는 위험 요소 마커를 일시적으로 숨김
    if (isPicking) return;

    // 카테고리 - 필터 키 매핑 (이것이 핵심!)
    const CATEGORY_MAP = {
      CONSTRUCTION: "construction", // 공사현장
      BROKEN_LIGHT: "broken_light", // 어두운길 (가로등 파손 포함)
    };

    const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
    const imageSize = new window.kakao.maps.Size(24, 35); 
    const userMarkerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

    // 필터링 실행
    const filtered = hazards.filter((item) => {
      // 승인된 데이터만 표시 (status가 없으면 기본 승인 처리)
      const isApproved = !item.status || item.status === "APPROVED";
      
      // 매핑된 키가 없으면 자동으로 'etc' 필터를 타게 함 (기타 필터 기능)
      const filterKey = CATEGORY_MAP[item.category] || "etc";
      const isCategoryMatch = activeFilters[filterKey];

      return isApproved && isCategoryMatch;
    });

    // 마커 생성 및 클릭 이벤트 등록
    markersRef.current = filtered.map((item) => {
      const lat = parseFloat(item.latitude);
      const lng = parseFloat(item.longitude);
      if (isNaN(lat) || isNaN(lng)) return null;

      const isUserReport = !!(item.photos && item.photos.length > 0);

      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(lat, lng),
        map: map,
        image: isUserReport ? userMarkerImage : null, 
        zIndex: isUserReport ? 20 : 10,
      });

      window.kakao.maps.event.addListener(marker, "click", () => {
        useMapStore.getState().setSelectedHazard({
          ...item,
          isUserReport, 
        });
      });

      return marker;
    }).filter(m => m !== null);

  }, [map, hazards, activeFilters, isPicking]);

  // 3. 내 위치로 지도 이동 기능
  const moveToCurrentLocation = () => {
    if (!map || !navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((p) => {
      const loc = new window.kakao.maps.LatLng(p.coords.latitude, p.coords.longitude);
      map.panTo(loc);
      // 기존 위치 마커가 있다면 제거 후 갱신
      if (myLocationMarkerRef.current) myLocationMarkerRef.current.setMap(null);
      myLocationMarkerRef.current = new window.kakao.maps.Marker({ position: loc, map });
    });
  };

  // 4. 주소 검색 후 지도 이동 기능
  const searchAndMove = (address) => {
    if (!map || !address) return;
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
        map.setCenter(coords);
      }
    });
  };

  return { moveToCurrentLocation, searchAndMove };
};