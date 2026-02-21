// import { StrictMode } from "react";
import React from 'react';
import ReactDom from 'react-dom/client';
import App from './App.jsx';
import './index.css';
// // Import all of Bootstrap’s JS
import * as bootstrap from 'bootstrap';
import Alert from 'bootstrap/js/dist/alert';

ReactDom.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
