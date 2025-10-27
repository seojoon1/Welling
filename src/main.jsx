import React from 'react';
import ReactDOM from 'react-dom/client';
import 'leaflet/dist/leaflet.css';
import App from './App.jsx';
import Org_Map from './components/com/Org_Map/org_map.jsx';
import FeatureMap from './components/com/Org_Map/FeatureMap.jsx';
import './index.css'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    {/* <Org_Map /> */}
    {/* <FeatureMap /> */}
  </React.StrictMode>,
);
