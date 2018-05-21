import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import CheckIn from './components/check-in';
import Insights from './components/insights';

const ModuleIndex = () => (
  <ul>
    <li>
      <Link to="/check-in">Check In</Link>
    </li>
    <li>
      <Link to="/insights">Insights</Link>
    </li>
  </ul>
);

export const Moods = () => (
  <Switch>
    <Route path="/check-in" component={CheckIn} />
    <Route path="/insights" component={Insights} />
    <Route component={ModuleIndex} />
  </Switch>
);

export default Moods;
