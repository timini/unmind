import {
  createMapStateToProps,
  createMapDispatchToProps,
  createPropTypes,
  createDefaultProps,
} from 'utils/props';

import { getPage, getValues } from './selectors';
import { saveField, saveForm, previousPage, nextPage } from './actions';

// all the props (excluding actions)
const data = {
  page: getPage,
  values: getValues,
};

// all the actions used by component
const actions = {
  saveField,
  previousPage,
  nextPage,
  saveForm,
};

export const mapDispatchToProps = createMapDispatchToProps(actions);

export const mapStateToProps = createMapStateToProps(data);

export const propTypes = createPropTypes(data, actions);

export const defaultProps = createDefaultProps(data, actions);
