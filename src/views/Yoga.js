import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import { signInUser } from '../api/auth';
import { addFlowToDB, getRandomFlow, addPoseToDB } from '../api/data/yogaData';
import PoseCard from '../components/PoseCard';

const DivStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default function Yoga({ user }) {
  const [randomFlow, setRandomFlow] = useState({});
  const history = useHistory();

  let count = 0;

  const addOne = () => {
    count += 1;
    return count;
  };

  const getNumBt1and12 = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const getARandomFlow = (num) => {
    addFlowToDB({
      userId: user.uid,
      dateCreated: new Date().toString(),
    }).then((flowId) => {
      getRandomFlow(num).then((flowObj) => {
        setRandomFlow({
          name: flowObj.name,
          short_name: flowObj.short_name,
          description: flowObj.description,
          poses: flowObj.yoga_poses,
          flowId,
        });
      });
    });
  };

  const handleSave = () => {
    randomFlow.poses.forEach((pose) => {
      const newId = addOne();
      addPoseToDB({
        ...pose,
        flowId: randomFlow.flowId,
        orderNumber: newId,
      }).then(() => {
        history.push(`/account/${user.uid}`);
      });
    });
  };

  const handleChange = (e) => {
    getARandomFlow(e.target.value);
  };

  return (
    <>
      {user ? (
        <div>
          {randomFlow.name ? (
            ''
          ) : (
            <div>
              <h1>Yoga Flows</h1>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => getARandomFlow(getNumBt1and12(1, 12))}
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
                >
                  <option value="">Select Flow By Type</option>
                  <option id="core" name="core" value="1">
                    Core Yoga Poses
                  </option>
                  <option id="seated" name="seated" value="2">
                    Seated Yoga Poses
                  </option>
                  <option id="strength" name="strength" value="3">
                    Strengthening Yoga Poses
                  </option>
                  <option id="chest" name="chest" value="4">
                    Chest Opening Yoga Poses
                  </option>
                  <option id="backbend" name="backbend" value="5">
                    Yoga Backbend Poses
                  </option>
                  <option id="forward" name="forward" value="6">
                    Forward Bend Yoga Poses
                  </option>
                  <option id="hip" name="hip" value="7">
                    Hip Opening Yoga Poses
                  </option>
                  <option id="standing" name="standing" value="8">
                    Standing Yoga Poses
                  </option>
                  <option id="restorative" name="restorative" value="9">
                    Restorative Yoga Poses
                  </option>
                  <option id="arm" name="arm" value="10">
                    Arm Balance Yoga Poses
                  </option>
                  <option id="balancing" name="balancing" value="11">
                    Balancing Yoga Poses
                  </option>
                  <option id="inversion" name="inversion" value="12">
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
            {randomFlow.poses ? (
              <div>
                <button type="button" onClick={handleSave}>
                  Save Flow To Account
                </button>
              </div>
            ) : (
              ''
            )}
            <DivStyle>
              {randomFlow.poses?.map((pose) => (
                <PoseCard pose={pose} key={pose.id} />
              ))}
            </DivStyle>
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
