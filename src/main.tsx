import './global.css';

import '@unocss/reset/sanitize/sanitize.css';
import 'virtual:uno.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App.tsx';
import { StoreProvider } from './components/StoreProvider.tsx';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

createRoot(root).render(
  <StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </StrictMode>,
);
