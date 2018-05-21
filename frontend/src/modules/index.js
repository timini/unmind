import { fork } from 'redux-saga/effects';

import * as moods from './moods';

// add module here to have the sagas and reducers run
const modules = [moods];

// Construct a map of module names to their reducers
export const reducers = modules.reduce((acc, { reducer, NAME }) => {
  if (reducer && NAME) {
    acc[NAME] = reducer;
  }
  return acc;
}, {});

// Construct an array of the modules' root sagas
const moduleSagas = modules.reduce((acc, { saga, NAME }) => {
  if (saga) acc.push(saga);
  return acc;
}, []);

export function* sagas() {
  for (let saga of moduleSagas) {
    yield fork(saga);
  }
}
