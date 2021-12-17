import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import { copyBlogToUser, getSinglePost } from '../api/data/blogData';

const DivStyle = styled.div`
  margin-right: 400px;
  margin-left: 400px;
  margin-top: 50px;
`;

const ButtonStyle = styled.button`
  background-color: white,
  width: 100px;
  height: 40px;
  border-radius: 8px;
  border: 0px solid white;
`;

export default function BlogDetails({ user }) {
  const [post, setPost] = useState({});
  const { blogKey } = useParams();
  const history = useHistory();

  const saveUserIDToPost = () => {
    copyBlogToUser(blogKey, { ...post, userId: user.uid }).then(() => {
      history.push(`/account/${user.uid}`);
    });
  };

  useEffect(() => {
    let isMounted = true;
    getSinglePost(blogKey).then((postArray) => {
      if (isMounted) setPost(postArray);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <DivStyle>
      <div className="card">
        <div
          className="card-header"
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h3>{post.title}</h3>
          {user ? (
            <ButtonStyle type="button" onClick={saveUserIDToPost}>
              Save Blog Post To Account
            </ButtonStyle>
          ) : (
            ''
          )}
        </div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            {/* <img style={{ width: 'auto' }} src={post.image} alt={post.title} /> */}
            <p>{post.content}</p>
          </blockquote>
        </div>
      </div>
    </DivStyle>
  );
}

BlogDetails.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
};

BlogDetails.defaultProps = {
  user: null,
};
