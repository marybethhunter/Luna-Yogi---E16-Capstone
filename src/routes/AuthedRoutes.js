import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import Account from '../views/Account';
import CreateFlow from '../views/CreateFlow';
import YogaDetails from '../views/YogaDetails';
import MeditationDetails from '../views/MeditationDetails';
import MantraDetails from '../views/MantraDetails';

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

export default function AuthedRoutes({ user }) {
  return (
    <Switch>
      <PrivateRoute
        user={user}
        exact
        path="/account/:uid"
        component={() => <Account user={user} />}
      />
      <PrivateRoute
        user={user}
        exact
        path="/createflow"
        component={() => <CreateFlow user={user} />}
      />
      <PrivateRoute
        user={user}
        exact
        path="/yoga/:yogaKey"
        component={() => <YogaDetails user={user} />}
      />
      <PrivateRoute
        user={user}
        exact
        path="/meditation/:meditationKey"
        component={() => <MeditationDetails user={user} />}
      />
      <PrivateRoute
        user={user}
        exact
        path="/mantra/:mantraKey"
        component={() => <MantraDetails user={user} />}
      />
    </Switch>
  );
}

AuthedRoutes.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
};

AuthedRoutes.defaultProps = {
  user: null,
};
