import React from 'react';
import ReactDOM from 'react-dom/client';
import * as THREE from 'three';
import App from './App';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import './index.css';

// Ensure THREE is globally available in the browser window
if (typeof window !== 'undefined') {
  (window as any).THREE = THREE;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallbackTitle="M.I.K Universe Root Error">
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
