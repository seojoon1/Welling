import { useState } from 'react';
import styles from './org_mapWithTabBar.module.css';
import { Org_TabBar_Map } from '../Org_TabBar/org_tabBar';
import Org_Map from '../Org_Map/org_map';

function Org_MapWithTabBar({ onRegionSelect, selectedRegionName }) {
  const [activeTab, setActiveTab] = useState('여론');

  return (
    <div className={styles.outerBox}>
      <Org_TabBar_Map activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className={styles.innerLayout}>
        <div className={styles.mapContainer}>
          <Org_Map
            activeTab={activeTab ? activeTab : "여론"}
            onRegionSelect={onRegionSelect}
            selectedRegionName={selectedRegionName}
          />
        </div>
      </div>
    </div>
  );
}

export default Org_MapWithTabBar;
