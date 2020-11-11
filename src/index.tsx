import './webpack.index.js';
import React from 'react';
import ReactDOM from 'react-dom';
{{#if redux}}
import { Provider } from 'react-redux';
import configureStore from './store';
{{/if}}
import App from './App';
import * as serviceWorker from './serviceWorker';
import './assets/css/reset.css';

{{#if redux}}
const store = configureStore();
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
{{else}}
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
{{/if}}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
