import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  getFlowByUid,
  getMantraByUid,
  getMeditationByUid,
} from '../api/data/userData';

export default function Account({ admin }) {
  const [userMeditations, setUserMeditations] = useState([]);
  const [userMantras, setUserMantras] = useState([]);
  // const [userBlogPosts, setUserBlogPosts] = useState([]);
  const [userFlows, setUserFlows] = useState([]);
  const { uid } = useParams();

  useEffect(() => {
    let isMounted = true;
    getMeditationByUid(uid).then((medArray) => {
      if (isMounted) setUserMeditations(medArray);
      console.warn(userMeditations);
    });
    getMantraByUid(uid).then((mantraArray) => {
      if (isMounted) setUserMantras(mantraArray);
      console.warn(userMantras);
    });
    getFlowByUid(uid).then((flowArray) => {
      if (isMounted) setUserFlows(flowArray);
      console.warn(userFlows);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <>
        <h1>user acc page - their user id {uid} </h1>
        <h2>Saved Flows</h2>
        {userFlows.map((flow) => (
          <div key={flow.flowId}>
            <ul>
              <li>Flow Created On: {flow.dateCreated}</li>
              <Link to={`/flows/${flow.flowId}`}>Go to Flow</Link>
            </ul>
          </div>
        ))}
        <h2>Saved Meditations</h2>
        {userMeditations.map((meditation) => (
          <div key={meditation.meditationId}>
            <ul>
              <li>{meditation.meditation_title}</li>
              <a
                href={meditation.meditation_url}
                target="_blank"
                rel="noreferrer"
              >
                Link to Meditation
              </a>
            </ul>
          </div>
        ))}
        <h2>Saved Mantras</h2>
        {userMantras.map((mantra) => (
          <div key={mantra.mantraId}>
            <ul>
              <li>{mantra.affirmation}</li>
            </ul>
          </div>
        ))}
        <h2>Saved Blog Posts</h2>
      </>
      {admin ? (
        <>
          <h1>admin acc page</h1>
          <Link to="/addblog">Add New Blog Post</Link>
        </>
      ) : (
        ''
      )}
    </>
  );
}

Account.propTypes = {
  admin: PropTypes.shape(PropTypes.obj),
  // user: PropTypes.shape(PropTypes.obj),
};

Account.defaultProps = {
  admin: null,
  // user: null,
};
