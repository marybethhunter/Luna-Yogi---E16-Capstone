import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  getBlogsByUid,
  getFlowByUid,
  getMantraByUid,
  getMeditationByUid,
} from '../api/data/userData';

export default function Account({ admin }) {
  const [userMeditations, setUserMeditations] = useState([]);
  const [userMantras, setUserMantras] = useState([]);
  const [userBlogPosts, setUserBlogPosts] = useState([]);
  const [userFlows, setUserFlows] = useState([]);
  const { uid } = useParams();

  useEffect(() => {
    let isMounted = true;
    getMeditationByUid(uid).then((medArray) => {
      if (isMounted) setUserMeditations(medArray);
    });
    getMantraByUid(uid).then((mantraArray) => {
      if (isMounted) setUserMantras(mantraArray);
    });
    getFlowByUid(uid).then((flowArray) => {
      if (isMounted) setUserFlows(flowArray);
    });
    getBlogsByUid(uid).then((blogArray) => {
      if (isMounted) setUserBlogPosts(blogArray);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <h1>Your Luna Yogi Account</h1>
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
      {userBlogPosts.map((post) => (
        <div key={post.postId}>
          <ul>
            <li>{post.title}</li>
            <Link to={`/blog/${post.postId}`}>Go to Post</Link>
          </ul>
        </div>
      ))}
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
};

Account.defaultProps = {
  admin: null,
};
