import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createStore, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import { Provider } from "react-redux";

import App from './App';

import reducers from './utils/reducers/'; 
import { BrowserRouter } from 'react-router-dom';
// import { AppProvider } from './utils/AppContextProvider';
// import { initialState, reducer } from './utils/AppState';
import ErrorBoundary from './components/ErrorBoundary';

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);
root.render(
  <>
    <ErrorBoundary>
      <BrowserRouter>
        <Provider store={store}>


            <App />

        </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  </>
);