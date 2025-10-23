// src/components/AverageChart.jsx
import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import { useAppStore } from '../store/useAppStore';
import styles from './AverageChart.module.css';

const AverageChart = () => {
  const regionData = useAppStore((state) => state.regionData);
  const selectedRegion = useAppStore((state) => state.selectedRegion);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !regionData?.length) return;

    const avgPolicy = regionData.reduce((sum, d) => sum + d.policy, 0) / regionData.length;
    const avgPsychology = regionData.reduce((sum, d) => sum + d.psychology, 0) / regionData.length;

    const selPolicy = selectedRegion?.policy || avgPolicy;
    const selPsychology = selectedRegion?.psychology || avgPsychology;
    const avgGap = avgPolicy - avgPsychology;
    const selGap = selPolicy - selPsychology;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels: ['예률', '정책', 'Gap'],
        datasets: [
          {
            label: selectedRegion ? selectedRegion.region : '전체 평균',
            data: [selPsychology, selPolicy, Math.abs(selGap)],
            backgroundColor: ['#EF5350', '#5C6BC0', '#7E57C2'],
            borderWidth: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: { color: '#111', font: { size: 12, weight: '600' } }
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
          y: {
            beginAtZero: true,
            max: 100,
            grid: { color: 'rgba(0,0,0,0.1)' },
            ticks: { color: '#111' }
          },
          x: {
            grid: { display: false },
            ticks: { color: '#111', font: { weight: '600' } }
          }
        }
      }
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [regionData, selectedRegion]);

  const regionName = selectedRegion ? selectedRegion.region : '전국 평균';

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{regionName} - 종합 점수 비교</h3>
      <div className={styles.chartWrapper}>
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default AverageChart;
