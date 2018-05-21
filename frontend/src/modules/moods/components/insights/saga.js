import { call, put, fork, takeEvery, select } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import { INIT, LOAD_CHECKINS_SUCCESS, LOAD_CHECKINS_FAILURE } from './actions';

export function* loadCheckins() {
  try {
    const resp = yield call(fetch, '/api/check-in');

    if (resp.ok) {
      const body = yield call([resp, resp.json]);
      return yield put({
        type: LOAD_CHECKINS_SUCCESS,
        payload: { body },
        meta: {},
      });
    }

    return yield put({
      type: LOAD_CHECKINS_FAILURE,
      payload: resp.body || {},
      meta: {},
    });
  } catch (err) {
    console.error(err);
    return yield put({
      type: LOAD_CHECKINS_FAILURE,
      payload: {},
      meta: { error: err.message },
    });
  }
}

export default function* root() {
  yield takeEvery(INIT, loadCheckins);
}
