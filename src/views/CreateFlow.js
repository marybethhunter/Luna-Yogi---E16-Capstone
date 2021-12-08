import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getAllPoses } from '../api/data/yogaData';
import PoseCard from '../components/PoseCard';

const DivStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
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

export default function CreateFlow({ user }) {
  const [poses, setPoses] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const searchTerms = getSearchItems(searchValue, poses);

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
      <div>
        <button type="button">CREATE FLOW</button>
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
            <PoseCard
              key={term.id}
              pose={term}
              setPoses={setPoses}
              user={user}
            />
          ))}
        </DivStyle>
      ) : (
        <h2>Pose Not Found</h2>
      )}
    </div>
  );
}

CreateFlow.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
};

CreateFlow.defaultProps = {
  user: null,
};
