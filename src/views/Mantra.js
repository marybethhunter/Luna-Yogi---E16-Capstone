import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { addMantraToDB, getAffirmation } from '../api/data/affirmationData';

const DivStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonStyle = styled.button`
  background-color: white,
  width: 100px;
  height: 40px;
  border-radius: 8px;
  border: 0px solid white;
  margin-top: 15px;
`;

export default function Mantra({ user, admin }) {
  const [mantra, setMantra] = useState({});
  const history = useHistory();

  const getDailyAffirmation = () => {
    getAffirmation().then((obj) => {
      setMantra({
        affirmation: obj.affirmation.affirmation,
      });
    });
  };

  const saveMantra = () => {
    addMantraToDB({ ...mantra, userId: user.uid }).then(() => {
      history.push(`/account/${user.uid}`);
    });
  };

  return (
    <DivStyle>
      {admin ? (
        <Link to="/addaffirmation" style={{ color: 'black' }}>
          Add New Affirmation
        </Link>
      ) : (
        ''
      )}
      <div className="card" style={{ border: 'none' }}>
        <div className="card-body">
          <h2 className="card-text">{mantra.affirmation}</h2>
          {mantra.affirmation ? (
            <DivStyle>
              {user ? (
                <ButtonStyle
                  type="button"
                  onClick={saveMantra}
                  style={{ width: 200, height: 50 }}
                >
                  Save Affirmation To Account
                </ButtonStyle>
              ) : (
                ''
              )}
            </DivStyle>
          ) : (
            <DivStyle>
              <ButtonStyle
                type="button"
                style={{ width: 200, height: 50 }}
                onClick={getDailyAffirmation}
              >
                Get daily affirmation!
              </ButtonStyle>
            </DivStyle>
          )}
        </div>
      </div>
    </DivStyle>
  );
}

Mantra.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
  admin: PropTypes.shape(PropTypes.obj),
};

Mantra.defaultProps = {
  user: null,
  admin: null,
};
