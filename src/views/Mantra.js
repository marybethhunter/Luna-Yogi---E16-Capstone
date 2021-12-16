import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { addMantraToDB, getAffirmation } from '../api/data/affirmationData';

const DivStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonStyle = styled.button`
  background-color: white,
  width: 100px;
  height: 40px;
  border-radius: 8px;
  border: 0px solid white;
`;

export default function Mantra({ user }) {
  const [affirmation, setAffirmation] = useState({});

  const getDailyAffirmation = () => {
    getAffirmation().then((obj) => {
      setAffirmation({
        affirmation: obj.affirmation,
      });
    });
  };

  const saveMantra = () => {
    addMantraToDB({ ...affirmation, userId: user.uid });
  };

  return (
    <DivStyle>
      <div className="card" style={{ border: 'none' }}>
        <div className="card-body">
          <h2 className="card-text">{affirmation.affirmation}</h2>
          {affirmation.affirmation ? (
            <>
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
            </>
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
};

Mantra.defaultProps = {
  user: null,
};
