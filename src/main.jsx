import React from 'react';
import ReactDOM from 'react-dom/client';
import 'leaflet/dist/leaflet.css';
import Org_TopicComparison from './components/com/Org_TopicComparison/org_topicComparison.jsx';
import './index.css'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Org_TopicComparison />
  </React.StrictMode>,
);
