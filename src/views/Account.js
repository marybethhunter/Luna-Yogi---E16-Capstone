import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import ReactAudioPlayer from 'react-audio-player';
import {
  getFlowByUid,
  getMantraByUid,
  getMeditationByUid,
  getBlogsByUid,
  deleteSavedMeditation,
  deleteSavedAffirmation,
  deleteSavedBlogs,
  deleteSavedFlowsandPoses,
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
    <>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash-fill"
                    viewBox="0 0 16 16"
                    style={{ marginLeft: 12 }}
                    onClick={() => deleteSavedFlowsandPoses(flow.flowId, uid).then(
                      setUserFlows,
                    )}
                  >
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                  </svg>
                </li>
              </ul>
            </div>
          ))}
        </>
        <h2>Saved Meditations</h2>
        {userMeditations.map((meditation) => (
          <div key={meditation.meditationId}>
            <MedStyle>
              <div style={{ marginBottom: 10 }}>
                <u>{meditation.meditation_title}</u>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-trash-fill"
                  viewBox="0 0 16 16"
                  style={{ marginLeft: 15 }}
                  onClick={() => {
                    deleteSavedMeditation(meditation.meditationId, uid).then(
                      setUserMeditations,
                    );
                  }}
                >
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                </svg>
              </div>
              <ReactAudioPlayer src={meditation.meditation_url} controls />
            </MedStyle>
          </div>
        ))}
        <h2 style={{ marginTop: 20 }}>Saved Mantras</h2>
        {userMantras.map((mantra) => (
          <div key={mantra.mantraId}>
            <ul>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <li>{mantra.affirmation}</li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-trash-fill"
                  viewBox="0 0 16 16"
                  style={{ marginLeft: 15 }}
                  onClick={() => {
                    deleteSavedAffirmation(mantra.mantraId, uid).then(
                      setUserMantras,
                    );
                  }}
                >
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                </svg>
              </div>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-trash-fill"
                  viewBox="0 0 16 16"
                  style={{ marginLeft: 15 }}
                  onClick={() => {
                    deleteSavedBlogs(post.firebaseKey, uid).then(
                      setUserBlogPosts,
                    );
                  }}
                >
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                </svg>
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
    </>
  );
}
