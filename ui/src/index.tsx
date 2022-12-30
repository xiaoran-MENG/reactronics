import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ReactronicsContextProvider } from './app/context/ReactronicsContext';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ReactronicsContextProvider>
      <App />
    </ReactronicsContextProvider>
    </BrowserRouter> 
  </React.StrictMode>
);

reportWebVitals();
