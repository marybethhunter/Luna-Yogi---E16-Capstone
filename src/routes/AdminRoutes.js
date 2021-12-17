import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import AdminEditBlog from '../views/AdminEditBlog';
import AdminBlogForm from '../components/forms/AdminBlogForm';
import AdminAddPoseForm from '../components/forms/AdminAddPoseForm';
import AdminAddAffirmation from '../components/forms/AdminAddAffirmation';
import AdminAddMeditation from '../components/forms/AdminAddMeditation';

export default function AdminRoutes({ admin }) {
  return (
    <Switch>
      <Route
        admin={admin}
        exact
        path="/editblog/:postId"
        component={() => <AdminEditBlog admin={admin} />}
      />
      <Route
        admin={admin}
        exact
        path="/addblog"
        component={() => <AdminBlogForm admin={admin} />}
      />
      <Route
        admin={admin}
        exact
        path="/addaffirmation"
        component={() => <AdminAddAffirmation admin={admin} />}
      />
      <Route
        admin={admin}
        exact
        path="/addpose"
        component={() => <AdminAddPoseForm admin={admin} />}
      />
      <Route
        admin={admin}
        exact
        path="/addmeditation"
        component={() => <AdminAddMeditation admin={admin} />}
      />
    </Switch>
  );
}

AdminRoutes.propTypes = {
  admin: PropTypes.shape(PropTypes.obj),
};

AdminRoutes.defaultProps = {
  admin: null,
};
