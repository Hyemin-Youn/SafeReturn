import React from "react";
import { useNavbar } from "../hooks/useNavbar";
import styles from "../styles/App.module.css";

const Navbar = ({ onSearch }) => {
  const {
    searchTerm,
    searchResults,
    isSidebarOpen,
    filters,
    handleSearchChange,
    handleSelectPlace,
    handleFilterToggle,
    toggleSidebar,
  } = useNavbar(onSearch);

  return (
    <div className={`${styles.sidebar} ${!isSidebarOpen ? styles.closed : ""}`}>
      {/* 🚩 사이드바 접기/펼치기 버튼 */}
      <button className={styles.toggleBtn} onClick={toggleSidebar}>
        {isSidebarOpen ? "◀" : "▶"}
      </button>

      <div className={styles.sidebarSearchBox}>
        <div className={styles.searchInputBox}>
          <input
            type="text"
            placeholder="장소, 주소 검색"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className={styles.filterSection}>
        <button 
          className={`${styles.filterItem} ${filters.construction ? styles.active : ""}`}
          onClick={() => handleFilterToggle("construction")}
        >
          <span className={styles.filterIcon}>🚧</span>
          <span className={styles.filterLabel}>공사현장</span>
        </button>

        <button 
          className={`${styles.filterItem} ${filters.broken_light ? styles.active : ""}`}
          onClick={() => handleFilterToggle("broken_light")}
        >
          <span className={styles.filterIcon}>🌑</span>
          <span className={styles.filterLabel}>어두운길</span>
        </button>

        <button 
          className={`${styles.filterItem} ${filters.etc ? styles.active : ""}`}
          onClick={() => handleFilterToggle("etc")}
        >
          <span className={styles.filterIcon}>📍</span>
          <span className={styles.filterLabel}>기타</span>
        </button>
      </div>

      <div className={styles.searchResultList}>
        {searchResults.length > 0 ? (
          searchResults.map((place) => (
            <div 
              key={place.id} 
              className={styles.searchResultItem}
              onClick={() => handleSelectPlace(place)}
            >
              <div className={styles.placeInfo}>
                <span className={styles.placeName}>{place.place_name}</span>
              </div>
              <div className={styles.placeAddress}>
                {place.road_address_name || place.address_name}
              </div>
            </div>
          ))
        ) : (
          <div className={styles.emptyResults}>
            {searchTerm ? "검색 결과가 없습니다." : "주변의 위험 요소를 확인해보세요."}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;