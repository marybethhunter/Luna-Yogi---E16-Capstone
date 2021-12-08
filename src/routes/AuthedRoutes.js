import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Account from '../views/Account';
import CreateFlow from '../views/CreateFlow';
import YogaDetails from '../views/YogaDetails';
import MeditationDetails from '../views/MeditationDetails';
import MantraDetails from '../views/MantraDetails';

export default function AuthedRoutes({ user, admin }) {
  return (
    <Switch>
      <Route
        user={user}
        admin={admin}
        exact
        path="/account/:uid"
        component={() => <Account user={user} admin={admin} />}
      />
      <Route
        user={user}
        admin={admin}
        exact
        path="/createflow"
        component={() => <CreateFlow user={user} admin={admin} />}
      />
      <Route
        user={user}
        admin={admin}
        exact
        path="/yoga/:yogaKey"
        component={() => <YogaDetails user={user} admin={admin} />}
      />
      <Route
        user={user}
        admin={admin}
        exact
        path="/meditation/:meditationKey"
        component={() => <MeditationDetails user={user} admin={admin} />}
      />
      <Route
        user={user}
        admin={admin}
        exact
        path="/mantra/:mantraKey"
        component={() => <MantraDetails user={user} admin={admin} />}
      />
    </Switch>
  );
}

AuthedRoutes.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
  admin: PropTypes.shape(PropTypes.obj),
};

AuthedRoutes.defaultProps = {
  user: null,
  admin: null,
};
