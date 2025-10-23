// src/components/Legend.jsx
import React from 'react';
import { useAppStore } from '../store/useAppStore';
import styles from './Legend.module.css';

const Legend = () => {
  const currentView = useAppStore((state) => state.currentView);

  const gradients = {
    gap: 'linear-gradient(to right,#EDE9FE,#7C3AED,#4C1D95)',
    policy: 'linear-gradient(to right,#FFFFFF,#93C5FD,#2563EB)',
    psych: 'linear-gradient(to right,#FFFFFF,#FCA5A5,#DC2626)'
  };

  const texts = {
    gap: 'Gap(절대값): 낮음(연보라) ⇄ 높음(진보라)',
    policy: 'Policy: 낮음(하양) ⇄ 높음(파랑)',
    psych: 'Psychology(고통): 낮음(하양) ⇄ 높음(빨강)'
  };

  return (
    <>
      <div className={styles.legend}>
        <span
          className={styles.legendBar}
          style={{ background: gradients[currentView] }}
        />
        <span>{texts[currentView]}</span>
      </div>
      <p className={styles.hint}>
        힌트: 휠 확대/축소, 지역 클릭 시 백엔드 전송 + 터미널 로그 출력
      </p>
    </>
  );
};

export default Legend;
