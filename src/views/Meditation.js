import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  addMeditationToDB,
  getDailyMeditation,
} from '../api/data/meditationData';

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

export default function Meditation({ user }) {
  const [meditation, setMeditation] = useState({});

  const getMeditation = () => {
    getDailyMeditation().then((obj) => {
      setMeditation({
        meditation_title: obj.meditation[0].meditation_title,
        meditation_duration: obj.meditation[0].meditation_duration,
        meditation_subtitle: obj.meditation[0].meditation_subtitle,
        meditation_image: obj.meditation[0].meditation_image,
        meditation_url: obj.meditation[0].meditation_url,
      });
    });
  };

  const saveMeditation = () => {
    addMeditationToDB({ ...meditation, userId: user.uid });
  };

  return (
    <DivStyle>
      <div className="card" style={{ border: 'none' }}>
        <div className="card-body">
          <h1 className="card-text">{meditation.meditation_title}</h1>
          <h4>{meditation.meditation_duration}</h4>
          <h5 className="card-text">{meditation.meditation_subtitle}</h5>
          <img
            src={meditation.meditation_image}
            alt={meditation.meditation_title}
            style={{ width: '30rem' }}
          />
          {meditation.meditation_title ? (
            <a
              href={meditation.meditation_url}
              target="_blank"
              rel="noreferrer"
            >
              Link to Meditation
            </a>
          ) : (
            ''
          )}
          {meditation.meditation_title ? (
            <>
              {user ? (
                <ButtonStyle
                  type="button"
                  onClick={saveMeditation}
                  style={{ width: 200, height: 50 }}
                >
                  Save Meditation To Account
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
                onClick={getMeditation}
              >
                Get daily meditation!
              </ButtonStyle>
            </DivStyle>
          )}
        </div>
      </div>
    </DivStyle>
  );
}

Meditation.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
};

Meditation.defaultProps = {
  user: null,
};
