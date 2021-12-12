import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from 'reactstrap';

export default function NavButtonGroup({ user }) {
  return (
    <ButtonGroup>
      <Button type="button" href="/">
        Home
      </Button>
      <Button type="button" href="/yoga">
        Yoga
      </Button>
      <Button type="button" href="/meditation">
        Meditation
      </Button>
      <Button type="button" href="/mantra">
        Mantra
      </Button>
      <Button type="button" href="/blog">
        Blog
      </Button>
      {user ? (
        <Button type="button" href={`/account/${user.uid}`}>
          My Account
        </Button>
      ) : (
        ''
      )}
    </ButtonGroup>
  );
}

NavButtonGroup.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
};

NavButtonGroup.defaultProps = {
  user: null,
};
