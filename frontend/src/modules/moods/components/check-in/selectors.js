import { path, compose } from 'ramda';
import PropTypes from 'prop-types';

import { PATH } from './constants';

export const getModel = path(PATH);

export const getPage = compose(path(['ui', 'page']), getModel);
getPage.propType = PropTypes.number.isRequired;
getPage.defaultProp = 1;

export const getValues = compose(path(['data']), getModel);
getValues.propType = PropTypes.object.isRequired;
getValues.defaultProp = {};
