import React from 'react';
import PropTypes from 'prop-types';
import AdminRoutes from './AdminRoutes';
import AuthedRoutes from './AuthedRoutes';
import NonauthedRoutes from './NonauthedRoutes';

export default function Routes({ user }) {
  return (
    <>
      {user?.isAdmin && <AdminRoutes user={user} />}
      <AuthedRoutes user={user} />
      <NonauthedRoutes user={user} />
    </>
  );
}

Routes.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
};

Routes.defaultProps = {
  user: null,
};
