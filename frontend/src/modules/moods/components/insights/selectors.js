import PropTypes from 'prop-types';
import { path, compose } from 'ramda';
import { createSelector } from 'reselect';

import { PATH } from './constants';

export const getModel = path(PATH);

export const getCheckIns = compose(path(['data', 'checkins']), getModel);
getCheckIns.propType = PropTypes.array.isRequired;
getCheckIns.defaultProp = [];

export const getExpanded = compose(path(['ui', 'expanded']), getModel);
getExpanded.propType = PropTypes.object.isRequired;
getExpanded.defaultProp = {};

export const averageMood = createSelector(getCheckIns, checkins =>
  Math.round(
    checkins.reduce((acc, ci) => parseInt(ci.mood, 10) + acc, 0) /
      checkins.length *
      (100 / 7)
  )
);
averageMood.propType = PropTypes.number;
averageMood.defaultProp = NaN;

export const isLoading = compose(path(['ui', 'loading']), getModel);
isLoading.propType = PropTypes.bool.isRequired;
isLoading.defaultProp = true;
