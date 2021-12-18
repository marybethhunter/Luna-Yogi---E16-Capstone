/* eslint-disable radix */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  getAllPoses,
  addPoseToDB,
  addCustomFlowToDB,
} from '../api/data/yogaData';
import { getMostRecentFlow } from '../api/data/userData';

const DivStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-right: 100px;
  margin-left: 100px;
`;

const CardStyle = styled.div`
  margin: 5px;
  border-radius: 5px;
`;

const ButtonStyle = styled.button`
  background-color: white,
  width: 150px;
  height: 40px;
  border-radius: 8px;
  margin: 10px;
  border: 0px solid white;
`;

const getSearchItems = (searchValue, poses) => {
  if (!searchValue) {
    return poses;
  }
  const filteredPosesBySearch = poses.filter(
    (pose) => pose.english_name.toLowerCase().includes(searchValue)
      || pose.sanskrit_name.toLowerCase().includes(searchValue),
  );

  return filteredPosesBySearch;
};

export default function CreateFlow({ user }) {
  const [poses, setPoses] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [formInput, setFormInput] = useState({});
  const [chosenPoses] = useState([]);
  const [flow, setFlow] = useState([]);
  const searchTerms = getSearchItems(searchValue, poses);
  const history = useHistory();

  let count = 0;

  const addOne = () => {
    count += 1;
    return count;
  };

  const handleChecked = (e) => {
    const { name, checked } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
    console.warn(formInput);
    if (e.target.checked === true) {
      const checkedPose = poses.find(
        (pose) => pose.id === parseInt(e.target.id),
      );
      chosenPoses.push(checkedPose);
      setFlow(chosenPoses);
    }
  };

  const handleClick = () => {
    addCustomFlowToDB({
      flow,
      userId: user.uid,
      dateCreated: new Date().toDateString(),
    }).then(() => {
      const searchDiv = document.getElementById('search');
      if (searchDiv.style.display === 'none') {
        searchDiv.style.display = 'block';
      } else {
        searchDiv.style.display = 'none';
      }
      const headingDiv = document.getElementById('heading');
      if (headingDiv.style.display === 'none') {
        headingDiv.style.display = 'block';
      } else {
        headingDiv.style.display = 'none';
      }
      const chosenDiv = document.getElementById('chosen');
      if (chosenDiv.style.display === 'none') {
        chosenDiv.style.display = 'block';
      } else {
        chosenDiv.style.display = 'none';
      }
    });
  };

  const saveCustomPoses = async () => {
    const flowIdToAdd = await getMostRecentFlow(user.uid);
    chosenPoses.forEach((chosenPose) => {
      const newId = addOne();
      addPoseToDB({
        ...chosenPose,
        flowId: flowIdToAdd.flowId,
        orderNumber: newId,
      }).then(() => {
        history.push(`/account/${user.uid}`);
      });
    });
  };

  useEffect(() => {
    let isMounted = true;
    getAllPoses().then((poseArray) => {
      if (isMounted) setPoses(poseArray);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <DivStyle>
      <div id="heading">
        <h1>Custom Yoga Flow</h1>
        <h3>Select the poses for your flow in order and click create!</h3>
        <div>
          <ButtonStyle type="button" onClick={handleClick}>
            Create Flow
          </ButtonStyle>
          <DivStyle>
            <div className="input-group" style={{ width: '20rem' }}>
              <span
                className="input-group-text border-0"
                id="search-addon"
                style={{ marginBottom: 5, borderRadius: 6, height: 40 }}
              >
                <i className="fas fa-search" />
              </span>
              <input
                type="text"
                style={{ marginBottom: 5, borderRadius: 8 }}
                className="form-control"
                placeholder="Search Poses"
                aria-label="Search Poses"
                aria-describedby="search-poses"
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />
            </div>
          </DivStyle>
        </div>
      </div>
      <div id="search">
        {searchTerms ? (
          <DivStyle>
            {searchTerms.map((term) => (
              <CardStyle
                className="card"
                style={{ width: '18rem' }}
                key={term.id}
              >
                <img
                  className="card-img-top"
                  src={term.img_url}
                  alt={term.english_name}
                />
                <div className="card-body">
                  <p className="card-text">
                    {term.english_name} - {term.sanskrit_name}
                  </p>
                </div>
                <div>
                  <label htmlFor="addedToFlow">Add to Custom Flow</label>
                  <input
                    name="addedToFlow"
                    type="checkbox"
                    className="form-check-input"
                    id={term.id}
                    checked={term.addedToFlow}
                    onChange={handleChecked}
                  />
                </div>
              </CardStyle>
            ))}
          </DivStyle>
        ) : (
          ''
        )}
      </div>
      <div id="chosen" style={{ display: 'none' }}>
        {chosenPoses ? (
          <>
            <h1>Custom Flow</h1>
            <ButtonStyle type="button" onClick={saveCustomPoses}>
              Save Flow To Account
            </ButtonStyle>
            <DivStyle>
              {chosenPoses.map((pose) => (
                <CardStyle
                  className="card"
                  style={{ width: '18rem' }}
                  key={pose.id}
                >
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
              ))}
            </DivStyle>
          </>
        ) : (
          ''
        )}
      </div>
    </DivStyle>
  );
}

CreateFlow.propTypes = {
  pose: PropTypes.shape({}),
  user: PropTypes.shape(PropTypes.obj),
};

CreateFlow.defaultProps = {
  pose: {},
  user: null,
};
