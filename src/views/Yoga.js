import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { signInUser } from '../api/auth';
import { addFlowToDB, getRandomFlow, addPoseToDB } from '../api/data/yogaData';
import PoseCard from '../components/PoseCard';

const CardDivStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
`;

const DivStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
  margin-right: 400px;
  margin-left: 400px;
`;

const ButtonStyle = styled.button`
  background-color: white,
  width: 100px;
  height: 40px;
  border-radius: 8px;
  margin: 10px;
  border: 0px solid white;
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
      dateCreated: new Date().toDateString(),
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
    <DivStyle>
      {user ? (
        <div>
          {randomFlow.name ? (
            ''
          ) : (
            <div>
              <DivStyle>
                <h1 style={{ marginTop: 30 }}>Yoga Flows</h1>
              </DivStyle>
              <DivStyle>
                <ButtonStyle
                  type="button"
                  onClick={() => getARandomFlow(getNumBt1and12(1, 12))}
                  style={{ width: '18rem' }}
                >
                  Get Random Yoga Flow
                </ButtonStyle>
                <div>
                  <select
                    id="sortDropdown"
                    aria-label="sort-dropdown"
                    style={{
                      width: '18rem',
                      backgroundColor: 'rgb(239, 239, 239)',
                      border: 'white 1px solid',
                      borderRadius: 8,
                      height: 42,
                      textAlign: 'center',
                    }}
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
                <ButtonStyle type="button" style={{ width: '18rem' }}>
                  <Link
                    to="/createflow"
                    style={{ color: 'black', textDecoration: 'none' }}
                  >
                    Create Custom Flow
                  </Link>
                </ButtonStyle>
              </DivStyle>
            </div>
          )}
          <div>
            {randomFlow.poses ? (
              <>
                <CardDivStyle>
                  <h2>{randomFlow.name}</h2>
                  <h5>{randomFlow.description}</h5>
                </CardDivStyle>
                <CardDivStyle>
                  <ButtonStyle type="button" onClick={handleSave}>
                    Save Flow To Account
                  </ButtonStyle>
                </CardDivStyle>
              </>
            ) : (
              ''
            )}
            <CardDivStyle style={{ marginBottom: 50 }}>
              {randomFlow.poses?.map((pose) => (
                <PoseCard pose={pose} key={pose.id} />
              ))}
            </CardDivStyle>
          </div>
        </div>
      ) : (
        <div
          style={{ display: 'flex', flexDirection: 'column', marginTop: 30 }}
        >
          <h1>Please Sign In to Access Yoga</h1>
          <ButtonStyle type="button" onClick={signInUser}>
            Sign In
          </ButtonStyle>
        </div>
      )}
    </DivStyle>
  );
}

Yoga.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
};

Yoga.defaultProps = {
  user: null,
};
