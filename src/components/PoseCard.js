import React from 'react';
import PropTypes from 'prop-types';

export default function PoseCard({ pose }) {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img
        className="card-img-top"
        src={pose.img_url}
        alt={pose.english_name}
      />
      <div className="card-body">
        <p className="card-text">{pose.sanskrit_name}</p>
        <p className="card-text">{pose.english_name}</p>
      </div>
    </div>
  );
}

PoseCard.propTypes = {
  pose: PropTypes.shape({
    sanskrit_name: PropTypes.string,
    english_name: PropTypes.string,
    img_url: PropTypes.string,
    poseId: PropTypes.string,
  }).isRequired,
};
