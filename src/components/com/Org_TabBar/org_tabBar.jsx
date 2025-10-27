import { useState } from 'react';
import styles from './org_tabBar.module.css';

// 지도 탭바 (여론, 정책, Gap)
export function Org_TabBar_Map({ activeTab, setActiveTab }) {
  const tabs = ['여론', '정책', 'Gap'];

  return (
    <div className={styles.containerMap}>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

// AI 분석 탭바 (AI 인사이트, AI 컨설팅)
export function Org_TabBar_AI({ activeTab, setActiveTab }) {
  const tabs = ['AI 인사이트', 'AI 컨설팅'];

  return (
    <div className={styles.containerAI}>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

// 기본 export (지도 탭바)
export default Org_TabBar_Map;
