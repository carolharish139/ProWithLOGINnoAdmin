import React from 'react';
import ReactDOM from 'react-dom/client';  // ייבוא החדש

import App from './App';
import './App.css';

// השתמש ב-ReactDOM.createRoot במקום render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
