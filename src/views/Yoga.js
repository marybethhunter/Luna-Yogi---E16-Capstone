import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { signInUser } from '../api/auth';
import { getRandomFlow, getSpecificFlow } from '../api/data/yogaData';

export default function Yoga({ user }) {
  const [randomFlow, setRandomFlow] = useState({});
  const [formInput, setFormInput] = useState('');
  const [categoryFlow, setCategoryFlow] = useState({});

  console.warn(formInput);

  const getNumBt1and12 = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const getARandomFlow = () => {
    getRandomFlow(getNumBt1and12(1, 12)).then((flowObj) => {
      setRandomFlow({
        flowId: flowObj.id,
        name: flowObj.name,
        short_name: flowObj.short_name,
        description: flowObj.description,
        poses: flowObj.yoga_poses,
      });
    });
  };

  const getCategoryFlow = (num) => {
    getSpecificFlow(num).then((flowObject) => {
      setCategoryFlow({
        flowId: flowObject.id,
        name: flowObject.name,
        short_name: flowObject.short_name,
        description: flowObject.description,
        poses: flowObject.yoga_poses,
      });
    });
  };

  const resetForm = () => {
    setFormInput('');
  };

  const handleChange = (e) => {
    setFormInput(() => ({
      [e.target.name]: e.target.value,
    }));
  };

  const handleDropdownClick = () => {
    document.querySelector('#sortDropdown').addEventListener('change', () => {
      const dropDown = document.querySelector('#sortDropdown').value;
      if (dropDown === 'core') {
        getSpecificFlow(1).then(() => {
          getCategoryFlow(1);
        });
      }
      if (dropDown === 'seated') {
        getSpecificFlow(2).then(() => {
          getCategoryFlow(2);
        });
      }
      if (dropDown === 'strength') {
        getSpecificFlow(3).then(() => {
          getCategoryFlow(3);
        });
      }
      if (dropDown === 'chest') {
        getSpecificFlow(4).then(() => {
          getCategoryFlow(4);
        });
      }
      if (dropDown === 'backbend') {
        getSpecificFlow(5).then(() => {
          getCategoryFlow(5);
        });
      }
      if (dropDown === 'forward') {
        getSpecificFlow(6).then(() => {
          getCategoryFlow(6);
        });
      }
      if (dropDown === 'hip') {
        getSpecificFlow(7).then(() => {
          getCategoryFlow(7);
        });
      }
      if (dropDown === 'standing') {
        getSpecificFlow(8).then(() => {
          getCategoryFlow(8);
        });
      }
      if (dropDown === 'restorative') {
        getSpecificFlow(9).then(() => {
          getCategoryFlow(9);
        });
      }
      if (dropDown === 'arm') {
        getSpecificFlow(10).then(() => {
          getCategoryFlow(10);
        });
      }
      if (dropDown === 'balancing') {
        getSpecificFlow(11).then(() => {
          getCategoryFlow(11);
        });
      }
      if (dropDown === 'inversion') {
        getSpecificFlow(12).then(() => {
          getCategoryFlow(12);
        });
      }
    });
    resetForm();
  };

  return (
    <>
      {user ? (
        <div>
          {randomFlow.name || categoryFlow.name ? (
            ''
          ) : (
            <div>
              <h1>Yoga Flows</h1>
              <button
                type="button"
                className="btn btn-primary"
                onClick={getARandomFlow}
                style={{ width: '18rem' }}
              >
                Get Random Yoga Flow
              </button>
              <div>
                <select
                  id="sortDropdown"
                  className="form-select sorting"
                  aria-label="sort-dropdown"
                  style={{ width: '18rem' }}
                  onChange={handleChange}
                  onClick={() => {
                    handleDropdownClick();
                    console.warn(randomFlow);
                  }}
                >
                  <option value="">Select Flow By Type</option>
                  <option id="core" name="core" value="core">
                    Core Yoga Poses
                  </option>
                  <option id="seated" name="seated" value="seated">
                    Seated Yoga Poses
                  </option>
                  <option id="strength" name="strength" value="strength">
                    Strengthening Yoga Poses
                  </option>
                  <option id="chest" name="chest" value="chest">
                    Chest Opening Yoga Poses
                  </option>
                  <option id="backbend" name="backbend" value="backbend">
                    Yoga Backbend Poses
                  </option>
                  <option id="forward" name="forward" value="forward">
                    Forward Bend Yoga Poses
                  </option>
                  <option id="hip" name="hip" value="hip">
                    Hip Opening Yoga Poses
                  </option>
                  <option id="standing" name="standing" value="standing">
                    Standing Yoga Poses
                  </option>
                  <option
                    id="restorative"
                    name="restorative"
                    value="restorative"
                  >
                    Restorative Yoga Poses
                  </option>
                  <option id="arm" name="arm" value="arm">
                    Arm Balance Yoga Poses
                  </option>
                  <option id="balancing" name="balancing" value="balancing">
                    Balancing Yoga Poses
                  </option>
                  <option id="inversion" name="inversion" value="inversion">
                    Inversion Yoga Poses
                  </option>
                </select>
              </div>
              <Button
                type="button"
                className="btn btn-primary"
                style={{ width: '18rem' }}
                href="/createflow"
              >
                Create Custom Flow
              </Button>
            </div>
          )}
          <div>
            {randomFlow.name === 'Core Yoga Poses' ? (
              <>
                <h2>Flow Name: {randomFlow.name}</h2>
                <h4>{randomFlow.description}</h4>
                <div>
                  <div>{randomFlow.poses[0].sanskrit_name}</div>
                  <div>{randomFlow.poses[0].english_name}</div>
                  <img
                    src={randomFlow.poses[0].img_url}
                    alt={randomFlow.poses[0].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[1].sanskrit_name}</div>
                  <div>{randomFlow.poses[1].english_name}</div>
                  <img
                    src={randomFlow.poses[1].img_url}
                    alt={randomFlow.poses[1].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[2].sanskrit_name}</div>
                  <div>{randomFlow.poses[2].english_name}</div>
                  <img
                    src={randomFlow.poses[2].img_url}
                    alt={randomFlow.poses[2].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[3].sanskrit_name}</div>
                  <div>{randomFlow.poses[3].english_name}</div>
                  <img
                    src={randomFlow.poses[3].img_url}
                    alt={randomFlow.poses[3].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[4].sanskrit_name}</div>
                  <div>{randomFlow.poses[4].english_name}</div>
                  <img
                    src={randomFlow.poses[4].img_url}
                    alt={randomFlow.poses[4].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[5].sanskrit_name}</div>
                  <div>{randomFlow.poses[5].english_name}</div>
                  <img
                    src={randomFlow.poses[5].img_url}
                    alt={randomFlow.poses[5].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[6].sanskrit_name}</div>
                  <div>{randomFlow.poses[6].english_name}</div>
                  <img
                    src={randomFlow.poses[6].img_url}
                    alt={randomFlow.poses[6].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[7].sanskrit_name}</div>
                  <div>{randomFlow.poses[7].english_name}</div>
                  <img
                    src={randomFlow.poses[7].img_url}
                    alt={randomFlow.poses[7].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
              </>
            ) : null}
            {randomFlow.name === 'Seated Yoga Poses' ? (
              <>
                <h2>Flow Name: {randomFlow.name}</h2>
                <h4>{randomFlow.description}</h4>
                <div>
                  <div>{randomFlow.poses[0].sanskrit_name}</div>
                  <div>{randomFlow.poses[0].english_name}</div>
                  <img
                    src={randomFlow.poses[0].img_url}
                    alt={randomFlow.poses[0].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[1].sanskrit_name}</div>
                  <div>{randomFlow.poses[1].english_name}</div>
                  <img
                    src={randomFlow.poses[1].img_url}
                    alt={randomFlow.poses[1].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[2].sanskrit_name}</div>
                  <div>{randomFlow.poses[2].english_name}</div>
                  <img
                    src={randomFlow.poses[2].img_url}
                    alt={randomFlow.poses[2].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[3].sanskrit_name}</div>
                  <div>{randomFlow.poses[3].english_name}</div>
                  <img
                    src={randomFlow.poses[3].img_url}
                    alt={randomFlow.poses[3].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[4].sanskrit_name}</div>
                  <div>{randomFlow.poses[4].english_name}</div>
                  <img
                    src={randomFlow.poses[4].img_url}
                    alt={randomFlow.poses[4].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[5].sanskrit_name}</div>
                  <div>{randomFlow.poses[5].english_name}</div>
                  <img
                    src={randomFlow.poses[5].img_url}
                    alt={randomFlow.poses[5].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[6].sanskrit_name}</div>
                  <div>{randomFlow.poses[6].english_name}</div>
                  <img
                    src={randomFlow.poses[6].img_url}
                    alt={randomFlow.poses[6].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[7].sanskrit_name}</div>
                  <div>{randomFlow.poses[7].english_name}</div>
                  <img
                    src={randomFlow.poses[7].img_url}
                    alt={randomFlow.poses[7].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
              </>
            ) : null}
            {randomFlow.name === 'Strengthening Yoga Poses' ? (
              <>
                <h2>Flow Name: {randomFlow.name}</h2>
                <h4>{randomFlow.description}</h4>
                <div>
                  <div>{randomFlow.poses[0].sanskrit_name}</div>
                  <div>{randomFlow.poses[0].english_name}</div>
                  <img
                    src={randomFlow.poses[0].img_url}
                    alt={randomFlow.poses[0].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[1].sanskrit_name}</div>
                  <div>{randomFlow.poses[1].english_name}</div>
                  <img
                    src={randomFlow.poses[1].img_url}
                    alt={randomFlow.poses[1].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[2].sanskrit_name}</div>
                  <div>{randomFlow.poses[2].english_name}</div>
                  <img
                    src={randomFlow.poses[2].img_url}
                    alt={randomFlow.poses[2].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[3].sanskrit_name}</div>
                  <div>{randomFlow.poses[3].english_name}</div>
                  <img
                    src={randomFlow.poses[3].img_url}
                    alt={randomFlow.poses[3].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[4].sanskrit_name}</div>
                  <div>{randomFlow.poses[4].english_name}</div>
                  <img
                    src={randomFlow.poses[4].img_url}
                    alt={randomFlow.poses[4].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[5].sanskrit_name}</div>
                  <div>{randomFlow.poses[5].english_name}</div>
                  <img
                    src={randomFlow.poses[5].img_url}
                    alt={randomFlow.poses[5].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[6].sanskrit_name}</div>
                  <div>{randomFlow.poses[6].english_name}</div>
                  <img
                    src={randomFlow.poses[6].img_url}
                    alt={randomFlow.poses[6].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[7].sanskrit_name}</div>
                  <div>{randomFlow.poses[7].english_name}</div>
                  <img
                    src={randomFlow.poses[7].img_url}
                    alt={randomFlow.poses[7].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[8].sanskrit_name}</div>
                  <div>{randomFlow.poses[8].english_name}</div>
                  <img
                    src={randomFlow.poses[8].img_url}
                    alt={randomFlow.poses[8].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[9].sanskrit_name}</div>
                  <div>{randomFlow.poses[9].english_name}</div>
                  <img
                    src={randomFlow.poses[9].img_url}
                    alt={randomFlow.poses[9].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[10].sanskrit_name}</div>
                  <div>{randomFlow.poses[10].english_name}</div>
                  <img
                    src={randomFlow.poses[10].img_url}
                    alt={randomFlow.poses[10].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[11].sanskrit_name}</div>
                  <div>{randomFlow.poses[11].english_name}</div>
                  <img
                    src={randomFlow.poses[11].img_url}
                    alt={randomFlow.poses[11].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[12].sanskrit_name}</div>
                  <div>{randomFlow.poses[12].english_name}</div>
                  <img
                    src={randomFlow.poses[12].img_url}
                    alt={randomFlow.poses[12].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[13].sanskrit_name}</div>
                  <div>{randomFlow.poses[13].english_name}</div>
                  <img
                    src={randomFlow.poses[13].img_url}
                    alt={randomFlow.poses[13].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[14].sanskrit_name}</div>
                  <div>{randomFlow.poses[14].english_name}</div>
                  <img
                    src={randomFlow.poses[14].img_url}
                    alt={randomFlow.poses[14].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
              </>
            ) : null}
            {randomFlow.name === 'Chest Opening Yoga Poses' ? (
              <>
                <h2>Flow Name: {randomFlow.name}</h2>
                <h4>{randomFlow.description}</h4>
                <div>
                  <div>{randomFlow.poses[0].sanskrit_name}</div>
                  <div>{randomFlow.poses[0].english_name}</div>
                  <img
                    src={randomFlow.poses[0].img_url}
                    alt={randomFlow.poses[0].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[1].sanskrit_name}</div>
                  <div>{randomFlow.poses[1].english_name}</div>
                  <img
                    src={randomFlow.poses[1].img_url}
                    alt={randomFlow.poses[1].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[2].sanskrit_name}</div>
                  <div>{randomFlow.poses[2].english_name}</div>
                  <img
                    src={randomFlow.poses[2].img_url}
                    alt={randomFlow.poses[2].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[3].sanskrit_name}</div>
                  <div>{randomFlow.poses[3].english_name}</div>
                  <img
                    src={randomFlow.poses[3].img_url}
                    alt={randomFlow.poses[3].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[4].sanskrit_name}</div>
                  <div>{randomFlow.poses[4].english_name}</div>
                  <img
                    src={randomFlow.poses[4].img_url}
                    alt={randomFlow.poses[4].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[5].sanskrit_name}</div>
                  <div>{randomFlow.poses[5].english_name}</div>
                  <img
                    src={randomFlow.poses[5].img_url}
                    alt={randomFlow.poses[5].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[6].sanskrit_name}</div>
                  <div>{randomFlow.poses[6].english_name}</div>
                  <img
                    src={randomFlow.poses[6].img_url}
                    alt={randomFlow.poses[6].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
              </>
            ) : null}
            {randomFlow.name === 'Yoga Backbend Poses' ? (
              <>
                <h2>Flow Name: {randomFlow.name}</h2>
                <h4>{randomFlow.description}</h4>
                <div>
                  <div>{randomFlow.poses[0].sanskrit_name}</div>
                  <div>{randomFlow.poses[0].english_name}</div>
                  <img
                    src={randomFlow.poses[0].img_url}
                    alt={randomFlow.poses[0].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[1].sanskrit_name}</div>
                  <div>{randomFlow.poses[1].english_name}</div>
                  <img
                    src={randomFlow.poses[1].img_url}
                    alt={randomFlow.poses[1].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[2].sanskrit_name}</div>
                  <div>{randomFlow.poses[2].english_name}</div>
                  <img
                    src={randomFlow.poses[2].img_url}
                    alt={randomFlow.poses[2].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[3].sanskrit_name}</div>
                  <div>{randomFlow.poses[3].english_name}</div>
                  <img
                    src={randomFlow.poses[3].img_url}
                    alt={randomFlow.poses[3].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[4].sanskrit_name}</div>
                  <div>{randomFlow.poses[4].english_name}</div>
                  <img
                    src={randomFlow.poses[4].img_url}
                    alt={randomFlow.poses[4].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[5].sanskrit_name}</div>
                  <div>{randomFlow.poses[5].english_name}</div>
                  <img
                    src={randomFlow.poses[5].img_url}
                    alt={randomFlow.poses[5].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[6].sanskrit_name}</div>
                  <div>{randomFlow.poses[6].english_name}</div>
                  <img
                    src={randomFlow.poses[6].img_url}
                    alt={randomFlow.poses[6].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[7].sanskrit_name}</div>
                  <div>{randomFlow.poses[7].english_name}</div>
                  <img
                    src={randomFlow.poses[7].img_url}
                    alt={randomFlow.poses[7].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[8].sanskrit_name}</div>
                  <div>{randomFlow.poses[8].english_name}</div>
                  <img
                    src={randomFlow.poses[8].img_url}
                    alt={randomFlow.poses[8].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
              </>
            ) : null}
            {randomFlow.name === 'Hip Opening Yoga Poses' ? (
              <>
                <h2>Flow Name: {randomFlow.name}</h2>
                <h4>{randomFlow.description}</h4>
                <div>
                  <div>{randomFlow.poses[0].sanskrit_name}</div>
                  <div>{randomFlow.poses[0].english_name}</div>
                  <img
                    src={randomFlow.poses[0].img_url}
                    alt={randomFlow.poses[0].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[1].sanskrit_name}</div>
                  <div>{randomFlow.poses[1].english_name}</div>
                  <img
                    src={randomFlow.poses[1].img_url}
                    alt={randomFlow.poses[1].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[2].sanskrit_name}</div>
                  <div>{randomFlow.poses[2].english_name}</div>
                  <img
                    src={randomFlow.poses[2].img_url}
                    alt={randomFlow.poses[2].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[3].sanskrit_name}</div>
                  <div>{randomFlow.poses[3].english_name}</div>
                  <img
                    src={randomFlow.poses[3].img_url}
                    alt={randomFlow.poses[3].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[4].sanskrit_name}</div>
                  <div>{randomFlow.poses[4].english_name}</div>
                  <img
                    src={randomFlow.poses[4].img_url}
                    alt={randomFlow.poses[4].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[5].sanskrit_name}</div>
                  <div>{randomFlow.poses[5].english_name}</div>
                  <img
                    src={randomFlow.poses[5].img_url}
                    alt={randomFlow.poses[5].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[6].sanskrit_name}</div>
                  <div>{randomFlow.poses[6].english_name}</div>
                  <img
                    src={randomFlow.poses[6].img_url}
                    alt={randomFlow.poses[6].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
              </>
            ) : null}
            {randomFlow.name === 'Standing Yoga Poses' ? (
              <>
                <h2>Flow Name: {randomFlow.name}</h2>
                <h4>{randomFlow.description}</h4>
                <div>
                  <div>{randomFlow.poses[0].sanskrit_name}</div>
                  <div>{randomFlow.poses[0].english_name}</div>
                  <img
                    src={randomFlow.poses[0].img_url}
                    alt={randomFlow.poses[0].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[1].sanskrit_name}</div>
                  <div>{randomFlow.poses[1].english_name}</div>
                  <img
                    src={randomFlow.poses[1].img_url}
                    alt={randomFlow.poses[1].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[2].sanskrit_name}</div>
                  <div>{randomFlow.poses[2].english_name}</div>
                  <img
                    src={randomFlow.poses[2].img_url}
                    alt={randomFlow.poses[2].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[3].sanskrit_name}</div>
                  <div>{randomFlow.poses[3].english_name}</div>
                  <img
                    src={randomFlow.poses[3].img_url}
                    alt={randomFlow.poses[3].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[4].sanskrit_name}</div>
                  <div>{randomFlow.poses[4].english_name}</div>
                  <img
                    src={randomFlow.poses[4].img_url}
                    alt={randomFlow.poses[4].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[5].sanskrit_name}</div>
                  <div>{randomFlow.poses[5].english_name}</div>
                  <img
                    src={randomFlow.poses[5].img_url}
                    alt={randomFlow.poses[5].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[6].sanskrit_name}</div>
                  <div>{randomFlow.poses[6].english_name}</div>
                  <img
                    src={randomFlow.poses[6].img_url}
                    alt={randomFlow.poses[6].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[7].sanskrit_name}</div>
                  <div>{randomFlow.poses[7].english_name}</div>
                  <img
                    src={randomFlow.poses[7].img_url}
                    alt={randomFlow.poses[7].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[8].sanskrit_name}</div>
                  <div>{randomFlow.poses[8].english_name}</div>
                  <img
                    src={randomFlow.poses[8].img_url}
                    alt={randomFlow.poses[8].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[9].sanskrit_name}</div>
                  <div>{randomFlow.poses[9].english_name}</div>
                  <img
                    src={randomFlow.poses[9].img_url}
                    alt={randomFlow.poses[9].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[10].sanskrit_name}</div>
                  <div>{randomFlow.poses[10].english_name}</div>
                  <img
                    src={randomFlow.poses[10].img_url}
                    alt={randomFlow.poses[10].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[11].sanskrit_name}</div>
                  <div>{randomFlow.poses[11].english_name}</div>
                  <img
                    src={randomFlow.poses[11].img_url}
                    alt={randomFlow.poses[11].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[12].sanskrit_name}</div>
                  <div>{randomFlow.poses[12].english_name}</div>
                  <img
                    src={randomFlow.poses[12].img_url}
                    alt={randomFlow.poses[12].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[13].sanskrit_name}</div>
                  <div>{randomFlow.poses[13].english_name}</div>
                  <img
                    src={randomFlow.poses[13].img_url}
                    alt={randomFlow.poses[13].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[14].sanskrit_name}</div>
                  <div>{randomFlow.poses[14].english_name}</div>
                  <img
                    src={randomFlow.poses[14].img_url}
                    alt={randomFlow.poses[14].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[15].sanskrit_name}</div>
                  <div>{randomFlow.poses[15].english_name}</div>
                  <img
                    src={randomFlow.poses[15].img_url}
                    alt={randomFlow.poses[15].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[16].sanskrit_name}</div>
                  <div>{randomFlow.poses[16].english_name}</div>
                  <img
                    src={randomFlow.poses[16].img_url}
                    alt={randomFlow.poses[16].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[17].sanskrit_name}</div>
                  <div>{randomFlow.poses[17].english_name}</div>
                  <img
                    src={randomFlow.poses[17].img_url}
                    alt={randomFlow.poses[17].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
              </>
            ) : null}
            {randomFlow.name === 'Forward Bend Yoga Poses' ? (
              <>
                <h2>Flow Name: {randomFlow.name}</h2>
                <h4>{randomFlow.description}</h4>
                <div>
                  <div>{randomFlow.poses[0].sanskrit_name}</div>
                  <div>{randomFlow.poses[0].english_name}</div>
                  <img
                    src={randomFlow.poses[0].img_url}
                    alt={randomFlow.poses[0].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[1].sanskrit_name}</div>
                  <div>{randomFlow.poses[1].english_name}</div>
                  <img
                    src={randomFlow.poses[1].img_url}
                    alt={randomFlow.poses[1].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[2].sanskrit_name}</div>
                  <div>{randomFlow.poses[2].english_name}</div>
                  <img
                    src={randomFlow.poses[2].img_url}
                    alt={randomFlow.poses[2].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[3].sanskrit_name}</div>
                  <div>{randomFlow.poses[3].english_name}</div>
                  <img
                    src={randomFlow.poses[3].img_url}
                    alt={randomFlow.poses[3].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[4].sanskrit_name}</div>
                  <div>{randomFlow.poses[4].english_name}</div>
                  <img
                    src={randomFlow.poses[4].img_url}
                    alt={randomFlow.poses[4].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[5].sanskrit_name}</div>
                  <div>{randomFlow.poses[5].english_name}</div>
                  <img
                    src={randomFlow.poses[5].img_url}
                    alt={randomFlow.poses[5].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[6].sanskrit_name}</div>
                  <div>{randomFlow.poses[6].english_name}</div>
                  <img
                    src={randomFlow.poses[6].img_url}
                    alt={randomFlow.poses[6].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[7].sanskrit_name}</div>
                  <div>{randomFlow.poses[7].english_name}</div>
                  <img
                    src={randomFlow.poses[7].img_url}
                    alt={randomFlow.poses[7].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
              </>
            ) : null}
            {randomFlow.name === 'Restorative Yoga Poses' ? (
              <>
                <h2>Flow Name: {randomFlow.name}</h2>
                <h4>{randomFlow.description}</h4>
                <div>
                  <div>{randomFlow.poses[0].sanskrit_name}</div>
                  <div>{randomFlow.poses[0].english_name}</div>
                  <img
                    src={randomFlow.poses[0].img_url}
                    alt={randomFlow.poses[0].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[1].sanskrit_name}</div>
                  <div>{randomFlow.poses[1].english_name}</div>
                  <img
                    src={randomFlow.poses[1].img_url}
                    alt={randomFlow.poses[1].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
              </>
            ) : null}
            {randomFlow.name === 'Arm Balance Yoga Poses' ? (
              <>
                <h2>Flow Name: {randomFlow.name}</h2>
                <h4>{randomFlow.description}</h4>
                <div>
                  <div>{randomFlow.poses[0].sanskrit_name}</div>
                  <div>{randomFlow.poses[0].english_name}</div>
                  <img
                    src={randomFlow.poses[0].img_url}
                    alt={randomFlow.poses[0].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[1].sanskrit_name}</div>
                  <div>{randomFlow.poses[1].english_name}</div>
                  <img
                    src={randomFlow.poses[1].img_url}
                    alt={randomFlow.poses[1].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[2].sanskrit_name}</div>
                  <div>{randomFlow.poses[2].english_name}</div>
                  <img
                    src={randomFlow.poses[2].img_url}
                    alt={randomFlow.poses[2].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[3].sanskrit_name}</div>
                  <div>{randomFlow.poses[3].english_name}</div>
                  <img
                    src={randomFlow.poses[3].img_url}
                    alt={randomFlow.poses[3].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
              </>
            ) : null}
            {randomFlow.name === 'Balancing Yoga Poses' ? (
              <>
                <h2>Flow Name: {randomFlow.name}</h2>
                <h4>{randomFlow.description}</h4>
                <div>
                  <div>{randomFlow.poses[0].sanskrit_name}</div>
                  <div>{randomFlow.poses[0].english_name}</div>
                  <img
                    src={randomFlow.poses[0].img_url}
                    alt={randomFlow.poses[0].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[1].sanskrit_name}</div>
                  <div>{randomFlow.poses[1].english_name}</div>
                  <img
                    src={randomFlow.poses[1].img_url}
                    alt={randomFlow.poses[1].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[2].sanskrit_name}</div>
                  <div>{randomFlow.poses[2].english_name}</div>
                  <img
                    src={randomFlow.poses[2].img_url}
                    alt={randomFlow.poses[2].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[3].sanskrit_name}</div>
                  <div>{randomFlow.poses[3].english_name}</div>
                  <img
                    src={randomFlow.poses[3].img_url}
                    alt={randomFlow.poses[3].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[4].sanskrit_name}</div>
                  <div>{randomFlow.poses[4].english_name}</div>
                  <img
                    src={randomFlow.poses[4].img_url}
                    alt={randomFlow.poses[4].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[5].sanskrit_name}</div>
                  <div>{randomFlow.poses[5].english_name}</div>
                  <img
                    src={randomFlow.poses[5].img_url}
                    alt={randomFlow.poses[5].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[6].sanskrit_name}</div>
                  <div>{randomFlow.poses[6].english_name}</div>
                  <img
                    src={randomFlow.poses[6].img_url}
                    alt={randomFlow.poses[6].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[7].sanskrit_name}</div>
                  <div>{randomFlow.poses[7].english_name}</div>
                  <img
                    src={randomFlow.poses[7].img_url}
                    alt={randomFlow.poses[7].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[8].sanskrit_name}</div>
                  <div>{randomFlow.poses[8].english_name}</div>
                  <img
                    src={randomFlow.poses[8].img_url}
                    alt={randomFlow.poses[8].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
              </>
            ) : null}
            {randomFlow.name === 'Inversion Yoga Poses' ? (
              <>
                <h2>Flow Name: {randomFlow.name}</h2>
                <h4>{randomFlow.description}</h4>
                <div>
                  <div>{randomFlow.poses[0].sanskrit_name}</div>
                  <div>{randomFlow.poses[0].english_name}</div>
                  <img
                    src={randomFlow.poses[0].img_url}
                    alt={randomFlow.poses[0].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[1].sanskrit_name}</div>
                  <div>{randomFlow.poses[1].english_name}</div>
                  <img
                    src={randomFlow.poses[1].img_url}
                    alt={randomFlow.poses[1].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[2].sanskrit_name}</div>
                  <div>{randomFlow.poses[2].english_name}</div>
                  <img
                    src={randomFlow.poses[2].img_url}
                    alt={randomFlow.poses[2].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{randomFlow.poses[3].sanskrit_name}</div>
                  <div>{randomFlow.poses[3].english_name}</div>
                  <img
                    src={randomFlow.poses[3].img_url}
                    alt={randomFlow.poses[3].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
              </>
            ) : null}
            {categoryFlow.name === 'Core Yoga Poses' ? (
              <>
                <h2>Flow Name: {categoryFlow.name}</h2>
                <h4>{categoryFlow.description}</h4>
                <div>
                  <div>{categoryFlow.poses[0].sanskrit_name}</div>
                  <div>{categoryFlow.poses[0].english_name}</div>
                  <img
                    src={categoryFlow.poses[0].img_url}
                    alt={categoryFlow.poses[0].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[1].sanskrit_name}</div>
                  <div>{categoryFlow.poses[1].english_name}</div>
                  <img
                    src={categoryFlow.poses[1].img_url}
                    alt={categoryFlow.poses[1].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[2].sanskrit_name}</div>
                  <div>{categoryFlow.poses[2].english_name}</div>
                  <img
                    src={categoryFlow.poses[2].img_url}
                    alt={categoryFlow.poses[2].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[3].sanskrit_name}</div>
                  <div>{categoryFlow.poses[3].english_name}</div>
                  <img
                    src={categoryFlow.poses[3].img_url}
                    alt={categoryFlow.poses[3].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[4].sanskrit_name}</div>
                  <div>{categoryFlow.poses[4].english_name}</div>
                  <img
                    src={categoryFlow.poses[4].img_url}
                    alt={categoryFlow.poses[4].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[5].sanskrit_name}</div>
                  <div>{categoryFlow.poses[5].english_name}</div>
                  <img
                    src={categoryFlow.poses[5].img_url}
                    alt={categoryFlow.poses[5].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[6].sanskrit_name}</div>
                  <div>{categoryFlow.poses[6].english_name}</div>
                  <img
                    src={categoryFlow.poses[6].img_url}
                    alt={categoryFlow.poses[6].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[7].sanskrit_name}</div>
                  <div>{categoryFlow.poses[7].english_name}</div>
                  <img
                    src={categoryFlow.poses[7].img_url}
                    alt={categoryFlow.poses[7].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
              </>
            ) : null}
            {categoryFlow.name === 'Seated Yoga Poses' ? (
              <>
                <h2>Flow Name: {categoryFlow.name}</h2>
                <h4>{categoryFlow.description}</h4>
                <div>
                  <div>{categoryFlow.poses[0].sanskrit_name}</div>
                  <div>{categoryFlow.poses[0].english_name}</div>
                  <img
                    src={categoryFlow.poses[0].img_url}
                    alt={categoryFlow.poses[0].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[1].sanskrit_name}</div>
                  <div>{categoryFlow.poses[1].english_name}</div>
                  <img
                    src={categoryFlow.poses[1].img_url}
                    alt={categoryFlow.poses[1].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[2].sanskrit_name}</div>
                  <div>{categoryFlow.poses[2].english_name}</div>
                  <img
                    src={categoryFlow.poses[2].img_url}
                    alt={categoryFlow.poses[2].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[3].sanskrit_name}</div>
                  <div>{categoryFlow.poses[3].english_name}</div>
                  <img
                    src={categoryFlow.poses[3].img_url}
                    alt={categoryFlow.poses[3].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[4].sanskrit_name}</div>
                  <div>{categoryFlow.poses[4].english_name}</div>
                  <img
                    src={categoryFlow.poses[4].img_url}
                    alt={categoryFlow.poses[4].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[5].sanskrit_name}</div>
                  <div>{categoryFlow.poses[5].english_name}</div>
                  <img
                    src={categoryFlow.poses[5].img_url}
                    alt={categoryFlow.poses[5].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[6].sanskrit_name}</div>
                  <div>{categoryFlow.poses[6].english_name}</div>
                  <img
                    src={categoryFlow.poses[6].img_url}
                    alt={categoryFlow.poses[6].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[7].sanskrit_name}</div>
                  <div>{categoryFlow.poses[7].english_name}</div>
                  <img
                    src={categoryFlow.poses[7].img_url}
                    alt={categoryFlow.poses[7].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
              </>
            ) : null}
            {categoryFlow.name === 'Strengthening Yoga Poses' ? (
              <>
                <h2>Flow Name: {categoryFlow.name}</h2>
                <h4>{categoryFlow.description}</h4>
                <div>
                  <div>{categoryFlow.poses[0].sanskrit_name}</div>
                  <div>{categoryFlow.poses[0].english_name}</div>
                  <img
                    src={categoryFlow.poses[0].img_url}
                    alt={categoryFlow.poses[0].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[1].sanskrit_name}</div>
                  <div>{categoryFlow.poses[1].english_name}</div>
                  <img
                    src={categoryFlow.poses[1].img_url}
                    alt={categoryFlow.poses[1].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[2].sanskrit_name}</div>
                  <div>{categoryFlow.poses[2].english_name}</div>
                  <img
                    src={categoryFlow.poses[2].img_url}
                    alt={categoryFlow.poses[2].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[3].sanskrit_name}</div>
                  <div>{categoryFlow.poses[3].english_name}</div>
                  <img
                    src={categoryFlow.poses[3].img_url}
                    alt={categoryFlow.poses[3].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[4].sanskrit_name}</div>
                  <div>{categoryFlow.poses[4].english_name}</div>
                  <img
                    src={categoryFlow.poses[4].img_url}
                    alt={categoryFlow.poses[4].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[5].sanskrit_name}</div>
                  <div>{categoryFlow.poses[5].english_name}</div>
                  <img
                    src={categoryFlow.poses[5].img_url}
                    alt={categoryFlow.poses[5].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[6].sanskrit_name}</div>
                  <div>{categoryFlow.poses[6].english_name}</div>
                  <img
                    src={categoryFlow.poses[6].img_url}
                    alt={categoryFlow.poses[6].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[7].sanskrit_name}</div>
                  <div>{categoryFlow.poses[7].english_name}</div>
                  <img
                    src={categoryFlow.poses[7].img_url}
                    alt={categoryFlow.poses[7].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[8].sanskrit_name}</div>
                  <div>{categoryFlow.poses[8].english_name}</div>
                  <img
                    src={categoryFlow.poses[8].img_url}
                    alt={categoryFlow.poses[8].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[9].sanskrit_name}</div>
                  <div>{categoryFlow.poses[9].english_name}</div>
                  <img
                    src={categoryFlow.poses[9].img_url}
                    alt={categoryFlow.poses[9].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[10].sanskrit_name}</div>
                  <div>{categoryFlow.poses[10].english_name}</div>
                  <img
                    src={categoryFlow.poses[10].img_url}
                    alt={categoryFlow.poses[10].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[11].sanskrit_name}</div>
                  <div>{categoryFlow.poses[11].english_name}</div>
                  <img
                    src={categoryFlow.poses[11].img_url}
                    alt={categoryFlow.poses[11].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[12].sanskrit_name}</div>
                  <div>{categoryFlow.poses[12].english_name}</div>
                  <img
                    src={categoryFlow.poses[12].img_url}
                    alt={categoryFlow.poses[12].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[13].sanskrit_name}</div>
                  <div>{categoryFlow.poses[13].english_name}</div>
                  <img
                    src={categoryFlow.poses[13].img_url}
                    alt={categoryFlow.poses[13].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[14].sanskrit_name}</div>
                  <div>{categoryFlow.poses[14].english_name}</div>
                  <img
                    src={categoryFlow.poses[14].img_url}
                    alt={categoryFlow.poses[14].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
              </>
            ) : null}
            {categoryFlow.name === 'Chest Opening Yoga Poses' ? (
              <>
                <h2>Flow Name: {categoryFlow.name}</h2>
                <h4>{categoryFlow.description}</h4>
                <div>
                  <div>{categoryFlow.poses[0].sanskrit_name}</div>
                  <div>{categoryFlow.poses[0].english_name}</div>
                  <img
                    src={categoryFlow.poses[0].img_url}
                    alt={categoryFlow.poses[0].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[1].sanskrit_name}</div>
                  <div>{categoryFlow.poses[1].english_name}</div>
                  <img
                    src={categoryFlow.poses[1].img_url}
                    alt={categoryFlow.poses[1].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[2].sanskrit_name}</div>
                  <div>{categoryFlow.poses[2].english_name}</div>
                  <img
                    src={categoryFlow.poses[2].img_url}
                    alt={categoryFlow.poses[2].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[3].sanskrit_name}</div>
                  <div>{categoryFlow.poses[3].english_name}</div>
                  <img
                    src={categoryFlow.poses[3].img_url}
                    alt={categoryFlow.poses[3].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[4].sanskrit_name}</div>
                  <div>{categoryFlow.poses[4].english_name}</div>
                  <img
                    src={categoryFlow.poses[4].img_url}
                    alt={categoryFlow.poses[4].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[5].sanskrit_name}</div>
                  <div>{categoryFlow.poses[5].english_name}</div>
                  <img
                    src={categoryFlow.poses[5].img_url}
                    alt={categoryFlow.poses[5].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[6].sanskrit_name}</div>
                  <div>{categoryFlow.poses[6].english_name}</div>
                  <img
                    src={categoryFlow.poses[6].img_url}
                    alt={categoryFlow.poses[6].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
              </>
            ) : null}
            {categoryFlow.name === 'Yoga Backbend Poses' ? (
              <>
                <h2>Flow Name: {categoryFlow.name}</h2>
                <h4>{categoryFlow.description}</h4>
                <div>
                  <div>{categoryFlow.poses[0].sanskrit_name}</div>
                  <div>{categoryFlow.poses[0].english_name}</div>
                  <img
                    src={categoryFlow.poses[0].img_url}
                    alt={categoryFlow.poses[0].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[1].sanskrit_name}</div>
                  <div>{categoryFlow.poses[1].english_name}</div>
                  <img
                    src={categoryFlow.poses[1].img_url}
                    alt={categoryFlow.poses[1].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[2].sanskrit_name}</div>
                  <div>{categoryFlow.poses[2].english_name}</div>
                  <img
                    src={categoryFlow.poses[2].img_url}
                    alt={categoryFlow.poses[2].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[3].sanskrit_name}</div>
                  <div>{categoryFlow.poses[3].english_name}</div>
                  <img
                    src={categoryFlow.poses[3].img_url}
                    alt={categoryFlow.poses[3].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[4].sanskrit_name}</div>
                  <div>{categoryFlow.poses[4].english_name}</div>
                  <img
                    src={categoryFlow.poses[4].img_url}
                    alt={categoryFlow.poses[4].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[5].sanskrit_name}</div>
                  <div>{categoryFlow.poses[5].english_name}</div>
                  <img
                    src={categoryFlow.poses[5].img_url}
                    alt={categoryFlow.poses[5].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[6].sanskrit_name}</div>
                  <div>{categoryFlow.poses[6].english_name}</div>
                  <img
                    src={categoryFlow.poses[6].img_url}
                    alt={categoryFlow.poses[6].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[7].sanskrit_name}</div>
                  <div>{categoryFlow.poses[7].english_name}</div>
                  <img
                    src={categoryFlow.poses[7].img_url}
                    alt={categoryFlow.poses[7].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[8].sanskrit_name}</div>
                  <div>{categoryFlow.poses[8].english_name}</div>
                  <img
                    src={categoryFlow.poses[8].img_url}
                    alt={categoryFlow.poses[8].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
              </>
            ) : null}
            {categoryFlow.name === 'Forward Bend Yoga Poses' ? (
              <>
                <h2>Flow Name: {categoryFlow.name}</h2>
                <h4>{categoryFlow.description}</h4>
                <div>
                  <div>{categoryFlow.poses[0].sanskrit_name}</div>
                  <div>{categoryFlow.poses[0].english_name}</div>
                  <img
                    src={categoryFlow.poses[0].img_url}
                    alt={categoryFlow.poses[0].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[1].sanskrit_name}</div>
                  <div>{categoryFlow.poses[1].english_name}</div>
                  <img
                    src={categoryFlow.poses[1].img_url}
                    alt={categoryFlow.poses[1].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[2].sanskrit_name}</div>
                  <div>{categoryFlow.poses[2].english_name}</div>
                  <img
                    src={categoryFlow.poses[2].img_url}
                    alt={categoryFlow.poses[2].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[3].sanskrit_name}</div>
                  <div>{categoryFlow.poses[3].english_name}</div>
                  <img
                    src={categoryFlow.poses[3].img_url}
                    alt={categoryFlow.poses[3].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[4].sanskrit_name}</div>
                  <div>{categoryFlow.poses[4].english_name}</div>
                  <img
                    src={categoryFlow.poses[4].img_url}
                    alt={categoryFlow.poses[4].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[5].sanskrit_name}</div>
                  <div>{categoryFlow.poses[5].english_name}</div>
                  <img
                    src={categoryFlow.poses[5].img_url}
                    alt={categoryFlow.poses[5].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[6].sanskrit_name}</div>
                  <div>{categoryFlow.poses[6].english_name}</div>
                  <img
                    src={categoryFlow.poses[6].img_url}
                    alt={categoryFlow.poses[6].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[7].sanskrit_name}</div>
                  <div>{categoryFlow.poses[7].english_name}</div>
                  <img
                    src={categoryFlow.poses[7].img_url}
                    alt={categoryFlow.poses[7].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
              </>
            ) : null}
            {categoryFlow.name === 'Hip Opening Yoga Poses' ? (
              <>
                <h2>Flow Name: {categoryFlow.name}</h2>
                <h4>{categoryFlow.description}</h4>
                <div>
                  <div>{categoryFlow.poses[0].sanskrit_name}</div>
                  <div>{categoryFlow.poses[0].english_name}</div>
                  <img
                    src={categoryFlow.poses[0].img_url}
                    alt={categoryFlow.poses[0].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[1].sanskrit_name}</div>
                  <div>{categoryFlow.poses[1].english_name}</div>
                  <img
                    src={categoryFlow.poses[1].img_url}
                    alt={categoryFlow.poses[1].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[2].sanskrit_name}</div>
                  <div>{categoryFlow.poses[2].english_name}</div>
                  <img
                    src={categoryFlow.poses[2].img_url}
                    alt={categoryFlow.poses[2].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[3].sanskrit_name}</div>
                  <div>{categoryFlow.poses[3].english_name}</div>
                  <img
                    src={categoryFlow.poses[3].img_url}
                    alt={categoryFlow.poses[3].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[4].sanskrit_name}</div>
                  <div>{categoryFlow.poses[4].english_name}</div>
                  <img
                    src={categoryFlow.poses[4].img_url}
                    alt={categoryFlow.poses[4].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[5].sanskrit_name}</div>
                  <div>{categoryFlow.poses[5].english_name}</div>
                  <img
                    src={categoryFlow.poses[5].img_url}
                    alt={categoryFlow.poses[5].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[6].sanskrit_name}</div>
                  <div>{categoryFlow.poses[6].english_name}</div>
                  <img
                    src={categoryFlow.poses[6].img_url}
                    alt={categoryFlow.poses[6].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
              </>
            ) : null}
            {categoryFlow.name === 'Standing Yoga Poses' ? (
              <>
                <h2>Flow Name: {categoryFlow.name}</h2>
                <h4>{categoryFlow.description}</h4>
                <div>
                  <div>{categoryFlow.poses[0].sanskrit_name}</div>
                  <div>{categoryFlow.poses[0].english_name}</div>
                  <img
                    src={categoryFlow.poses[0].img_url}
                    alt={categoryFlow.poses[0].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[1].sanskrit_name}</div>
                  <div>{categoryFlow.poses[1].english_name}</div>
                  <img
                    src={categoryFlow.poses[1].img_url}
                    alt={categoryFlow.poses[1].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[2].sanskrit_name}</div>
                  <div>{categoryFlow.poses[2].english_name}</div>
                  <img
                    src={categoryFlow.poses[2].img_url}
                    alt={categoryFlow.poses[2].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[3].sanskrit_name}</div>
                  <div>{categoryFlow.poses[3].english_name}</div>
                  <img
                    src={categoryFlow.poses[3].img_url}
                    alt={categoryFlow.poses[3].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[4].sanskrit_name}</div>
                  <div>{categoryFlow.poses[4].english_name}</div>
                  <img
                    src={categoryFlow.poses[4].img_url}
                    alt={categoryFlow.poses[4].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[5].sanskrit_name}</div>
                  <div>{categoryFlow.poses[5].english_name}</div>
                  <img
                    src={categoryFlow.poses[5].img_url}
                    alt={categoryFlow.poses[5].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[6].sanskrit_name}</div>
                  <div>{categoryFlow.poses[6].english_name}</div>
                  <img
                    src={categoryFlow.poses[6].img_url}
                    alt={categoryFlow.poses[6].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[7].sanskrit_name}</div>
                  <div>{categoryFlow.poses[7].english_name}</div>
                  <img
                    src={categoryFlow.poses[7].img_url}
                    alt={categoryFlow.poses[7].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[8].sanskrit_name}</div>
                  <div>{categoryFlow.poses[8].english_name}</div>
                  <img
                    src={categoryFlow.poses[8].img_url}
                    alt={categoryFlow.poses[8].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[9].sanskrit_name}</div>
                  <div>{categoryFlow.poses[9].english_name}</div>
                  <img
                    src={categoryFlow.poses[9].img_url}
                    alt={categoryFlow.poses[9].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[10].sanskrit_name}</div>
                  <div>{categoryFlow.poses[10].english_name}</div>
                  <img
                    src={categoryFlow.poses[10].img_url}
                    alt={categoryFlow.poses[10].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[11].sanskrit_name}</div>
                  <div>{categoryFlow.poses[11].english_name}</div>
                  <img
                    src={categoryFlow.poses[11].img_url}
                    alt={categoryFlow.poses[11].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[12].sanskrit_name}</div>
                  <div>{categoryFlow.poses[12].english_name}</div>
                  <img
                    src={categoryFlow.poses[12].img_url}
                    alt={categoryFlow.poses[12].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[13].sanskrit_name}</div>
                  <div>{categoryFlow.poses[13].english_name}</div>
                  <img
                    src={categoryFlow.poses[13].img_url}
                    alt={categoryFlow.poses[13].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[14].sanskrit_name}</div>
                  <div>{categoryFlow.poses[14].english_name}</div>
                  <img
                    src={categoryFlow.poses[14].img_url}
                    alt={categoryFlow.poses[14].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[15].sanskrit_name}</div>
                  <div>{categoryFlow.poses[15].english_name}</div>
                  <img
                    src={categoryFlow.poses[15].img_url}
                    alt={categoryFlow.poses[15].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[16].sanskrit_name}</div>
                  <div>{categoryFlow.poses[16].english_name}</div>
                  <img
                    src={categoryFlow.poses[16].img_url}
                    alt={categoryFlow.poses[16].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[17].sanskrit_name}</div>
                  <div>{categoryFlow.poses[17].english_name}</div>
                  <img
                    src={categoryFlow.poses[17].img_url}
                    alt={categoryFlow.poses[17].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
              </>
            ) : null}
            {categoryFlow.name === 'Forward Bend Yoga Poses' ? (
              <>
                <h2>Flow Name: {categoryFlow.name}</h2>
                <h4>{categoryFlow.description}</h4>
                <div>
                  <div>{categoryFlow.poses[0].sanskrit_name}</div>
                  <div>{categoryFlow.poses[0].english_name}</div>
                  <img
                    src={categoryFlow.poses[0].img_url}
                    alt={categoryFlow.poses[0].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[1].sanskrit_name}</div>
                  <div>{categoryFlow.poses[1].english_name}</div>
                  <img
                    src={categoryFlow.poses[1].img_url}
                    alt={categoryFlow.poses[1].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[2].sanskrit_name}</div>
                  <div>{categoryFlow.poses[2].english_name}</div>
                  <img
                    src={categoryFlow.poses[2].img_url}
                    alt={categoryFlow.poses[2].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[3].sanskrit_name}</div>
                  <div>{categoryFlow.poses[3].english_name}</div>
                  <img
                    src={categoryFlow.poses[3].img_url}
                    alt={categoryFlow.poses[3].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[4].sanskrit_name}</div>
                  <div>{categoryFlow.poses[4].english_name}</div>
                  <img
                    src={categoryFlow.poses[4].img_url}
                    alt={categoryFlow.poses[4].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[5].sanskrit_name}</div>
                  <div>{categoryFlow.poses[5].english_name}</div>
                  <img
                    src={categoryFlow.poses[5].img_url}
                    alt={categoryFlow.poses[5].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[6].sanskrit_name}</div>
                  <div>{categoryFlow.poses[6].english_name}</div>
                  <img
                    src={categoryFlow.poses[6].img_url}
                    alt={categoryFlow.poses[6].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[7].sanskrit_name}</div>
                  <div>{categoryFlow.poses[7].english_name}</div>
                  <img
                    src={categoryFlow.poses[7].img_url}
                    alt={categoryFlow.poses[7].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
              </>
            ) : null}
            {categoryFlow.name === 'Restorative Yoga Poses' ? (
              <>
                <h2>Flow Name: {categoryFlow.name}</h2>
                <h4>{categoryFlow.description}</h4>
                <div>
                  <div>{categoryFlow.poses[0].sanskrit_name}</div>
                  <div>{categoryFlow.poses[0].english_name}</div>
                  <img
                    src={categoryFlow.poses[0].img_url}
                    alt={categoryFlow.poses[0].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[1].sanskrit_name}</div>
                  <div>{categoryFlow.poses[1].english_name}</div>
                  <img
                    src={categoryFlow.poses[1].img_url}
                    alt={categoryFlow.poses[1].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
              </>
            ) : null}
            {categoryFlow.name === 'Arm Balance Yoga Poses' ? (
              <>
                <h2>Flow Name: {categoryFlow.name}</h2>
                <h4>{categoryFlow.description}</h4>
                <div>
                  <div>{categoryFlow.poses[0].sanskrit_name}</div>
                  <div>{categoryFlow.poses[0].english_name}</div>
                  <img
                    src={categoryFlow.poses[0].img_url}
                    alt={categoryFlow.poses[0].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[1].sanskrit_name}</div>
                  <div>{categoryFlow.poses[1].english_name}</div>
                  <img
                    src={categoryFlow.poses[1].img_url}
                    alt={categoryFlow.poses[1].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[2].sanskrit_name}</div>
                  <div>{categoryFlow.poses[2].english_name}</div>
                  <img
                    src={categoryFlow.poses[2].img_url}
                    alt={categoryFlow.poses[2].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[3].sanskrit_name}</div>
                  <div>{categoryFlow.poses[3].english_name}</div>
                  <img
                    src={categoryFlow.poses[3].img_url}
                    alt={categoryFlow.poses[3].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
              </>
            ) : null}
            {categoryFlow.name === 'Balancing Yoga Poses' ? (
              <>
                <h2>Flow Name: {categoryFlow.name}</h2>
                <h4>{categoryFlow.description}</h4>
                <div>
                  <div>{categoryFlow.poses[0].sanskrit_name}</div>
                  <div>{categoryFlow.poses[0].english_name}</div>
                  <img
                    src={categoryFlow.poses[0].img_url}
                    alt={categoryFlow.poses[0].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[1].sanskrit_name}</div>
                  <div>{categoryFlow.poses[1].english_name}</div>
                  <img
                    src={categoryFlow.poses[1].img_url}
                    alt={categoryFlow.poses[1].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[2].sanskrit_name}</div>
                  <div>{categoryFlow.poses[2].english_name}</div>
                  <img
                    src={categoryFlow.poses[2].img_url}
                    alt={categoryFlow.poses[2].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[3].sanskrit_name}</div>
                  <div>{categoryFlow.poses[3].english_name}</div>
                  <img
                    src={categoryFlow.poses[3].img_url}
                    alt={categoryFlow.poses[3].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[4].sanskrit_name}</div>
                  <div>{categoryFlow.poses[4].english_name}</div>
                  <img
                    src={categoryFlow.poses[4].img_url}
                    alt={categoryFlow.poses[4].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[5].sanskrit_name}</div>
                  <div>{categoryFlow.poses[5].english_name}</div>
                  <img
                    src={categoryFlow.poses[5].img_url}
                    alt={categoryFlow.poses[5].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[6].sanskrit_name}</div>
                  <div>{categoryFlow.poses[6].english_name}</div>
                  <img
                    src={categoryFlow.poses[6].img_url}
                    alt={categoryFlow.poses[6].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[7].sanskrit_name}</div>
                  <div>{categoryFlow.poses[7].english_name}</div>
                  <img
                    src={categoryFlow.poses[7].img_url}
                    alt={categoryFlow.poses[7].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[8].sanskrit_name}</div>
                  <div>{categoryFlow.poses[8].english_name}</div>
                  <img
                    src={categoryFlow.poses[8].img_url}
                    alt={categoryFlow.poses[8].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
              </>
            ) : null}
            {categoryFlow.name === 'Inversion Yoga Poses' ? (
              <>
                <h2>Flow Name: {categoryFlow.name}</h2>
                <h4>{categoryFlow.description}</h4>
                <div>
                  <div>{categoryFlow.poses[0].sanskrit_name}</div>
                  <div>{categoryFlow.poses[0].english_name}</div>
                  <img
                    src={categoryFlow.poses[0].img_url}
                    alt={categoryFlow.poses[0].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[1].sanskrit_name}</div>
                  <div>{categoryFlow.poses[1].english_name}</div>
                  <img
                    src={categoryFlow.poses[1].img_url}
                    alt={categoryFlow.poses[1].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[2].sanskrit_name}</div>
                  <div>{categoryFlow.poses[2].english_name}</div>
                  <img
                    src={categoryFlow.poses[2].img_url}
                    alt={categoryFlow.poses[2].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
                <div>
                  <div>{categoryFlow.poses[3].sanskrit_name}</div>
                  <div>{categoryFlow.poses[3].english_name}</div>
                  <img
                    src={categoryFlow.poses[3].img_url}
                    alt={categoryFlow.poses[3].english_name}
                    style={{ width: '18rem' }}
                  />
                </div>
              </>
            ) : null}
          </div>
        </div>
      ) : (
        <div>
          <h1>please log in</h1>
          <button type="button" onClick={signInUser}>
            sign in
          </button>
        </div>
      )}
    </>
  );
}

Yoga.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
};

Yoga.defaultProps = {
  user: null,
};
