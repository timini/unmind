import {
  createMapStateToProps,
  createMapDispatchToProps,
  createPropTypes,
  createDefaultProps,
} from 'utils/props';

import { getCheckIns, getExpanded, averageMood, isLoading } from './selectors';
import { init, toggle } from './actions';

// all the props (excluding actions)
const data = {
  checkins: getCheckIns,
  expanded: getExpanded,
  averageMood,
  isLoading,
};

// all the actions used by component
const actions = {
  init,
  toggle,
};

export const mapDispatchToProps = createMapDispatchToProps(actions);

export const mapStateToProps = createMapStateToProps(data);

export const propTypes = createPropTypes(data, actions);

export const defaultProps = createDefaultProps(data, actions);
