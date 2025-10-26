// src/components/AIInsight.jsx
import React from 'react';
import styles from '../App.module.css';

export default function AIInsight() {
  return (
    <div className={`${styles.aiPanel} ${styles.aiPanelYellow}`}>
      <h3 className={styles.aiPanelTitle}>AI 통찰: 문제 진단 요약</h3>
      <div className={styles.aiPanelContent}>
        <p style={{ color: '#999', fontStyle: 'italic', margin: 0 }}>
          지역을 선택하면 AI 분석 결과가 표시됩니다.
        </p>
      </div>
    </div>
  );
}
