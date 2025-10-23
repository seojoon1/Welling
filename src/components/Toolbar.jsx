// src/components/Toolbar.jsx
import React, { useRef } from 'react';
import { useAppStore } from '../store/useAppStore';
import styles from './Toolbar.module.css';

const Toolbar = ({ onFileOpen, status }) => {
  const currentView = useAppStore((state) => state.currentView);
  const setCurrentView = useAppStore((state) => state.setCurrentView);
  const fileInputRef = useRef(null);

  return (
    <div className={styles.toolbar}>
      <div className={styles.seg}>
        {['gap', 'policy', 'psych'].map(view => (
          <button
            key={view}
            data-view={view}
            className={`${styles.segBtn} ${
              currentView === view ? styles.segBtnActive : ''
            }`}
            onClick={() => setCurrentView(view)}
          >
            {view === 'gap' ? 'Gap' : view === 'policy' ? 'Policy' : 'Psychology'}
          </button>
        ))}
      </div>
      <button
        className={styles.btn}
        onClick={() => fileInputRef.current?.click()}
      >
        📂 GeoJSON 파일 열기
      </button>
      <span className={styles.status}>
        {status || '기본: 같은 폴더의 skorea-provinces-2018-geo.json 자동 로드 시도'}
      </span>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,.geojson"
        style={{ display: 'none' }}
        onChange={onFileOpen}
      />
    </div>
  );
};

export default Toolbar;
