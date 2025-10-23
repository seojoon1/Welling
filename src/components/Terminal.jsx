// src/components/Terminal.jsx
import React, { useEffect, useRef } from 'react';
import { useAppStore } from '../store/useAppStore';
import styles from './Terminal.module.css';

const Terminal = () => {
  const terminalLogs = useAppStore((state) => state.terminalLogs);
  const clearTerminalLogs = useAppStore((state) => state.clearTerminalLogs);
  const terminalEndRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLogs]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>🖥️ 시스템 로그</span>
        <button 
          className={styles.clearBtn}
          onClick={clearTerminalLogs}
          title="로그 지우기"
        >
          Clear
        </button>
      </div>
      <div className={styles.terminal}>
        {terminalLogs.length === 0 ? (
          <div className={styles.emptyMessage}>
            <span className={styles.prompt}>$</span> 대기 중... 지도를 클릭하여 분석을 시작하세요
          </div>
        ) : (
          terminalLogs.map((log, index) => (
            <div key={index} className={styles.logLine}>
              <span className={styles.timestamp}>[{log.timestamp}]</span>
              <span className={styles.prompt}>$</span>
              <span className={styles.message}>{log.message}</span>
            </div>
          ))
        )}
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
};

export default Terminal;
