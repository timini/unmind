import { is, map } from 'ramda';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';

export const createMapStateToProps = createStructuredSelector;

export const createMapDispatchToProps = actions => dispatch =>
  bindActionCreators(actions, dispatch);

export const mapPropTypes = selectorsObject => {
  if (!is(Object, selectorsObject)) {
    throw new TypeError(
      'invalid arguments: mapPropTypes takes an object of selectors'
    );
  }
  return Object.keys(selectorsObject).reduce((acc, key) => {
    const selector = selectorsObject[key];
    if (selector === undefined) {
      throw new TypeError(`missing selector for prop ${key}`);
    }
    const propTypeFunction = selector.propType;
    if (propTypeFunction === undefined) {
      throw new TypeError(
        `please assign a propType to your selector e.g: ${key}.propType = PropTypes.object`
      );
    }
    if (!is(Function, propTypeFunction)) {
      throw new TypeError(
        `your selector's propType must be a function, probably form PropTypes package`
      );
    }
    acc[key] = propTypeFunction;
    return acc;
  }, {});
};

export const mapDefaultProps = selectorsObject => {
  if (!is(Object, selectorsObject)) {
    throw new TypeError(
      'invalid arguments: mapDefaultProps takes an object of selectors'
    );
  }
  return Object.keys(selectorsObject).reduce((acc, key) => {
    const selector = selectorsObject[key];
    if (selector === undefined) {
      throw new TypeError(`missing selector for prop ${key}`);
    }
    const defaultProp = selector.defaultProp;
    if (defaultProp === undefined) {
      throw new TypeError(
        `please assign a defaultProp to your selector e.g: ${key}.defaultProp = {}`
      );
    }
    acc[key] = defaultProp;
    return acc;
  }, {});
};

/**
 * takes an object of actions and returns a propTrypes object with each action name
 * mapped to PropTypes.func (because all actions are functions!)
 * @param  {Object<Action>} actions
 * @return {Object<PropTypes>}         just map all actions to PropTypes.func
 */
export const mapActions = actions =>
  Object.keys(actions).reduce((acc, key) => {
    acc[key] = PropTypes.func.isRequired;
    return acc;
  }, {});

export const createPropTypes = (selectors, actions) => ({
  ...mapPropTypes(selectors),
  ...mapActions(actions),
});

export const createDefaultProps = (selectors, actions) => ({
  ...mapDefaultProps(selectors),
  // no default props for actions
  ...map(() => undefined, actions),
});
