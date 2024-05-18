import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { configureStore } from  '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './App';
import rootReducer from './utils/reducers/rootReducer';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';

  export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
  });

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <>
    <StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
      </ErrorBoundary>
    </StrictMode>
    </>
  );