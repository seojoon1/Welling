// src/components/ViewTabs.jsx
import React from 'react';
import { useAppStore } from './store/useAppStore';
import styles from './ViewTabs.module.css';

export default function ViewTabs() {
  const { currentView, setCurrentView } = useAppStore();

  const tabs = [
    { id: 'gap', label: 'Gap' },
    { id: 'policy', label: 'Policy' },
    { id: 'psychology', label: 'Psychology' }
  ];

  return (
    <div className={styles.tabs}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`${styles.tab} ${currentView === tab.id ? styles.active : ''}`}
          onClick={() => setCurrentView(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
