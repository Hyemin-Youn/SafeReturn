import { useEffect, useRef } from "react";
import { useMapStore } from "../store/useMapStore";

export const useKakaoMap = (isPicking) => {
  const { map, setMap, hazards, activeFilters, setSelectedHazard } = useMapStore();
  const markersRef = useRef([]);
  const myLocationMarkerRef = useRef(null);

  // 1. 지도 초기화 및 클린업 🚩 (이 부분이 수정되었습니다)
  useEffect(() => {
    const container = document.getElementById("map");
    // window.kakao가 없으면 중단하지만, map이 있는지는 여기서 체크하지 않습니다.
    if (!container || !window.kakao) return;

    window.kakao.maps.load(() => {
      // 🚩 중복 생성을 막으려면 container 내부를 비워주는 것이 안전합니다.
      container.innerHTML = ''; 
      
      const options = {
        center: new window.kakao.maps.LatLng(37.6602, 127.0540),
        level: 3,
      };
      const kakaoMap = new window.kakao.maps.Map(container, options);
      setMap(kakaoMap);
    });

    // 🚩 [핵심] 페이지를 나갈 때 스토어의 map 객체를 null로 초기화합니다.
    // 그래야 다시 돌아왔을 때 '지도 없음' 상태가 되어 새로 그립니다.
    return () => {
      setMap(null);
    };
  }, [setMap]); // 의존성에서 map을 제거하여 처음 한 번만 실행되게 합니다.

  // 2. 마커 렌더링 (동일)
  useEffect(() => {
    if (!map || !hazards || !Array.isArray(hazards)) return;

    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    if (isPicking) return;

    const CATEGORY_MAP = {
      CONSTRUCTION: "construction",
      SMART_LIGHT: "broken_light",
      ACCIDENT_ZONE: "etc",
    };

    const newMarkers = hazards
      .filter((item) => {
        const filterKey = CATEGORY_MAP[item.type] || "etc";
        return activeFilters[filterKey];
      })
      .map((item) => {
        const lat = parseFloat(item.lat);
        const lng = parseFloat(item.lng);
        if (isNaN(lat) || isNaN(lng)) return null;

        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(lat, lng),
          map: map,
          title: item.name,
          clickable: true,
          zIndex: 10,
        });

        window.kakao.maps.event.addListener(marker, "click", () => {
          setSelectedHazard(item);
        });

        return marker;
      })
      .filter((m) => m !== null);

    markersRef.current = newMarkers;
  }, [map, hazards, activeFilters, isPicking, setSelectedHazard]);

  // 3. 내 위치 이동 (동일)
  const moveToCurrentLocation = () => {
    if (!map || !navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((p) => {
      const loc = new window.kakao.maps.LatLng(p.coords.latitude, p.coords.longitude);
      map.panTo(loc);
      if (myLocationMarkerRef.current) myLocationMarkerRef.current.setMap(null);
      myLocationMarkerRef.current = new window.kakao.maps.Marker({ position: loc, map });
    });
  };

  // 4. 주소 검색 이동 (동일)
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