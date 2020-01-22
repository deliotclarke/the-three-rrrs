import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import rootReducer from './reducers/root';
import { rootEpic } from './epics/index';

import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { Provider } from 'react-redux';

const epicMiddleware = createEpicMiddleware();

function configureStore() {
  const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

  epicMiddleware.run(rootEpic);

  return store;
}

const storeInstance = configureStore();

const appWithProvider = (
  <Provider store={storeInstance}>
    <App />
  </Provider>
);

ReactDOM.render(appWithProvider, document.getElementById('root'));
