import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { NextUIProvider } from '@nextui-org/react';
import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <AnimatePresence mode="wait">
        <main className="dark text-foreground bg-background">
          <App />
          <ToastContainer />
        </main>
      </AnimatePresence>
    </NextUIProvider>
  </React.StrictMode>
);
