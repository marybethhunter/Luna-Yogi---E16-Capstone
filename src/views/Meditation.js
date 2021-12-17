import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import ReactAudioPlayer from 'react-audio-player';
import styled from 'styled-components';
import {
  addMeditationToDB,
  getDailyMeditation,
} from '../api/data/meditationData';

const DivStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin-right: 350px;
  margin-left: 350px;
`;

const ButtonStyle = styled.button`
  background-color: white,
  width: 100px;
  height: 40px;
  border-radius: 8px;
  border: 0px solid white;
`;

export default function Meditation({ user, admin }) {
  const [meditation, setMeditation] = useState({});
  const history = useHistory();

  const getMeditation = () => {
    getDailyMeditation().then((obj) => {
      setMeditation({
        meditation_title: obj.meditation.meditation_title,
        meditation_duration: obj.meditation.meditation_duration,
        meditation_subtitle: obj.meditation.meditation_subtitle,
        meditation_image: obj.meditation.meditation_image,
        meditation_url: obj.meditation.meditation_url,
        meditation_webplayer_url: obj.meditation_webplayer_url,
      });
    });
  };

  const saveMeditation = () => {
    addMeditationToDB({ ...meditation, userId: user.uid }).then(() => {
      history.push(`/account/${user.uid}`);
    });
  };

  return (
    <DivStyle>
      {admin ? (
        <Link to="/addmeditation" style={{ color: 'black' }}>
          Add New Meditation
        </Link>
      ) : (
        ''
      )}
      <div className="card" style={{ border: 'none' }}>
        <div className="card-body">
          <h1 className="card-text">
            {meditation.meditation_title} {meditation.meditation_duration}
          </h1>
          <h5 className="card-text">{meditation.meditation_subtitle}</h5>
          <div>
            {meditation.meditation_title ? (
              <ReactAudioPlayer
                src={meditation.meditation_url}
                controls
                style={{ marginTop: 10 }}
              />
            ) : (
              ''
            )}
          </div>
          {meditation.meditation_title ? (
            <>
              {user ? (
                <ButtonStyle
                  type="button"
                  onClick={saveMeditation}
                  style={{ width: 200, height: 50, marginTop: 20 }}
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
                style={{ width: 200, height: 50, marginTop: 20 }}
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
  admin: PropTypes.shape(PropTypes.obj),
};

Meditation.defaultProps = {
  user: null,
  admin: null,
};
