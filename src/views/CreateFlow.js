import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getAllPoses } from '../api/data/yogaData';
// import PoseCard from '../components/PoseCard';

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
  return poses.filter(
    (pose) => pose.english_name.toLowerCase().includes(searchValue)
      || pose.sanskrit_name.toLowerCase().includes(searchValue),
  );
};

// const getFilteredPoses = (poses) => poses.filter((pose) => pose.addedToPose === true);

export default function CreateFlow({ admin }) {
  const [poses, setPoses] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  // const [formInput, setFormInput] = useState([]);
  // const [chosenPoses, setChosenPoses] = useState([]);
  const searchTerms = getSearchItems(searchValue, poses);
  // const selectedPoses = getFilteredPoses(poses);

  // const handleChecked = (e) => {
  //   const { name, checked } = e.target;
  //   setFormInput((prevState) => ({
  //     ...prevState,
  //     [name]: checked,
  //   }));
  //   console.warn(formInput);
  // };

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
      <h1>Add Poses to Custom Flow</h1>
      <h3>
        Click &apos;CREATE FLOW&apos; once you have selected your desired poses!
      </h3>
      <div>
        <button type="button">CREATE FLOW</button>
        {admin ? <Link to="/addpose">Add Pose</Link> : ''}
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
      {searchTerms ? (
        <DivStyle>
          {searchTerms.map((term) => (
            // <PoseCard
            //   key={term.id}
            //   pose={term}
            //   setPoses={setPoses}
            //   user={user}
            //   admin={admin}
            // />
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
                <label htmlFor="poseToAdd">Add to Custom Flow</label>
                <input
                  name="poseToAdd"
                  type="checkbox"
                  className="form-check-input"
                  id="poseToAdd"
                  checked={poses[term.id]}
                  onChange={() => {
                    setPoses((prevState) => ({
                      ...prevState,
                      [term.id]: prevState[term.id]
                        ? null
                        : {
                          id: term.id,
                          english_name: term.english_name,
                          sanskrit_name: term.sanskrit_name,
                          img_url: term.img_url,
                        },
                    }));
                  }}
                />
              </div>
            </CardStyle>
          ))}
        </DivStyle>
      ) : (
        <h2>Pose Not Found</h2>
      )}
      {/* {selectedPoses ? (
        <DivStyle>
          {selectedPoses.map((pose) => (
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
          ))}
        </DivStyle>
      ) : (null)} */}
    </div>
  );
}

CreateFlow.propTypes = {
  // user: PropTypes.shape(PropTypes.obj),
  admin: PropTypes.shape(PropTypes.obj),
  pose: PropTypes.shape({}),
};

CreateFlow.defaultProps = {
  // user: null,
  admin: null,
  pose: {},
};
