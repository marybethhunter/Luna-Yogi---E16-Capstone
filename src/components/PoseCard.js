import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CardStyle = styled.div`
  margin: 5px;
  border-radius: 5px;
`;

export default function PoseCard({ pose }) {
  return (
    <div>
      <CardStyle className="card" style={{ width: '18rem' }}>
        <img
          className="card-img-top"
          src={pose.img_url}
          alt={pose.english_name}
        />
        <div className="card-body">
          <p className="card-text">
            {pose.english_name} - {pose.sanskrit_name}
          </p>
        </div>
      </CardStyle>
    </div>
  );
}

PoseCard.propTypes = {
  pose: PropTypes.shape({
    sanskrit_name: PropTypes.string,
    english_name: PropTypes.string,
    img_url: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};
