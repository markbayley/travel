import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import Map from './components/Map';
import './components/Map.css';
import Travel from './components/Travel'


ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <Map /> */}
    <Travel />
  </React.StrictMode>,
  document.getElementById("root")
);