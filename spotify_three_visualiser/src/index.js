import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import { Provider } from 'react-redux';
import App from './App';
import reducers from './utils/reducers';
import { BrowserRouter } from 'react-router-dom';
// import { AppProvider } from './utils/AppContextProvider';
// import { initialState, reducer } from './utils/AppState';
import ErrorBoundary from './components/ErrorBoundary';

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== 'development',
});

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Provider store={store}>

            <App />

        </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);