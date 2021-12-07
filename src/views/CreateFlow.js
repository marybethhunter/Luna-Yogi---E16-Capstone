import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getAllPoses } from '../api/data/yogaData';
import PoseCard from '../components/PoseCard';

const DivStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

// const getSearchPoses = (searchValue, poses) => {
//   if (!searchValue) {
//     return poses;
//   }
//   return poses.filter((pose) => pose.english_name.toLowerCase().includes(searchValue) || pose.sanskrit_name.toLowerCase().includes(searchValue));
// };

export default function CreateFlow({ user }) {
  const [poses, setPoses] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  // const searchItems = getSearchPoses(searchValue, poses);

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
      <DivStyle>
        {poses
          .filter((pose) => {
            if (searchValue === '') {
              return poses;
            }
            pose.english_name.toLowerCase().includes(searchValue.toLowerCase());
            return poses;
          })
          .map((pose) => (
            <PoseCard
              key={pose.id}
              pose={pose}
              setPoses={setPoses}
              user={user}
            />
          ))}
      </DivStyle>
      {/* {poses.map((pose) => (
        <PoseCard key={pose.id} pose={pose} setPoses={setPoses} user={user} poses={searchItems} />
      ))} */}
    </div>
  );
}

CreateFlow.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
};

CreateFlow.defaultProps = {
  user: null,
};
