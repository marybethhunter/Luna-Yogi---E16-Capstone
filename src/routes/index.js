import React from 'react';
import PropTypes from 'prop-types';
import AdminRoutes from './AdminRoutes';
import AuthedRoutes from './AuthedRoutes';
import NonauthedRoutes from './NonauthedRoutes';

export default function Routes({ user, admin }) {
  return (
    <>
      {admin ? <AdminRoutes user={user} admin={admin} /> : ''}
      <AuthedRoutes user={user} admin={admin} />
      <NonauthedRoutes user={user} admin={admin} />
    </>
  );
}

Routes.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
  admin: PropTypes.shape(PropTypes.obj),
};

Routes.defaultProps = {
  user: null,
  admin: null,
};
