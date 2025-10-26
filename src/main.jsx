import React from 'react';
import ReactDOM from 'react-dom/client';
import 'leaflet/dist/leaflet.css';
import Org_TopicComparison from './components/com/Org_TopicComparison/org_topicComparison.jsx';
import Org_ScoreComparison from './components/com/Org_ScoreComparison/org_scoreComparison.jsx';
import {Org_TabBar_AI, Org_TabBar_Map} from './components/com/Org_TabBar/org_tabBar.jsx';
import Org_topGNB from './components/com/Org_topGNB/org_topGNB.jsx';
import Org_leftGNB from './components/com/Org_leftGNB/org_leftGNB.jsx';
import Org_Map from './components/com/Org_Map/org_map.jsx';
import Org_MapWithTabBar from './components/com/Org_MapWithTabBar/org_mapWithTabBar.jsx';
import './index.css'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Org_TopicComparison />
    <Org_ScoreComparison />
    <Org_TabBar_AI />
    <Org_TabBar_Map />
    <Org_topGNB />
    <Org_leftGNB /> */}
    {/* <Org_Map /> */}
    <Org_MapWithTabBar />
  </React.StrictMode>,
);
