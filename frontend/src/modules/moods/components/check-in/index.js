import { NAME } from './constants';
import * as constants from './constants';
import saga from './saga';
import component from './connected-component';
import { initialState, reducer } from './reducer';

export { NAME, constants, saga, component, initialState, reducer };

export default component;
