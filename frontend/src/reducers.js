import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { reducers as modulesReducer } from './modules';
import { routerReducer } from './router';

// add reducers here
export const reducers = combineReducers({
  router: routerReducer,
  form: formReducer,
  ...modulesReducer,
});
