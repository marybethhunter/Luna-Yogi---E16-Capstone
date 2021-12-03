import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import AdminEditBlog from '../views/AdminEditBlog';
import AdminBlogForm from '../components/forms/AdminBlogForm';
import AdminAddPoseForm from '../components/forms/AdminAddPoseForm';

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  if (user === null) return user;

  const routeChecker = (burrito) => (user?.isAdmin ? (
  // eslint-disable-next-line react/jsx-props-no-spreading
    <Component {...burrito} user={user} />
  ) : (
    <Redirect to={{ pathname: '/', state: { from: burrito.location } }} />
  ));
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  user: PropTypes.shape(PropTypes.obj),
};

PrivateRoute.defaultProps = {
  user: null,
};

export default function AdminRoutes({ user }) {
  return (
    <Switch>
      <PrivateRoute
        user={user}
        exact
        path="/editblog/:postId"
        component={() => <AdminEditBlog user={user} />}
      />
      <PrivateRoute
        user={user}
        exact
        path="/addblog"
        component={() => <AdminBlogForm user={user} />}
      />
      <PrivateRoute
        user={user}
        exact
        path="/addpose"
        component={() => <AdminAddPoseForm user={user} />}
      />
    </Switch>
  );
}

AdminRoutes.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
};

AdminRoutes.defaultProps = {
  user: null,
};
