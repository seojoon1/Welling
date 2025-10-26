import { useState } from 'react';
import styles from './org_leftGNB.module.css';

function Org_leftGNB({ selectedRegion, onRegionSelect }) {
  const [openCategories, setOpenCategories] = useState({
    특별시: true,
    광역시: true,
    특별자치시: false,
    도: true,
    특별자치도: true,
  });

  const regions = {
    특별시: ['서울특별시'],
    광역시: [
      '부산광역시',
      '인천광역시',
      '대구광역시',
      '대전광역시',
      '광주광역시',
      '울산광역시',
    ],
    특별자치시: ['세종특별자치시'],
    도: [
      '경기도',
      '충청북도',
      '충청남도',
      '전라남도',
      '경상북도',
      '경상남도',
    ],
    특별자치도: [
      '강원특별자치도',
      '전북특별자치도',
      '제주특별자치도',
    ],
  };

  const toggleCategory = (category) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleRegionClick = (region) => {
    if (onRegionSelect) {
      onRegionSelect(region);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>행정구역 별</div>

      {Object.entries(regions).map(([category, regionList]) => (
        <div key={category} className={styles.categorySection}>
          <div
            className={styles.categoryHeader}
            onClick={() => toggleCategory(category)}
          >
            <img
              src="/images/underarrow.svg"
              alt="arrow"
              className={`${styles.arrow} ${openCategories[category] ? styles.open : ''}`}
            />
            <span>{category}</span>
          </div>

          {openCategories[category] && (
            <div className={styles.regionList}>
              {regionList.map((region) => (
                <div
                  key={region}
                  className={`${styles.regionItem} ${selectedRegion === region ? styles.selected : ''}`}
                  onClick={() => handleRegionClick(region)}
                >
                  {region}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Org_leftGNB;