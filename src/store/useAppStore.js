// src/store/useAppStore.js
import { create } from 'zustand';

export const useAppStore = create((set, get) => ({
  // 상태
  regionData: [],
  geoData: null,
  currentView: 'gap',
  selectedRegion: null,
  status: '',
  absMaxGap: 1,
  terminalLogs: [],
  
  // 액션
  setRegionData: (data) => set({ regionData: data }),
  
  setGeoData: (data) => set({ geoData: data }),
  
  setCurrentView: (view) => set({ currentView: view }),
  
  setSelectedRegion: (region) => set({ selectedRegion: region }),
  
  setStatus: (status) => set({ status }),
  
  setAbsMaxGap: (gap) => set({ absMaxGap: gap }),
  
  addTerminalLog: (log) => set((state) => ({
    terminalLogs: [
      ...state.terminalLogs,
      {
        timestamp: new Date().toLocaleTimeString('ko-KR'),
        message: log
      }
    ]
  })),
  
  clearTerminalLogs: () => set({ terminalLogs: [] }),
  
  // 복합 액션
  initializeData: (initialData) => {
    const maxGap = Math.max(...initialData.map(d => Math.abs(d.gap))) || 1;
    set({
      regionData: initialData,
      selectedRegion: initialData[0],
      absMaxGap: maxGap
    });
  }
}));
