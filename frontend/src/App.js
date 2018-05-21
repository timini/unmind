import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import { Routes } from './Routes';
import { history } from './router';
import { configureStore } from './store';

const store = configureStore();

export const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>
);

export const initApp = target => {
  ReactDOM.render(<App />, target);
};

export default App;
