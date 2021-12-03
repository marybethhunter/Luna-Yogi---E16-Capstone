import React, { useState } from 'react';
import { getDailyMeditation } from '../api/data/meditationData';

export default function Meditation() {
  const [meditation, setMeditation] = useState({});

  const getMeditation = () => {
    getDailyMeditation().then((obj) => {
      setMeditation({
        meditation_title: obj.meditation_title,
        meditation_duration: obj.meditation_duration,
        meditation_subtitle: obj.meditation_subtitle,
        meditation_image: obj.meditation_image,
        meditation_url: obj.meditation_url,
      });
    });
  };

  return (
    <div className="card">
      <div className="card-header">Daily Meditation</div>
      <div className="card-body">
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
        <p className="card-text">{meditation.meditation_title}</p>
        <p className="card-text">{meditation.meditation_duration}</p>
        <p className="card-text">{meditation.meditation_subtitle}</p>
        <p className="card-text">{meditation.meditation_image}</p>
        <p className="card-text">{meditation.meditation_url}</p>
      </div>
    </div>
  );
}
