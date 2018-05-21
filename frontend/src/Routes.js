import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Moods from 'modules/moods/component';
import NotFound from 'NotFound';

const Layout = ({ children }) => (
  <div className="w-40 center sans-serif black-80 helvetica">{children}</div>
);

export const Routes = () => (
  <Layout>
    <Switch>
      <Route path="/" component={Moods} />
      <Route component={NotFound} />
    </Switch>
  </Layout>
);
