import React from 'react';
import PropTypes from 'prop-types';

export default function Yoga({ user }) {
  return <>{user ? <h1>authed yoga component</h1> : <h1>please log in</h1>}</>;
}

Yoga.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
};

Yoga.defaultProps = {
  user: null,
};
