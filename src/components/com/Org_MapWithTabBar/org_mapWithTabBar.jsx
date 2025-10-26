import { useState } from 'react';
import styles from './org_mapWithTabBar.module.css';
import { Org_TabBar_Map } from '../Org_TabBar/org_tabBar';
import Org_Map from '../Org_Map/org_map';

function Org_MapWithTabBar() {
  return (
    <div className={styles.outerBox}>
      <div className={styles.innerLayout}>
        <Org_TabBar_Map />
        <div className={styles.mapContainer}>
          <Org_Map />
        </div>
      </div>
    </div>
  );
}

export default Org_MapWithTabBar;
