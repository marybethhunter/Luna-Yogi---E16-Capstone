import React, { useState } from 'react';
import getDailyMeditation from '../api/data/meditationData';

export default function Meditation() {
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

  return (
    <div className="card">
      <div className="card-body">
        {meditation.meditation_title ? (
          ''
        ) : (
          <>
            <h5 className="card-title">
              Click to get your daily meditation from Luna Yogi!
            </h5>
            <button
              type="button"
              className="btn btn success"
              onClick={getMeditation}
            >
              Click Here!
            </button>
          </>
        )}
        <h1 className="card-text">{meditation.meditation_title}</h1>
        <h4>{meditation.meditation_duration}</h4>
        <h5 className="card-text">{meditation.meditation_subtitle}</h5>
        <img
          src={meditation.meditation_image}
          alt={meditation.meditation_title}
          style={{ width: '30rem' }}
        />
        {meditation.meditation_title ? (
          <a href={meditation.meditation_url} target="_blank" rel="noreferrer">
            Link to Meditation
          </a>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
