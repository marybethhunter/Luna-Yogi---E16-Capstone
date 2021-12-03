import React from 'react';
import PropTypes from 'prop-types';

export default function AccountDetails({ user }) {
  return (
    <div>
      {user?.isAdmin && <div>admin acc info</div>}
      {user ? <div>user acc info</div> : null}
    </div>
  );
}

AccountDetails.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
};

AccountDetails.defaultProps = {
  user: null,
};
