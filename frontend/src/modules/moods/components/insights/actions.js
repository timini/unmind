import { createFSA } from 'utils/actions';

import { PATH } from './constants';
const BASE = PATH.join('/');

export const INIT = `${BASE}/INIT`;
export const init = createFSA(INIT);

export const LOAD_CHECKINS = `${BASE}/LOAD_CHECKINS`;
export const LOAD_CHECKINS_SUCCESS = `${LOAD_CHECKINS}_SUCCESS`;
export const LOAD_CHECKINS_FAILURE = `${LOAD_CHECKINS}_FAILURE`;

export const TOGGLE = `${BASE}/TOGGLE`;
export const toggle = id => createFSA(TOGGLE)({ id });
