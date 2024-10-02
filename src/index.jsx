import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.module.scss';
import App from './App';
import { store } from './store/store.js';

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <App />
  </Provider>
);
