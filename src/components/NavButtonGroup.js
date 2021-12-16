import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const GroupStyle = styled.div`
  margin-top: 20px;
`;

const ButtonStyle = styled.button`
  background-color: white,
  height: 40px;
  border-radius: 8px;
  margin: 10px;
  border: 0px solid white;
`;

export default function NavButtonGroup({ user }) {
  return (
    <GroupStyle>
      <ButtonStyle type="button" style={{ width: 150, height: 50 }}>
        <Link to="/" style={{ color: 'black', textDecoration: 'none' }}>
          HOME
        </Link>
      </ButtonStyle>
      <ButtonStyle type="button" style={{ width: 150, height: 50 }}>
        <Link to="/yoga" style={{ color: 'black', textDecoration: 'none' }}>
          YOGA
        </Link>
      </ButtonStyle>
      <ButtonStyle type="button" style={{ width: 150, height: 50 }}>
        <Link
          to="/meditation"
          style={{ color: 'black', textDecoration: 'none' }}
        >
          MEDITATION
        </Link>
      </ButtonStyle>
      <ButtonStyle type="button" style={{ width: 150, height: 50 }}>
        <Link to="/mantra" style={{ color: 'black', textDecoration: 'none' }}>
          AFFIRMATION
        </Link>
      </ButtonStyle>
      <ButtonStyle type="button" style={{ width: 150, height: 50 }}>
        <Link to="/blog" style={{ color: 'black', textDecoration: 'none' }}>
          BLOG
        </Link>
      </ButtonStyle>
      {user ? (
        <ButtonStyle type="button" style={{ width: 150, height: 50 }}>
          <Link
            to={`/account/${user.uid}`}
            style={{ color: 'black', textDecoration: 'none' }}
          >
            MY ACCOUNT
          </Link>
        </ButtonStyle>
      ) : (
        ''
      )}
    </GroupStyle>
  );
}

NavButtonGroup.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
};

NavButtonGroup.defaultProps = {
  user: null,
};
