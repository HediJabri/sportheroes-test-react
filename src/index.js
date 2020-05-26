import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import './index.css';
import 'font-awesome/css/font-awesome.min.css';

import App from './App';
import { fetchActivities } from './redux/reducers';

const store = createStore(
  fetchActivities,
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
