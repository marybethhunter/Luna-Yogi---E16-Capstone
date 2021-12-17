import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import ReactAudioPlayer from 'react-audio-player';
import {
  getFlowByUid,
  getMantraByUid,
  getMeditationByUid,
  getBlogsByUid,
} from '../api/data/userData';

const DivStyle = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const MedStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default function Account() {
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
      if (isMounted) {
        setUserFlows(
          flowArray.sort((a, b) => (a.dateCreated > b.dateCreated ? 1 : -1)),
        );
      }
    });
    getBlogsByUid(uid).then((blogArray) => {
      if (isMounted) setUserBlogPosts(blogArray);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <DivStyle>
      <h1 style={{ margin: 20 }}>Your Luna Yogi Account</h1>
      <h2>Saved Flows</h2>
      <>
        {userFlows.map((flow) => (
          <div key={flow.flowId}>
            <ul>
              <li>
                <Link
                  to={`/flows/${flow.flowId}`}
                  style={{ color: 'black', textDecoration: 'none' }}
                >
                  Flow Created On: {flow.dateCreated}
                </Link>
              </li>
            </ul>
          </div>
        ))}
      </>
      <h2>Saved Meditations</h2>
      {userMeditations.map((meditation) => (
        <div key={meditation.meditationId}>
          {/* <ul> */}
          {/* <li> */}
          <MedStyle>
            <u>{meditation.meditation_title}</u>
            {/* </li> */}
            <ReactAudioPlayer
              src={meditation.meditation_url}
              controls
              style={{ marginTop: 10, marginBottom: 25 }}
            />
          </MedStyle>
          {/* </ul> */}
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
        <div key={post.firebaseKey}>
          <ul>
            <li>
              <Link
                to={`/blog/${post.postId}`}
                style={{ color: 'black', textDecoration: 'none' }}
              >
                {post.title}
              </Link>
            </li>
          </ul>
        </div>
      ))}
      <div>
        <img
          src="https://i.ibb.co/8dH7KLN/footer-squiggle-1.png"
          alt="gold squiggle"
          style={{ width: '60%', height: 'auto' }}
        />
      </div>
    </DivStyle>
  );
}
