import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleFlowfromFB } from '../api/data/yogaData';

export default function YogaDetails() {
  const [flow, setFlow] = useState([]);
  const { flowKey } = useParams();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getSingleFlowfromFB(flowKey).then(setFlow);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return <>{flow}</>;
}
