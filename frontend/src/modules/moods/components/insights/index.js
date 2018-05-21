import { NAME } from './constants';
import reducer, { initialState } from './reducer';
import * as actions from './actions';
import * as constants from './constants';
import * as selectors from './selectors';
import saga from './saga';
import component from './connected-component';

export {
  NAME,
  actions,
  constants,
  initialState,
  reducer,
  selectors,
  saga,
  component,
};

export default component;
