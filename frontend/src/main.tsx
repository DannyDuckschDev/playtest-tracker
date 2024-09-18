import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n'; //Import the i18n configuration


ReactDOM.createRoot(document.getElementById('root')!).render(
    //removed StrictMode for the drag and drop functionality to work
    <App />

)
