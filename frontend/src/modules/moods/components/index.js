import { all, fork } from 'redux-saga/effects';

import * as checkIn from './check-in';
import * as insights from './insights';

// add component here to have the sagas and reducers run
const components = [checkIn, insights];

// Construct a map of module names to their reducers
export const reducers = components.reduce((acc, { reducer, NAME }) => {
  if (reducer && NAME) {
    acc[NAME] = reducer;
  }
  return acc;
}, {});

// Construct an array of the modules' root sagas
const componentSagas = components.reduce((acc, { saga }) => {
  if (saga) acc.push(saga);
  return acc;
}, []);

export function* sagas() {
  for (let saga of componentSagas) {
    yield fork(saga);
  }
}
