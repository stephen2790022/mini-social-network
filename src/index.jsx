/* eslint-disable import/no-unresolved */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import App from 'components/App';

const AppRender = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
ReactDOM.render(<AppRender />, document.getElementById('root'));
