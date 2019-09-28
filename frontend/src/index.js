import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import App from './components/App';

ReactDOM.render(
  <Suspense fallback="Loading..">
    <App />
  </Suspense>,
  document.getElementById('root')
);
