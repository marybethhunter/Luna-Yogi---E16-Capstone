/* eslint-disable radix */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getAllPoses, addCustomFlowToDB } from '../api/data/yogaData';

const DivStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CardStyle = styled.div`
  margin: 5px;
  border-radius: 5px;
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
  const searchTerms = getSearchItems(searchValue, poses);
  const history = useHistory();

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
      console.warn(checkedPose);
    }
    console.warn(chosenPoses);
  };

  const handleClick = () => {
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
  };

  const saveCustomFlow = async () => {
    addCustomFlowToDB({
      ...chosenPoses,
      userId: user.uid,
      dateCreated: new Date().toString(),
    }).then(() => {
      history.push(`/account/${user.uid}`);
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
    <div>
      <div id="heading">
        <h1>Add Poses to Custom Flow</h1>
        <h3>
          Select the poses for your flow and click &apos;CREATE FLOW&apos;!
        </h3>
        <div>
          <button type="button" onClick={handleClick}>
            CREATE FLOW
          </button>
          <div className="input-group rounded" style={{ width: '20rem' }}>
            <span className="input-group-text border-0" id="search-addon">
              <i className="fas fa-search" />
            </span>
            <input
              type="text"
              className="form-control rounded"
              placeholder="Search Poses"
              aria-label="Search Poses"
              aria-describedby="search-poses"
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
          </div>
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
            <button type="button" onClick={saveCustomFlow}>
              Save Flow To Account
            </button>
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
    </div>
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
