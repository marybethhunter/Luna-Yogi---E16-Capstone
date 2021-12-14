import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getPosesByFlowId } from '../api/data/yogaData';

const DivStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CardStyle = styled.div`
  margin: 5px;
  border-radius: 5px;
`;

export default function YogaDetails() {
  const [userPoses, setUserPoses] = useState([]);
  const { flowKey } = useParams();

  useEffect(() => {
    let isMounted = true;
    getPosesByFlowId(flowKey).then((poseArray) => {
      if (isMounted) {
        setUserPoses(
          poseArray.sort((a, b) => (a.orderNumber > b.orderNumber ? 1 : -1)),
        );
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <DivStyle>
        {userPoses.map((pose) => (
          <CardStyle
            className="card"
            style={{ width: '18rem' }}
            key={pose.orderNumber}
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
  );
}
