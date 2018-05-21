import { combineReducers } from 'redux';
import { reducers } from './components';

export const reducer = combineReducers(reducers);

export default reducer;
