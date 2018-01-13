// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './index.css';

export default ReactDOM.render(
  <App />,
  document.getElementById('root') || document.createElement('div')
);
