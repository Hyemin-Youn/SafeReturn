import { useState } from "react";
import { useMapStore } from "../store/useMapStore";

export const useNavbar = (onSearch) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // 🚩 접기 상태 복구
  const { activeFilters, setActiveFilters } = useMapStore();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (!value) {
      setSearchResults([]);
      return;
    }

    // 카카오 장소 검색 API
    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(value, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setSearchResults(data);
      }
    });
  };

  const handleSelectPlace = (place) => {
    const address = place.road_address_name || place.address_name;
    // 🚩 MapPage에서 전달받은 검색 후 이동 함수 실행
    if (onSearch) onSearch(address);
    setSearchTerm(place.place_name);
    setSearchResults([]);
  };

  const handleFilterToggle = (key) => {
    setActiveFilters({ [key]: !activeFilters[key] });
  };

  return {
    searchTerm,
    searchResults,
    isSidebarOpen,
    filters: activeFilters,
    handleSearchChange,
    handleSelectPlace,
    handleFilterToggle,
    toggleSidebar,
  };
};