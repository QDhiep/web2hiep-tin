import React from 'react';
import { createRoot } from 'react-dom/client'; // Thay ReactDOM bằng createRoot
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// Tạo root container
const container = document.getElementById('root');
const root = createRoot(container); // Sử dụng createRoot

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

reportWebVitals();