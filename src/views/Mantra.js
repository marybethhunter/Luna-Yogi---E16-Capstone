import React, { useState } from 'react';
import getAffirmation from '../api/data/affirmationData';

export default function MAntra() {
  const [affirmation, setAffirmation] = useState({});

  const getDailyAffirmation = () => {
    getAffirmation().then((obj) => {
      setAffirmation({
        affirmation: obj.affirmation,
      });
    });
  };

  return (
    <div className="card">
      <div className="card-header">Daily Affirmation</div>
      <div className="card-body">
        <h5 className="card-title">
          Click to get your daily affirmation from Luna Yogi!
        </h5>
        {affirmation.affirmation ? (
          ''
        ) : (
          <button
            type="button"
            className="btn btn success"
            onClick={getDailyAffirmation}
          >
            Click Here!
          </button>
        )}
        <p className="card-text">{affirmation.affirmation}</p>
      </div>
    </div>
  );
}
