import './index.css';
import { App } from './App';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { ModalProvider } from '@lib/contexts/Modal';

const element = document.getElementById('root');
ReactDOM.createRoot(element!).render(
  <React.StrictMode>
    <ModalProvider>
      <App />
    </ModalProvider>
  </React.StrictMode>,
);
