import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Home from '../views/Home';
import Yoga from '../views/Yoga';
import Meditation from '../views/Meditation';
import Mantra from '../views/Mantra';
import Blog from '../views/Blog';
import BlogDetails from '../views/BlogDetails';

export default function NonauthedRoutes({ user, admin }) {
  return (
    <Switch>
      <Route
        user={user}
        exact
        path="/"
        component={() => <Home user={user} admin={admin} />}
      />
      <Route
        user={user}
        exact
        path="/yoga"
        component={() => <Yoga user={user} admin={admin} />}
      />
      <Route
        user={user}
        exact
        path="/meditation"
        component={() => <Meditation user={user} admin={admin} />}
      />
      <Route
        user={user}
        exact
        path="/mantra"
        component={() => <Mantra user={user} admin={admin} />}
      />
      <Route
        user={user}
        exact
        path="/blog"
        component={() => <Blog user={user} admin={admin} />}
      />
      <Route
        user={user}
        exact
        path="/blog/:blogKey"
        component={() => <BlogDetails user={user} admin={admin} />}
      />
    </Switch>
  );
}

NonauthedRoutes.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
  admin: PropTypes.shape(PropTypes.obj),
};

NonauthedRoutes.defaultProps = {
  user: null,
  admin: null,
};
