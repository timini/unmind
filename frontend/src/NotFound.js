import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = ({ location }) => (
  <div>
    <h1>404</h1>
    <h3>
      No route <code>{location.pathname}</code> found
    </h3>
    <Link to="/">home</Link>
  </div>
);

export default NotFound;
