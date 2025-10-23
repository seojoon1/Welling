// src/components/TopThemesChart.jsx
import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import { useAppStore } from '../store/useAppStore';
import styles from './TopThemesChart.module.css';

const TopThemesChart = () => {
  const selectedRegion = useAppStore((state) => state.selectedRegion);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !selectedRegion) return;

    // 주제별 점수를 내림차순으로 정렬하여 상위 3개 선택
    const themes = Object.entries(selectedRegion.themes)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    const labels = themes.map(([key]) => key);
    const data = themes.map(([, value]) => value);

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: '고통 지수',
          data,
          backgroundColor: [
            'rgba(220,38,38,0.8)',
            'rgba(234,88,12,0.8)',
            'rgba(251,146,60,0.8)'
          ],
          borderColor: [
            'rgba(220,38,38,1)',
            'rgba(234,88,12,1)',
            'rgba(251,146,60,1)'
          ],
          borderWidth: 1.5
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            titleColor: '#111',
            bodyColor: '#111',
            backgroundColor: '#ffffff',
            borderColor: 'rgba(0,0,0,0.1)',
            borderWidth: 1
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            max: 100,
            grid: { color: 'rgba(0,0,0,0.1)' },
            ticks: { color: '#111' }
          },
          y: {
            grid: { display: false },
            ticks: { 
              color: '#111',
              font: { weight: '600', size: 12 }
            }
          }
        }
      }
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [selectedRegion]);

  if (!selectedRegion) {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>상위 3개 주제</h3>
        <div className={styles.emptyState}>
          지역을 선택해주세요
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>상위 3개 주제</h3>
      <div className={styles.chartWrapper}>
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default TopThemesChart;
