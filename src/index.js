import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App />, // eslint-disable-line react/jsx-filename-extension
  document.getElementById('root'),
);

registerServiceWorker();
