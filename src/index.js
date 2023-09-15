import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './views/App';
import { BrowserRouter } from 'react-router-dom';
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Suspense fallback="">
      <App />
    </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);

