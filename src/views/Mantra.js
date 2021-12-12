import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { addMantraToDB, getAffirmation } from '../api/data/affirmationData';

export default function Mantra({ user }) {
  const [affirmation, setAffirmation] = useState({});
  const history = useHistory();

  const getDailyAffirmation = () => {
    getAffirmation().then((obj) => {
      setAffirmation({
        affirmation: obj.affirmation,
      });
    });
  };

  const saveMantra = () => {
    addMantraToDB({ ...affirmation, userId: user.uid }).then(() => {
      history.push(`/account/${user.uid}`);
    });
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-text">{affirmation.affirmation}</h2>
        {affirmation.affirmation ? (
          <button type="button" onClick={saveMantra}>
            Save Affirmation To Account
          </button>
        ) : (
          <>
            <h5 className="card-title">
              Click to get your daily affirmation from Luna Yogi!
            </h5>
            <button
              type="button"
              className="btn btn success"
              onClick={getDailyAffirmation}
            >
              Click Here!
            </button>
          </>
        )}
      </div>
    </div>
  );
}

Mantra.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
};

Mantra.defaultProps = {
  user: null,
};
