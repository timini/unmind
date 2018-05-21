import { createFSA } from 'utils/actions';
import { PATH } from './constants';

const BASE = PATH.join('/');

export const SAVE_FIELD = `${BASE}/SAVE_FIELD`;
export const saveField = createFSA(SAVE_FIELD);

export const NEXT_PAGE = `${BASE}/NEXT_PAGE`;
export const nextPage = createFSA(NEXT_PAGE);

export const PREVIOUS_PAGE = `${BASE}/PREVIOUS_PAGE`;
export const previousPage = createFSA(PREVIOUS_PAGE);

export const SAVE_FORM = `${BASE}/SAVE_FORM`;
export const SAVE_FORM_SUCCESS = `${SAVE_FORM}_SUCCESS`;
export const SAVE_FORM_FAILURE = `${SAVE_FORM}_FAILURE`;
export const saveForm = createFSA(SAVE_FORM);
