import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import sagaMonitor, { logSaga } from 'utils/sagaMonitor';

import { IS_DEV } from './config';
import { middleware as routerMiddleware } from './router';
import { reducers } from './reducers';
import { sagas } from './modules';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware({
  sagaMonitor: IS_DEV ? sagaMonitor : undefined,
});

// add your middlewares here
const middlewares = [routerMiddleware, sagaMiddleware];

// use devtools if chrome extension available
const composeWithDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeWithDevTools(applyMiddleware(...middlewares));

export const configureStore = initialState => {
  // create the store
  const store = createStore(reducers, initialState, enhancer);
  // then run the saga
  sagaMiddleware.run(sagas);
  // print a summary of the loaded sagas
  if (IS_DEV) logSaga();
  return store;
};
