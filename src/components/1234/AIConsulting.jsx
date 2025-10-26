// src/components/AIConsulting.jsx
import React from 'react';
import styles from '../App.module.css';

export default function AIConsulting() {
  return (
    <div className={`${styles.aiPanel} ${styles.aiPanelBlue}`}>
      <h3 className={styles.aiPanelTitle}>AI 컨설팅: 정책 액션</h3>
      <div className={styles.aiPanelContent}>
        <p style={{ color: '#999', fontStyle: 'italic', margin: 0 }}>
          지역을 선택하면 AI 컨설팅 결과가 표시됩니다.
        </p>
      </div>
    </div>
  );
}
